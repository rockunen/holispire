"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function EmployeeSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    label: string;
    color: string;
  }>({ score: 0, label: "Very Weak", color: "#dc3545" });

  // Password strength checker
  const calculatePasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

    const strengthLevels = [
      { score: 0, label: "Very Weak", color: "#dc3545" },
      { score: 1, label: "Weak", color: "#fd7e14" },
      { score: 2, label: "Fair", color: "#ffc107" },
      { score: 3, label: "Good", color: "#17a2b8" },
      { score: 4, label: "Strong", color: "#28a745" },
      { score: 5, label: "Very Strong", color: "#20c997" },
    ];

    return strengthLevels[Math.min(score, 5)];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Mark field as touched
    setFieldTouched((prev) => ({ ...prev, [name]: true }));

    // Update password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setFieldTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: any): boolean => {
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value?.trim()) {
        newErrors.name = "Name is required";
      } else if (value.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        delete newErrors.name;
      }
    } else if (name === "email") {
      if (!value?.trim()) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(value)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        delete newErrors.email;
      }
    } else if (name === "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else if (value.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setAlertMessage("");

    try {
      const response = await fetch("/api/auth/emp-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Registration successful! Redirecting to login...");
        setAlertType("success");

        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/emp-login";
        }, 2000);
      } else {
        setAlertMessage(
          data.message || "Registration failed. Please try again."
        );
        setAlertType("danger");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlertMessage(
        "An error occurred during registration. Please try again."
      );
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="banner-section-outer">
        <header>
          <div className="main_header">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <Link className="navbar-brand head-logo" href="/">
                  <figure className="mb-0">
                    <img src="/logo2.png" alt="HoliSpire" />
                  </figure>
                </Link>
                <button
                  className="navbar-toggler collapsed"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                  <span className="navbar-toggler-icon"></span>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/">
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/emp-login">
                        Employee Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link contact_us" href="/">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </div>

      <div className="banner-section-outer">
        <div className="left_icons float-left d-table" data-aos="fade-down">
          <div className="icon_content d-table-cell align-middle">
            <ul className="list-unstyled p-0 m-0">
              <li>
                <a href="#">
                  <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i
                    className="fa-brands fa-linkedin-in"
                    aria-hidden="true"
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <section className="banner-section login-banner-section pt-0">
          <div className="container-fluid">
            <div className="row" data-aos="fade-up">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="banner-section-content pt-0 p-3">
                  <div className="login-form-wrapper">
                    <div className="login-form-content">
                      <div className="form-header">
                        <h3>Employee Registration</h3>
                        <p className="form-subtitle">
                          Create your employee portal account
                        </p>
                      </div>

                      {alertMessage && (
                        <div
                          className={`alert alert-${alertType} alert-dismissible fade show alert-custom`}
                          role="alert"
                        >
                          <i
                            className={`fas ${
                              alertType === "success"
                                ? "fa-check-circle"
                                : "fa-exclamation-circle"
                            } me-2`}
                          ></i>
                          {alertMessage}
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          ></button>
                        </div>
                      )}

                      <form className="auth-form my-4" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="name">
                            <i className="fas fa-user me-2"></i>Full Name
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              fieldTouched.name && errors.name
                                ? "is-invalid"
                                : ""
                            }`}
                            name="name"
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                          />
                          {fieldTouched.name && errors.name && (
                            <div className="invalid-feedback d-block">
                              <i className="fas fa-exclamation-circle me-1"></i>
                              {errors.name}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="email">
                            <i className="fas fa-envelope me-2"></i>Email
                            Address
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              fieldTouched.email && errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="email"
                            required
                          />
                          {fieldTouched.email && errors.email && (
                            <div className="invalid-feedback d-block">
                              <i className="fas fa-exclamation-circle me-1"></i>
                              {errors.email}
                            </div>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">
                            <i className="fas fa-lock me-2"></i>Password
                          </label>
                          <div className="password-input-wrapper">
                            <input
                              type={showPassword ? "text" : "password"}
                              className={`form-control ${
                                fieldTouched.password && errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                              name="password"
                              id="password"
                              placeholder="Create a strong password"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="new-password"
                              required
                            />
                            <button
                              type="button"
                              className="toggle-password-btn"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={`fas ${
                                  showPassword ? "fa-eye-slash" : "fa-eye"
                                }`}
                              ></i>
                            </button>
                          </div>

                          {formData.password && (
                            <div className="password-strength-meter">
                              <div className="strength-bar-wrapper">
                                <div
                                  className="strength-bar"
                                  style={{
                                    width: `${
                                      (passwordStrength.score / 5) * 100
                                    }%`,
                                    backgroundColor: passwordStrength.color,
                                  }}
                                ></div>
                              </div>
                              <small
                                className="strength-label"
                                style={{ color: passwordStrength.color }}
                              >
                                <i className="fas fa-circle-notch me-1"></i>
                                Password Strength: {passwordStrength.label}
                              </small>
                            </div>
                          )}

                          {fieldTouched.password && errors.password && (
                            <div className="invalid-feedback d-block">
                              <i className="fas fa-exclamation-circle me-1"></i>
                              {errors.password}
                            </div>
                          )}

                          <small className="form-text text-muted password-requirements">
                            <i className="fas fa-info-circle me-1"></i>
                            Requirements:
                            <ul className="mb-0 mt-2 ps-3">
                              <li
                                className={
                                  formData.password.length >= 8
                                    ? "valid"
                                    : "invalid"
                                }
                              >
                                <i
                                  className={`fas ${
                                    formData.password.length >= 8
                                      ? "fa-check"
                                      : "fa-times"
                                  } me-1`}
                                ></i>
                                At least 8 characters
                              </li>
                              <li
                                className={
                                  /[a-z]/.test(formData.password) &&
                                  /[A-Z]/.test(formData.password)
                                    ? "valid"
                                    : "invalid"
                                }
                              >
                                <i
                                  className={`fas ${
                                    /[a-z]/.test(formData.password) &&
                                    /[A-Z]/.test(formData.password)
                                      ? "fa-check"
                                      : "fa-times"
                                  } me-1`}
                                ></i>
                                Mix of uppercase and lowercase letters
                              </li>
                              <li
                                className={
                                  /\d/.test(formData.password)
                                    ? "valid"
                                    : "invalid"
                                }
                              >
                                <i
                                  className={`fas ${
                                    /\d/.test(formData.password)
                                      ? "fa-check"
                                      : "fa-times"
                                  } me-1`}
                                ></i>
                                At least one number
                              </li>
                              <li
                                className={
                                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                    formData.password
                                  )
                                    ? "valid"
                                    : "invalid"
                                }
                              >
                                <i
                                  className={`fas ${
                                    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                                      formData.password
                                    )
                                      ? "fa-check"
                                      : "fa-times"
                                  } me-1`}
                                ></i>
                                At least one special character
                              </li>
                            </ul>
                          </small>
                        </div>

                        <div className="form-group mb-0 row mt-4">
                          <div className="col-12">
                            <button
                              className="btn btn-primary btn-block w-100"
                              type="submit"
                              disabled={loading}
                            >
                              {loading && (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                              )}
                              {loading ? "Registering..." : "Register Now"}
                            </button>
                          </div>
                        </div>

                        <div className="login-link">
                          <p>
                            Already have an account?
                            <Link href="/emp-login"> Login here</Link>
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="login-image">
                      <figure className="mb-0">
                        <Image
                          src="/banner_right_image.png"
                          alt="Employee"
                          width={400}
                          height={400}
                          className="img-fluid"
                        />
                      </figure>
                      <div className="image-badge">
                        <p>
                          <i className="fas fa-shield-alt"></i> Secure
                          Registration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <figure className="banner_left_top_shape left_shape mb-0">
              <Image
                src="/banner_left_top_shape.png"
                alt=""
                width={100}
                height={100}
                className="img-fluid"
              />
            </figure>
            <figure className="banner_left_bottom_shape left_shape mb-0">
              <Image
                src="/banner_left_bottom_shape.png"
                alt=""
                width={100}
                height={100}
                className="img-fluid"
              />
            </figure>
            <figure className="banner_right_top_shape right_shape mb-0">
              <Image
                src="/banner_right_top_shape.png"
                alt=""
                width={100}
                height={100}
                className="img-fluid"
              />
            </figure>
            <figure className="banner_right_bottom_shape right_shape mb-0">
              <Image
                src="/banner_right_bottom_shape.png"
                alt=""
                width={100}
                height={100}
                className="img-fluid"
              />
            </figure>
          </div>
        </section>
      </div>

      <style jsx>{`
        .form-header {
          margin-bottom: 30px;
        }

        .form-header h3 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .form-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          color: white;
          font-weight: 500;
          margin-bottom: 8px;
          display: block;
          font-size: 15px;
        }

        .form-control,
        .form-control:focus {
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          padding: 12px 15px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .form-control::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .form-control:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: #e1ccad;
          color: white;
          box-shadow: 0 0 0 0.2rem rgba(225, 204, 173, 0.25);
        }

        .form-control:disabled {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.5);
          cursor: not-allowed;
        }

        .form-control.is-invalid {
          border-color: #dc3545;
        }

        .invalid-feedback {
          display: block;
          color: #dc3545;
          font-size: 13px;
          margin-top: 5px;
        }

        .password-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .toggle-password-btn {
          position: absolute;
          right: 15px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          font-size: 18px;
          padding: 5px;
          transition: all 0.3s ease;
        }

        .toggle-password-btn:hover {
          color: #e1ccad;
        }

        .password-strength-meter {
          margin-top: 10px;
        }

        .strength-bar-wrapper {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .strength-bar {
          height: 100%;
          transition: all 0.3s ease;
          border-radius: 10px;
        }

        .strength-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.8);
        }

        .password-requirements {
          color: rgba(255, 255, 255, 0.6) !important;
          font-size: 12px !important;
          margin-top: 10px !important;
        }

        .password-requirements ul li {
          list-style: none;
          padding-left: 20px;
          margin-bottom: 5px;
        }

        .password-requirements li.valid {
          color: #28a745;
        }

        .password-requirements li.invalid {
          color: rgba(255, 255, 255, 0.6);
        }

        .password-requirements i {
          width: 15px;
        }

        .login-link {
          text-align: center;
          margin-top: 20px;
        }

        .login-link p {
          color: white;
          font-size: 14px;
          margin: 0;
        }

        .login-link a {
          color: #e1ccad;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
          transition: all 0.3s ease;
        }

        .login-link a:hover {
          text-decoration: underline;
          color: #f5dcc0;
        }

        .image-badge {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          padding: 15px 20px;
          border-radius: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          width: 90%;
          text-align: center;
        }

        .image-badge p {
          margin: 0;
          color: #413625;
          font-weight: 600;
          font-size: 14px;
        }

        .image-badge i {
          color: #e1ccad;
          margin-right: 5px;
        }

        .alert-custom {
          background: rgba(220, 53, 69, 0.15);
          border: 1px solid rgba(220, 53, 69, 0.3);
          color: #ff9999;
        }

        .alert-success {
          background: rgba(40, 167, 69, 0.15) !important;
          border: 1px solid rgba(40, 167, 69, 0.3) !important;
          color: #99ff99 !important;
        }

        .btn-primary {
          background: linear-gradient(135deg, #e1ccad, #c9a961);
          border: none;
          color: #413625;
          font-weight: 600;
          padding: 12px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #f5dcc0, #d4b486);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(225, 204, 173, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-outline-primary {
          color: #e1ccad;
          border: 2px solid #e1ccad;
          background: transparent;
        }

        .btn-outline-primary:hover {
          background: #e1ccad;
          color: #413625;
        }

        @media (max-width: 768px) {
          .form-header h3 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
