import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Mock employee database - Replace with real database in production
const employees: any[] = [
  {
    id: "EMP001",
    employeeId: "EMP001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    phone: "+919876543210",
    passwordHash:
      "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36DRcmmO", // password: "Test@1234"
    gender: "Male",
    department: "Yoga Instruction",
    position: "Senior Instructor",
    qualifications: "B.Sc Yoga, Certified Yoga Instructor",
    experience: "8 years",
    createdAt: new Date().toISOString(),
    isActive: true,
    emailVerified: true,
    lastLogin: null,
  },
];

// Rate limiting map - stores login attempts
const loginAttempts: Map<string, { count: number; resetTime: number }> =
  new Map();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

const isLockedOut = (identifier: string): boolean => {
  const attempt = loginAttempts.get(identifier);
  if (!attempt) return false;

  if (Date.now() > attempt.resetTime) {
    loginAttempts.delete(identifier);
    return false;
  }

  return attempt.count >= MAX_ATTEMPTS;
};

const recordFailedAttempt = (identifier: string): void => {
  const attempt = loginAttempts.get(identifier);
  if (!attempt) {
    loginAttempts.set(identifier, {
      count: 1,
      resetTime: Date.now() + LOCK_TIME,
    });
  } else {
    attempt.count++;
  }
};

const clearAttempts = (identifier: string): void => {
  loginAttempts.delete(identifier);
};

const validateEmployeeId = (employeeId: string): boolean => {
  return employeeId.trim().length > 0;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, password, rememberMe } = body;

    // Validation
    const validationErrors: Record<string, string> = {};

    if (!employeeId || !validateEmployeeId(employeeId)) {
      validationErrors.employeeId = "Employee ID is required";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 }
      );
    }

    // Check for rate limiting
    if (isLockedOut(employeeId)) {
      return NextResponse.json(
        {
          message:
            "Too many failed login attempts. Please try again after 15 minutes.",
        },
        { status: 429 }
      );
    }

    // Find employee by ID
    const employee = employees.find((e) =>
      e.employeeId.toLowerCase().includes(employeeId.toLowerCase())
    );

    if (!employee) {
      recordFailedAttempt(employeeId);
      return NextResponse.json(
        { message: "Invalid employee ID or password" },
        { status: 401 }
      );
    }

    // Check if employee is active
    if (!employee.isActive) {
      recordFailedAttempt(employeeId);
      return NextResponse.json(
        { message: "Your account has been deactivated. Please contact admin." },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      employee.passwordHash
    );

    if (!isPasswordValid) {
      recordFailedAttempt(employeeId);
      return NextResponse.json(
        { message: "Invalid employee ID or password" },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful login
    clearAttempts(employeeId);

    // Update last login
    employee.lastLogin = new Date().toISOString();

    // Generate JWT token
    const expiresIn = rememberMe ? "30d" : "7d";
    const token = jwt.sign(
      {
        id: employee.id,
        employeeId: employee.employeeId,
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
      },
      JWT_SECRET,
      { expiresIn }
    );

    // Return success response
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        expiresIn,
        employee: {
          id: employee.id,
          employeeId: employee.employeeId,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          phone: employee.phone,
          gender: employee.gender,
          department: employee.department,
          position: employee.position,
          emailVerified: employee.emailVerified,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Employee login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 }
    );
  }
}
