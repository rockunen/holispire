"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function EmployeeLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

    if (name === "email") {
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
      const response = await fetch("/api/auth/emp-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Login successful! Redirecting...");
        setAlertType("success");
        localStorage.setItem("empToken", data.token);
        localStorage.setItem("employee", JSON.stringify(data.employee));

        setTimeout(() => {
          window.location.href = "/emp-dashboard";
        }, 1500);
      } else {
        setAlertMessage(data.message || "Login failed. Please try again.");
        setAlertType("danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlertMessage("An error occurred during login. Please try again.");
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
                      <Link className="nav-link" href="/emp-signup">
                        Employee Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link contact_us" href="">
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
                        <h3>Employee Login</h3>
                        <p className="form-subtitle">
                          Sign in to your employee portal account
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
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="current-password"
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
                          {fieldTouched.password && errors.password && (
                            <div className="invalid-feedback d-block">
                              <i className="fas fa-exclamation-circle me-1"></i>
                              {errors.password}
                            </div>
                          )}
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
                              {loading ? "Logging in..." : "Login Now"}
                            </button>
                          </div>
                        </div>

                        <div className="signup-link">
                          <p>
                            Don't have an account?
                            <Link href="/emp-signup"> Register here</Link>
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
                          <i className="fas fa-briefcase"></i> Employee Portal
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

        .form-control {
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
          padding-right: calc(1.5em + 0.75rem);
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath fill='%23dc3545' d='M5.8 3.6h.4v4h-.4z'/%3e%3ccircle cx='6' cy='9.2' r='.6' fill='%23dc3545'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right calc(0.375em + 0.1875rem) center;
          background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
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

        .toggle-password-btn:hover:not(:disabled) {
          color: #e1ccad;
        }

        .toggle-password-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .signup-link {
          text-align: center;
          margin-top: 20px;
        }

        .signup-link p {
          color: white;
          font-size: 14px;
          margin: 0;
        }

        .signup-link a {
          color: #e1ccad;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
          transition: all 0.3s ease;
        }

        .signup-link a:hover {
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

        @media (max-width: 768px) {
          .form-header h3 {
            font-size: 32px;
          }
        }
      `}</style>
    </>
  );
}
