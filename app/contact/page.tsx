"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

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
                  <h1 data-aos="fade-up">Get In Touch</h1>
                  <p data-aos="fade-right">
                    Have questions? We'd love to hear from you. Send us a
                    message and we'll respond as soon as possible.
                  </p>
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

      {/* CONTACT INFO BOXES */}
      <section className="message_section">
        <div className="container">
          <div className="row" data-aos="fade-up">
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box_image_content">
                  <figure className="mb-0">
                    <i className="fa-solid fa-phone"></i>
                  </figure>
                </div>
                <div className="box_wrapper">
                  <h3>Phone</h3>
                  <a href="tel:+919217432112" className="text-decoration-none">
                    +91 9217432112
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box_image_content">
                  <figure className="mb-0">
                    <i className="fa-solid fa-envelope"></i>
                  </figure>
                </div>
                <div className="box_wrapper">
                  <h3>Email</h3>
                  <a
                    href="mailto:hrmanagement@holispire.in"
                    className="text-decoration-none"
                  >
                    hrmanagement@holispire.in
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="box">
                <div className="box_image_content">
                  <figure className="mb-0">
                    <i className="fa-solid fa-location-dot"></i>
                  </figure>
                </div>
                <div className="box_wrapper">
                  <h3>Location</h3>
                  <p
                    style={{ fontSize: "16px", lineHeight: "22px", margin: 0 }}
                  >
                    F-97 Block E, Katwaria Sarai
                    <br />
                    New Delhi, 110016
                  </p>
                </div>
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
                        href="tel:+919217432112"
                        className="text-decoration-none"
                      >
                        +91 9217432112
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
