"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CustomerLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Login successful! Redirecting...");
        setAlertType("success");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      } else {
        setAlertMessage(data.message || "Login failed. Please try again.");
        setAlertType("danger");
      }
    } catch (error) {
      setAlertMessage("An error occurred. Please try again.");
      setAlertType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* NAVBAR SECTION */}
      <div className="banner-section-outer">
        <header>
          <div className="main_header">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <Link className="navbar-brand head-logo" href="/">
                  <figure className="mb-0">
                    <img src="/logo2.png" alt="SPy Root" />
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
                      <Link className="nav-link" href="/register">
                        Register
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
        {/* SOCIAL ICONS */}
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

        {/* BANNER SECTION */}
        <section className="banner-section login-banner-section pt-0">
          <div className="container-fluid s">
            <div className="row" data-aos="fade-up">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="banner-section-content pt-0 p-3">
                  <div className="login-form-wrapper">
                    <div className="login-form-content">
                      <div className="form-header">
                        <h3>Welcome Back</h3>
                        <p className="form-subtitle">
                          Sign in to your account to continue
                        </p>
                      </div>

                      {alertMessage && (
                        <div
                          className={`alert alert-${alertType} alert-dismissible fade show`}
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
                              errors.email ? "is-invalid" : ""
                            }`}
                            name="email"
                            id="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
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
                                errors.password ? "is-invalid" : ""
                              }`}
                              name="password"
                              id="password"
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleChange}
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
                          {errors.password && (
                            <div className="invalid-feedback">
                              <i className="fas fa-exclamation-circle me-1"></i>
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <div className="form-check forgot-password-wrapper">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                          <a href="#forgotPassword" className="ms-auto">
                            Forgot Password?
                          </a>
                        </div>

                        <div className="form-group mb-0 row">
                          <div className="col-12 mt-3">
                            <button
                              className="btn btn-primary btn-block"
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

                        <div className="divider-text">
                          <span>or continue with</span>
                        </div>

                        <div className="social-login-buttons">
                          <button
                            type="button"
                            className="social-btn google-btn"
                          >
                            <i className="fab fa-google"></i>
                            Google
                          </button>
                          <button
                            type="button"
                            className="social-btn facebook-btn"
                          >
                            <i className="fab fa-facebook"></i>
                            Facebook
                          </button>
                        </div>

                        <div className="signup-link">
                          <p>
                            Don't have an account?
                            <Link href="/register"> Sign up here</Link>
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="login-image">
                      <figure className="mb-0">
                        <Image
                          src="/banner_right_image.png"
                          alt="Yoga Login"
                          width={400}
                          height={400}
                          className="img-fluid"
                        />
                      </figure>
                      <div className="image-badge">
                        <p>
                          <i className="fas fa-star"></i> Trusted by thousands
                          of users
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
          color: #413625;
          cursor: pointer;
          font-size: 18px;
          padding: 5px;
          transition: all 0.3s ease;
        }

        .toggle-password-btn:hover {
          color: #764979;
        }

        .forgot-password-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 15px 0 20px;
          gap: 10px;
        }

        .forgot-password-wrapper label {
          color: white !important;
          margin: 0;
          font-size: 14px;
          cursor: pointer;
        }

        .forgot-password-wrapper a {
          color: #e1ccad;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .forgot-password-wrapper a:hover {
          text-decoration: underline;
          color: #f5dcc0;
        }

        .divider-text {
          text-align: center;
          margin: 25px 0;
          position: relative;
        }

        .divider-text::before,
        .divider-text::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background: rgba(255, 255, 255, 0.3);
        }

        .divider-text::before {
          left: 0;
        }

        .divider-text::after {
          right: 0;
        }

        .divider-text span {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.05);
          padding: 0 15px;
        }

        .social-login-buttons {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }

        .social-btn {
          flex: 1;
          padding: 12px 20px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .social-btn:hover {
          border-color: #e1ccad;
          background: rgba(225, 204, 173, 0.1);
          color: #e1ccad;
        }

        .google-btn i {
          font-size: 16px;
        }

        .facebook-btn i {
          font-size: 16px;
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

        .spinner-border-sm {
          width: 16px;
          height: 16px;
          border-width: 2px;
        }

        @media (max-width: 768px) {
          .form-header h3 {
            font-size: 32px;
          }

          .social-login-buttons {
            flex-direction: column;
          }

          .forgot-password-wrapper {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
