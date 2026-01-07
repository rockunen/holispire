"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface UserData {
  fname?: string;
  lname?: string;
  email: string;
  mobile?: string;
  sex?: string;
  plan?: string;
  person?: string;
  paid_amount?: string;
  createdAt?: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
      return;
    }

    // Simulate loading delay
    setTimeout(() => {
      setUserData(JSON.parse(user));
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="banner-section-outer">
        <section className="dashboard-container">
          <div className="container">
            <div className="loader-spinner">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="text-white mt-3">Loading your dashboard...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="banner-section-outer">
      {/* DASHBOARD SECTION */}
      <section className="dashboard-container">
        <div className="container">
          {alertMessage && (
            <div
              className={`alert alert-${
                alertMessage.includes("successful") ? "success" : "danger"
              }`}
              role="alert"
            >
              {alertMessage}
            </div>
          )}

          {/* Dashboard Content */}
          <div id="dashboardContent">
            {/* Header */}
            <div className="dashboard-header">
              <h2>
                Welcome,{" "}
                <span id="userNameDisplay">{userData.fname || "User"}</span>!
              </h2>
              <p>Manage your yoga registrations and profile</p>
            </div>

            {/* Profile Card */}
            <div className="profile-card">
              <h4>
                <i className="fas fa-user-circle mr-2"></i>Profile Information
              </h4>
              <div className="profile-info">
                <div className="info-item">
                  <div className="info-label">First Name</div>
                  <div className="info-value">{userData.fname || "N/A"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Last Name</div>
                  <div className="info-value">{userData.lname || "N/A"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Email</div>
                  <div className="info-value">{userData.email}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Mobile</div>
                  <div className="info-value">{userData.mobile || "N/A"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Gender</div>
                  <div className="info-value">{userData.sex || "N/A"}</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Member Since</div>
                  <div className="info-value">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Registrations Section */}
            <div className="registrations-section">
              <h3>
                <i className="fas fa-book-reader mr-2"></i>Your Registrations
              </h3>
              {userData.plan ? (
                <div className="registration-card">
                  <h5>Plan Registration</h5>
                  <div className="registration-details">
                    <div className="detail-item">
                      <div className="detail-label">Selected Plan</div>
                      <div className="detail-value">{userData.plan}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Number of Persons</div>
                      <div className="detail-value">{userData.person}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Total Amount</div>
                      <div className="detail-value">
                        Rs. {userData.paid_amount}
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Status</div>
                      <span className="status-badge status-completed">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-inbox"></i>
                  <p>
                    No registrations found. Complete your profile to get
                    started!
                  </p>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <button className="btn-logout" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
