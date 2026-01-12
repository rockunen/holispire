"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    // Initialize AOS animation library
    const script1 = document.createElement("script");
    script1.src = "/aos.js";
    script1.async = true;
    script1.onload = () => {
      if (typeof window !== "undefined" && (window as any).AOS) {
        (window as any).AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
        });
      }
    };
    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script1);
    };
  }, []);

  return (
    <>
      <div
        className="banner-section-outer"
        style={{
          background: "linear-gradient(135deg, #764979 0%, #543458 100%)",
        }}
      >
        <header>
          <div className="main_header">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <Link className="navbar-brand head-logo" href="/">
                  <figure className="mb-0">
                    <img src="/logo2.png" alt="" />
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
                    <li className="nav-item active">
                      <Link className="nav-link" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/about">
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link contact_us" href="contact">
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
      {/* SUB BANNER SECTION */}
      <section
        className="sub-banner-section"
        style={{
          background: "linear-gradient(135deg, #764979 0%, #543458 100%)",
        }}
      >
        <div className="container-fluid">
          <div className="banner-section">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="banner-section-content">
                  <h1 data-aos="fade-up">About HoliSpire</h1>
                  <p data-aos="fade-right">
                    Discover our mission to transform lives through yoga,
                    meditation, and wellness practices.
                  </p>
                  <div className="btn_wrapper" data-aos="fade-up">
                    <Link href="/register" className="text-decoration-none">
                      <span className="sub_home_span">
                        <i className="fa-solid fa-arrow-left"></i>
                      </span>
                      Get Started
                      <span className="sub_span">
                        <i className="fa-solid fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <figure className="banner_left_top_shape left_shape mb-0">
              <img
                src="/banner_left_top_shape.png"
                alt=""
                className="img-fluid"
              />
            </figure>
            <figure className="banner_left_bottom_shape left_shape mb-0">
              <img
                src="/banner_left_bottom_shape.png"
                alt=""
                className="img-fluid"
              />
            </figure>
            <figure className="banner_right_top_shape right_shape mb-0">
              <img
                src="/banner_right_top_shape.png"
                alt=""
                className="img-fluid"
              />
            </figure>
            <figure className="banner_right_bottom_shape right_shape mb-0">
              <img
                src="/banner_right_bottom_shape.png"
                alt=""
                className="img-fluid"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="aboutpage_aboutus_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="aboutpage_aboutus_image">
                <figure className="mb-0">
                  <img
                    src="/aboutus_image.png"
                    alt="About Us"
                    className="img-fluid"
                  />
                </figure>
              </div>
              <figure className="aboutus_top_shape left_shape mb-0">
                <img
                  src="/aboutus_top_shape.png"
                  alt=""
                  className="img-fluid"
                />
              </figure>
              <figure className="aboutus_bottom_shape left_shape mb-0">
                <img
                  src="/aboutus_bottom_shape.png"
                  alt=""
                  className="img-fluid"
                />
              </figure>
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
              data-aos="fade-right"
            >
              <div className="aboutpage_aboutus_content">
                <h5>Who We Are</h5>
                <h2>Welcome to HoliSpire</h2>
                <p>
                  HoliSpire is a wellness platform dedicated to empowering
                  individuals to unlock their full potential through
                  transformative practices of yoga, meditation, and holistic
                  healing.
                </p>
                <p className="margin_bottom">
                  Founded with a vision to make quality wellness practices
                  accessible to everyone, we combine ancient wisdom with modern
                  expertise to create personalized experiences that nurture the
                  mind, body, and spirit.
                </p>

                <h5 style={{ marginTop: "30px", marginBottom: "15px" }}>
                  Our Core Values
                </h5>
                <div className="box">
                  <i className="fa-solid fa-heart"></i>
                  <span>Compassion - We care deeply about your wellbeing</span>
                </div>
                <div className="box">
                  <i className="fa-solid fa-leaf"></i>
                  <span>Authenticity - Real practices, real results</span>
                </div>
                <div className="box">
                  <i className="fa-solid fa-star"></i>
                  <span>Excellence - Quality instruction and guidance</span>
                </div>
                <div className="box">
                  <i className="fa-solid fa-people-group"></i>
                  <span>
                    Community - Growing together on the wellness journey
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mission_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="mission_box">
                <div className="mission_content">
                  <h5>Our Mission</h5>
                  <h2>Transforming Lives Through Wellness</h2>
                  <p>
                    To empower individuals of all backgrounds and abilities to
                    achieve optimal health, happiness, and spiritual growth
                    through accessible, personalized yoga, meditation, and
                    wellness practices.
                  </p>
                  <p>
                    We believe that true wellness extends beyond the physical
                    body – it encompasses mental clarity, emotional balance, and
                    spiritual alignment. Our expert instructors are committed to
                    guiding you through every step of your wellness journey.
                  </p>
                  <div className="btn_wrapper">
                    <Link
                      href="/register"
                      className="text-decoration-none read_more_btn"
                    >
                      Start Your Journey
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="mission_box" style={{ background: "#f4f7ff" }}>
                <div className="mission_content">
                  <h5>Why Choose HoliSpire?</h5>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    <li
                      style={{
                        marginBottom: "15px",
                        paddingLeft: "30px",
                        position: "relative",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#764979",
                          fontSize: "18px",
                        }}
                      ></i>
                      Expert certified instructors with years of experience
                    </li>
                    <li
                      style={{
                        marginBottom: "15px",
                        paddingLeft: "30px",
                        position: "relative",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#764979",
                          fontSize: "18px",
                        }}
                      ></i>
                      Personalized classes tailored to your health goals
                    </li>
                    <li
                      style={{
                        marginBottom: "15px",
                        paddingLeft: "30px",
                        position: "relative",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#764979",
                          fontSize: "18px",
                        }}
                      ></i>
                      Multiple time slots for busy schedules (5:30 AM - 8:30 PM)
                    </li>
                    <li
                      style={{
                        marginBottom: "15px",
                        paddingLeft: "30px",
                        position: "relative",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#764979",
                          fontSize: "18px",
                        }}
                      ></i>
                      Small batch sizes for individual attention
                    </li>
                    <li
                      style={{
                        marginBottom: "15px",
                        paddingLeft: "30px",
                        position: "relative",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#764979",
                          fontSize: "18px",
                        }}
                      ></i>
                      Supportive community of wellness enthusiasts
                    </li>
                    <li
                      style={{
                        marginBottom: "15px",
                        paddingLeft: "30px",
                        position: "relative",
                      }}
                    >
                      <i
                        className="fa-solid fa-check"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: "#764979",
                          fontSize: "18px",
                        }}
                      ></i>
                      Affordable and flexible pricing plans
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="vision_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="vision_box" style={{ background: "#f4f7ff" }}>
                <div className="vision_content">
                  <h5>Our Vision</h5>
                  <h2>A Healthier, Happier World</h2>
                  <p>
                    We envision a world where everyone has access to quality
                    wellness practices that nurture physical health, mental
                    clarity, and spiritual growth.
                  </p>
                  <p>
                    By combining ancient yogic traditions with modern wellness
                    science, we're creating a movement toward holistic health
                    that transcends boundaries and transforms communities.
                  </p>
                  <div className="btn_wrapper">
                    <Link
                      href="/register"
                      className="text-decoration-none read_more_btn"
                    >
                      Join Our Community
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="vision_image">
                <figure className="mb-0">
                  <img
                    src="/aboutus_image.png"
                    alt="Our Vision"
                    className="img-fluid"
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <section className="footer-section" id="footer_section">
        <div className="container">
          <div className="middle-portion">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-lg-block d-none">
                <div className="footer_logo">
                  <Link href="/">
                    <figure className="mb-0">
                      <img
                        src="/logo2.png"
                        alt="HoliSpire"
                        className="img-fluid"
                      />
                    </figure>
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                <div className="about_col">
                  <h4>About Us</h4>
                  <ul className="list-unstyled">
                    <li>
                      <p>
                        At HoliSpire, we are passionate about empowering people
                        to unlock their full potential through yoga, meditation
                        and wellness.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-md-block d-none">
                <div className="links_col">
                  <h4>Quick Links</h4>
                  <ul className="list-unstyled">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="/about">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/register">Register</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 d-sm-block d-none">
                <div className="contact_col">
                  <h4>Contact Info</h4>
                  <ul className="list-unstyled">
                    <li className="contact_icons">
                      <i className="fa-solid fa-phone"></i>
                      <a
                        href="tel:+918130500618"
                        className="text-decoration-none"
                      >
                        +91 8130500618
                      </a>
                    </li>
                    <li className="contact_icons">
                      <i className="fa-sharp fa-solid fa-envelope"></i>
                      <a
                        href="mailto:hrmanagement@holispire.in"
                        className="text-decoration-none"
                      >
                        hrmanagement@holispire.in
                      </a>
                    </li>
                    <li className="mb-0">
                      <i className="fa-solid fa-location-dot location"></i>
                      <span>
                        F-97 Block E, katwaria sarai, New Delhi, 110016
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-portion">
          <div className="copyright col-xl-12">
            <p>Copyright 2024, HoliSpire. All Rights Reserved.</p>
          </div>
        </div>
        <div className="footer_shape right_shape">
          <figure className="mb-0">
            <img src="/footer_shape.png" alt="" className="img-fluid" />
          </figure>
        </div>
      </section>
    </>
  );
}
