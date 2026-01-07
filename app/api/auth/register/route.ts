import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Mock user database - Replace with real database in production
let users: any[] = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    gender: "Male",
  },
];

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      gender,
      plan,
      numberOfPersons,
      totalAmount,
      referralCode,
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !gender) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (users.some((u) => u.email === email)) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Phone validation (basic 10-digit check)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      return NextResponse.json(
        { message: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      gender,
      plan,
      numberOfPersons,
      totalAmount,
      referralCode: referralCode || null,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    return NextResponse.json(
      {
        message: "Registration successful",
        token,
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          gender: newUser.gender,
          plan: newUser.plan,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
