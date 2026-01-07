"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CustomerRegister() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    sex: "",
    plan: "",
    person: "",
    paid_amount: "",
    referal_code: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const planPrices: Record<string, number> = {
    "1": 999,
    "2": 1500,
    "4": 2000,
    "5": 3500,
    "6": 4900,
    "7": 1200,
    "8": 1300,
    "9": 2700,
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if ((name === "plan" || name === "person") && value) {
      calculatePrice({ ...formData, [name]: value });
    }
  };

  const calculatePrice = (data: typeof formData) => {
    if (data.plan && data.person) {
      const price = planPrices[data.plan] || 0;
      const total = price * parseInt(data.person);
      setFormData((prev) => ({ ...prev, paid_amount: total.toString() }));
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fname.trim()) newErrors.fname = "First Name is required";
      if (!formData.lname.trim()) newErrors.lname = "Last Name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile is required";
      } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
        newErrors.mobile = "Mobile must be 10 digits";
      }
      if (!formData.sex) newErrors.sex = "Gender is required";
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else if (step === 3) {
      if (!formData.plan) newErrors.plan = "Plan is required";
      if (!formData.person) newErrors.person = "Number of persons is required";
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setAlertMessage("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.fname,
          lastName: formData.lname,
          email: formData.email,
          phone: formData.mobile,
          password: formData.password,
          gender: formData.sex,
          plan: formData.plan,
          numberOfPersons: formData.person,
          totalAmount: formData.paid_amount,
          referralCode: formData.referal_code,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertMessage("Registration successful! Redirecting to dashboard...");
        setAlertType("success");
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        setAlertMessage(
          data.message || "Registration failed. Please try again."
        );
        setAlertType("danger");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlertMessage("An error occurred. Please try again later.");
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
                    <img src="/logo.png" alt="SPy Root" />
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
                    <li className="nav-item active">
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
        <section className="banner-section register-banner-section pt-0">
          <div className="container-fluid s">
            <div className="row" data-aos="fade-up">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="banner-section-content pt-0 p-3">
                  <div className="register-form-wrapper">
                    <div className="register-form-content">
                      <div className="form-header">
                        <h3>Customer Registration</h3>
                        <p className="form-subtitle">
                          Create your account in 3 simple steps
                        </p>
                      </div>

                      {/* Progress Indicator */}
                      <div className="progress-indicator">
                        <div
                          className={`step ${currentStep >= 1 ? "active" : ""}`}
                        >
                          <div className="step-number">1</div>
                          <div className="step-label">Personal Info</div>
                        </div>
                        <div className="step-connector">
                          <div
                            className={`connector-line ${
                              currentStep > 1 ? "active" : ""
                            }`}
                          ></div>
                        </div>
                        <div
                          className={`step ${currentStep >= 2 ? "active" : ""}`}
                        >
                          <div className="step-number">2</div>
                          <div className="step-label">Security</div>
                        </div>
                        <div className="step-connector">
                          <div
                            className={`connector-line ${
                              currentStep > 2 ? "active" : ""
                            }`}
                          ></div>
                        </div>
                        <div
                          className={`step ${currentStep >= 3 ? "active" : ""}`}
                        >
                          <div className="step-number">3</div>
                          <div className="step-label">Plan & Terms</div>
                        </div>
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
                        {/* STEP 1: Personal Information */}
                        {currentStep === 1 && (
                          <div className="form-step">
                            <div className="row">
                              <div className="col-md-6 mb-3 form-group">
                                <label htmlFor="fname">
                                  <i className="fas fa-user me-2"></i>First Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.fname ? "is-invalid" : ""
                                  }`}
                                  name="fname"
                                  id="fname"
                                  placeholder="John"
                                  value={formData.fname}
                                  onChange={handleChange}
                                  required
                                />
                                {errors.fname && (
                                  <div className="invalid-feedback d-block">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errors.fname}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6 mb-3 form-group">
                                <label htmlFor="lname">
                                  <i className="fas fa-user me-2"></i>Last Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.lname ? "is-invalid" : ""
                                  }`}
                                  name="lname"
                                  id="lname"
                                  placeholder="Doe"
                                  value={formData.lname}
                                  onChange={handleChange}
                                  required
                                />
                                {errors.lname && (
                                  <div className="invalid-feedback d-block">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errors.lname}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-3 form-group">
                                <label htmlFor="email">
                                  <i className="fas fa-envelope me-2"></i>Email
                                  Address
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="email"
                                  className={`form-control ${
                                    errors.email ? "is-invalid" : ""
                                  }`}
                                  name="email"
                                  id="email"
                                  placeholder="john@example.com"
                                  value={formData.email}
                                  onChange={handleChange}
                                  required
                                />
                                {errors.email && (
                                  <div className="invalid-feedback d-block">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                              <div className="col-md-6 mb-3 form-group">
                                <label htmlFor="mobile">
                                  <i className="fas fa-phone me-2"></i>Mobile
                                  Number
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className={`form-control ${
                                    errors.mobile ? "is-invalid" : ""
                                  }`}
                                  name="mobile"
                                  id="mobile"
                                  placeholder="10-digit mobile"
                                  value={formData.mobile}
                                  onChange={handleChange}
                                  required
                                />
                                {errors.mobile && (
                                  <div className="invalid-feedback d-block">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errors.mobile}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="form-group mb-4">
                              <label htmlFor="sex">
                                <i className="fas fa-venus-mars me-2"></i>Gender
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                className={`form-control ${
                                  errors.sex ? "is-invalid" : ""
                                }`}
                                name="sex"
                                id="sex"
                                value={formData.sex}
                                onChange={handleChange}
                                required
                              >
                                <option value="">Select your gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                              {errors.sex && (
                                <div className="invalid-feedback d-block">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.sex}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* STEP 2: Security (Password) */}
                        {currentStep === 2 && (
                          <div className="form-step">
                            <div className="password-info-box">
                              <i className="fas fa-shield-alt"></i>
                              <p>
                                Create a strong password to protect your account
                              </p>
                            </div>

                            <div className="form-group mb-4">
                              <label htmlFor="password">
                                <i className="fas fa-lock me-2"></i>Password
                                <span className="text-danger">*</span>
                              </label>
                              <div className="password-input-wrapper">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className={`form-control ${
                                    errors.password ? "is-invalid" : ""
                                  }`}
                                  name="password"
                                  id="password"
                                  placeholder="Enter a strong password"
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
                                <div className="invalid-feedback d-block">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.password}
                                </div>
                              )}
                              <small className="password-hint">
                                <i className="fas fa-info-circle"></i> Minimum 6
                                characters
                              </small>
                            </div>

                            <div className="form-group mb-4">
                              <label htmlFor="confirmPassword">
                                <i className="fas fa-lock me-2"></i>Confirm
                                Password
                                <span className="text-danger">*</span>
                              </label>
                              <div className="password-input-wrapper">
                                <input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  className={`form-control ${
                                    errors.confirmPassword ? "is-invalid" : ""
                                  }`}
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  placeholder="Re-enter your password"
                                  value={formData.confirmPassword}
                                  onChange={handleChange}
                                  required
                                />
                                <button
                                  type="button"
                                  className="toggle-password-btn"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                >
                                  <i
                                    className={`fas ${
                                      showConfirmPassword
                                        ? "fa-eye-slash"
                                        : "fa-eye"
                                    }`}
                                  ></i>
                                </button>
                              </div>
                              {errors.confirmPassword && (
                                <div className="invalid-feedback d-block">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.confirmPassword}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* STEP 3: Plan Selection and Terms */}
                        {currentStep === 3 && (
                          <div className="form-step">
                            <div className="row">
                              <div className="col-md-6 mb-3 form-group">
                                <label htmlFor="plan">
                                  <i className="fas fa-list me-2"></i>Select
                                  Your Plan
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="plan"
                                  className={`form-control ${
                                    errors.plan ? "is-invalid" : ""
                                  }`}
                                  id="plan"
                                  value={formData.plan}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Choose a plan</option>
                                  <option value="1">Regular Yoga - ₹999</option>
                                  <option value="2">
                                    Multi Style Asanas - ₹1500
                                  </option>
                                  <option value="4">
                                    Yoga for Core Strength - ₹2000
                                  </option>
                                  <option value="5">
                                    Power Fitness Yoga - ₹3500
                                  </option>
                                  <option value="6">
                                    Advance Yoga - ₹4900
                                  </option>
                                  <option value="7">
                                    Yoga for Women - ₹1200
                                  </option>
                                  <option value="8">
                                    Yoga for Parents - ₹1300
                                  </option>
                                  <option value="9">
                                    Yoga Combo for Family - ₹2700
                                  </option>
                                </select>
                                {errors.plan && (
                                  <div className="invalid-feedback d-block">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errors.plan}
                                  </div>
                                )}
                              </div>

                              <div className="col-md-6 mb-3 form-group">
                                <label htmlFor="person">
                                  <i className="fas fa-users me-2"></i>Number of
                                  Persons
                                  <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="person"
                                  className={`form-control ${
                                    errors.person ? "is-invalid" : ""
                                  }`}
                                  id="person"
                                  value={formData.person}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Select number</option>
                                  <option value="1">1 Person</option>
                                  <option value="2">2 Persons</option>
                                  <option value="3">3 Persons</option>
                                  <option value="4">4 Persons</option>
                                  <option value="5">5 Persons</option>
                                </select>
                                {errors.person && (
                                  <div className="invalid-feedback d-block">
                                    <i className="fas fa-exclamation-circle me-1"></i>
                                    {errors.person}
                                  </div>
                                )}
                              </div>
                            </div>

                            {formData.paid_amount && (
                              <div className="price-summary">
                                <div className="price-row">
                                  <span>Total Amount:</span>
                                  <strong>₹{formData.paid_amount}</strong>
                                </div>
                              </div>
                            )}

                            <div className="form-group mb-3">
                              <label htmlFor="referal_code">
                                <i className="fas fa-tag me-2"></i>Referral Code
                                <span className="optional">(Optional)</span>
                              </label>
                              <input
                                type="text"
                                name="referal_code"
                                id="referal_code"
                                className="form-control"
                                placeholder="Enter your referral code"
                                value={formData.referal_code}
                                onChange={handleChange}
                              />
                            </div>

                            <div className="form-group">
                              <div className="form-check terms-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="agreeTerms"
                                  name="agreeTerms"
                                  checked={formData.agreeTerms}
                                  onChange={handleChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="agreeTerms"
                                >
                                  I agree to the{" "}
                                  <a href="#terms">Terms and Conditions</a> and{" "}
                                  <a href="#privacy">Privacy Policy</a>
                                </label>
                              </div>
                              {errors.agreeTerms && (
                                <div className="invalid-feedback d-block">
                                  <i className="fas fa-exclamation-circle me-1"></i>
                                  {errors.agreeTerms}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="form-navigation mt-5">
                          {currentStep > 1 && (
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={handlePrevStep}
                              disabled={loading}
                            >
                              <i className="fas fa-arrow-left me-2"></i>Previous
                            </button>
                          )}

                          {currentStep < 3 && (
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleNextStep}
                              disabled={loading}
                            >
                              Next<i className="fas fa-arrow-right ms-2"></i>
                            </button>
                          )}

                          {currentStep === 3 && (
                            <button
                              className="btn btn-primary"
                              type="submit"
                              disabled={loading}
                            >
                              {loading && (
                                <span className="spinner-border spinner-border-sm me-2"></span>
                              )}
                              {loading
                                ? "Creating Account..."
                                : "Create Account"}
                            </button>
                          )}
                        </div>

                        <div className="login-link">
                          <p>
                            Already have an account?
                            <Link href="/login"> Sign in here</Link>
                          </p>
                        </div>
                      </form>
                    </div>

                    <div className="register-image">
                      <figure className="mb-0">
                        <Image
                          src="/banner_right_image.png"
                          alt="Join Us"
                          width={400}
                          height={400}
                          className="img-fluid"
                        />
                      </figure>
                      <div className="image-badge">
                        <p>
                          <i className="fas fa-check-circle"></i> 100% Secure
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
          text-align: center;
        }

        .form-header h3 {
          font-size: 42px;
          margin-bottom: 10px;
          color: white;
          font-family: "Playfair Display", serif;
        }

        .form-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 30px 0 40px;
          gap: 10px;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .step.active {
          opacity: 1;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .step.active .step-number {
          background: #e1ccad;
          border-color: #e1ccad;
          color: #413625;
          box-shadow: 0 0 20px rgba(225, 204, 173, 0.5);
        }

        .step-label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          width: 70px;
        }

        .step.active .step-label {
          color: #e1ccad;
          font-weight: 600;
        }

        .step-connector {
          flex: 1;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .connector-line {
          height: 2px;
          width: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .connector-line.active {
          background: #e1ccad;
        }

        .form-step {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .password-info-box {
          background: rgba(225, 204, 173, 0.1);
          border-left: 4px solid #e1ccad;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .password-info-box i {
          color: #e1ccad;
          font-size: 20px;
        }

        .password-info-box p {
          margin: 0;
          color: white;
          font-size: 14px;
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

        .password-hint {
          display: block;
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
        }

        .password-hint i {
          margin-right: 4px;
        }

        .price-summary {
          background: rgba(225, 204, 173, 0.1);
          border: 2px dashed #e1ccad;
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0 30px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          font-size: 18px;
        }

        .price-row strong {
          color: #e1ccad;
          font-size: 24px;
        }

        .optional {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: normal;
          margin-left: 5px;
        }

        .terms-check {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #e1ccad;
        }

        .form-check-label {
          color: white !important;
          margin-bottom: 0;
          margin-left: 10px;
          cursor: pointer;
          font-size: 14px;
        }

        .form-check-label a {
          color: #e1ccad;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .form-check-label a:hover {
          text-decoration: underline;
        }

        .form-navigation {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .btn-outline-secondary {
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
          transition: all 0.3s ease;
        }

        .btn-outline-secondary:hover {
          border-color: #e1ccad;
          color: #e1ccad;
          background: rgba(225, 204, 173, 0.1);
        }

        .btn-outline-secondary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
          color: #764979;
          margin-right: 5px;
        }

        .invalid-feedback {
          font-size: 13px;
          margin-top: 5px;
        }

        .text-danger {
          color: #dc3545;
        }

        @media (max-width: 768px) {
          .form-header h3 {
            font-size: 32px;
          }

          .progress-indicator {
            margin: 20px 0 30px;
            gap: 5px;
          }

          .step-label {
            width: 50px;
            font-size: 10px;
          }

          .step-number {
            width: 35px;
            height: 35px;
            font-size: 14px;
          }

          .form-navigation {
            flex-direction: column;
          }

          .form-navigation button {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
