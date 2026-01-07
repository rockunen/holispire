import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Mock employee database - Replace with real database in production
let employees: any[] = [
  {
    id: "EMP001",
    employeeId: "EMP001",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@example.com",
    phone: "+919876543210",
    passwordHash: "$2a$10$YourHashedPasswordHere", // Pre-hashed password
    gender: "Male",
    department: "Yoga Instruction",
    position: "Senior Instructor",
    qualifications: "B.Sc Yoga, Certified Yoga Instructor",
    experience: "8 years",
    createdAt: new Date().toISOString(),
    isActive: true,
    emailVerified: true,
  },
];

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const SALT_ROUNDS = 10;

// Validation helper functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (
  password: string
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push(
      "Password must contain at least one special character (!@#$%^&*)"
    );
  }

  return { valid: errors.length === 0, errors };
};

const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/[\s\-()]/g, "");
  return /^\+?[0-9]{10,15}$/.test(cleanPhone);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      gender,
      department,
      position,
      qualifications,
      experience,
    } = body;

    // Validation
    const validationErrors: Record<string, string> = {};

    // First name validation
    if (!firstName || !validateName(firstName)) {
      validationErrors.firstName =
        "First name must be between 2 and 50 characters";
    }

    // Last name validation
    if (!lastName || !validateName(lastName)) {
      validationErrors.lastName =
        "Last name must be between 2 and 50 characters";
    }

    // Email validation
    if (!email || !validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    // Check if email already exists
    if (
      email &&
      employees.some((e) => e.email.toLowerCase() === email.toLowerCase())
    ) {
      validationErrors.email = "Email already registered";
    }

    // Phone validation
    if (!phone || !validatePhone(phone)) {
      validationErrors.phone = "Phone number must be 10-15 digits";
    }

    // Password validation
    const passwordValidation = validatePassword(password || "");
    if (!passwordValidation.valid) {
      validationErrors.password = passwordValidation.errors[0];
    }

    // Confirm password validation
    if (!confirmPassword || password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    // Gender validation
    if (!gender || !["Male", "Female", "Other"].includes(gender)) {
      validationErrors.gender = "Valid gender selection is required";
    }

    // Department validation
    if (!department || department.trim().length === 0) {
      validationErrors.department = "Department is required";
    }

    // Position validation
    if (!position || position.trim().length === 0) {
      validationErrors.position = "Position is required";
    }

    // Qualifications validation
    if (!qualifications || qualifications.trim().length < 5) {
      validationErrors.qualifications =
        "Qualifications must be at least 5 characters";
    }

    // Experience validation
    if (!experience || experience.trim().length < 3) {
      validationErrors.experience = "Please provide valid experience details";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { message: "Validation failed", errors: validationErrors },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new employee
    const employeeId = `EMP${Date.now().toString().slice(-5)}`;
    const newEmployee = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      passwordHash,
      gender,
      department: department.trim(),
      position: position.trim(),
      qualifications: qualifications.trim(),
      experience: experience.trim(),
      createdAt: new Date().toISOString(),
      isActive: true,
      emailVerified: false,
      lastLogin: null,
    };

    employees.push(newEmployee);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newEmployee.id,
        employeeId: newEmployee.employeeId,
        email: newEmployee.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    return NextResponse.json(
      {
        message: "Registration successful",
        token,
        employee: {
          id: newEmployee.id,
          employeeId: newEmployee.employeeId,
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          phone: newEmployee.phone,
          gender: newEmployee.gender,
          department: newEmployee.department,
          position: newEmployee.position,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Employee registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
