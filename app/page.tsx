"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
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

    // Initialize video popup
    const script2 = document.createElement("script");
    script2.src = "/video-popup.js";
    script2.async = true;
    document.body.appendChild(script2);

    // Initialize video section
    const script3 = document.createElement("script");
    script3.src = "/video-section.js";
    script3.async = true;
    document.body.appendChild(script3);

    // Initialize animation script
    const script4 = document.createElement("script");
    script4.src = "/animation.js";
    script4.async = true;
    document.body.appendChild(script4);

    // Initialize typed animation
    const script5 = document.createElement("script");
    script5.src = "https://unpkg.com/ityped@0.0.10";
    script5.async = true;
    const script6 = document.createElement("script");
    script5.onload = () => {
      // Initialize type script after ityped library loads
      const script6 = document.createElement("script");
      script6.src = "/type.js";
      script6.async = true;
      document.body.appendChild(script6);
    };
    document.body.appendChild(script5);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
      document.body.removeChild(script4);
      document.body.removeChild(script5);
      if (document.body.contains(script6)) {
        document.body.removeChild(script6);
      }
    };
  }, []);

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
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle dropdown-color navbar-text-color mt-4"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Yoga
                      </a>
                      <div className="dropdown-menu drop-down-content mt-4">
                        <ul className="list-unstyled drop-down-pages">
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-PCOS-PCOD"
                            >
                              Yoga For PCOS & PCOD
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-for-Cervical-and-Neck-pain"
                            >
                              Yoga for Cervical and Neck pain
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Thyroid"
                            >
                              Yoga For Thyroid
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Diabetes"
                            >
                              Yoga For Diabetes
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-High-BP-Hypertension"
                            >
                              Yoga For High BP,Hypertension
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Back-Strengthening"
                            >
                              Yoga For Back Strengthening
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Strength-Flexibility"
                            >
                              Yoga For Strength & Flexibility
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Prenatal-Postnatal"
                            >
                              Yoga For Prenatal & Postnatal
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Wellness"
                            >
                              Yoga For Wellness
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="yoga?yoga=Yoga-For-Weight-Management"
                            >
                              Yoga For Weight Management
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle dropdown-color navbar-text-color"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Classes
                      </a>
                      <div className="dropdown-menu drop-down-content">
                        <ul className="list-unstyled drop-down-pages">
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Regular-Yoga-for-all-beginners"
                            >
                              Regular Yoga for all beginners
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Multi-Style-asanas"
                            >
                              Multi Style asanas
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Yoga-for-Core-Strength-and-flexibility"
                            >
                              Yoga for Core Strength and flexibility
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Power-fitness-Yoga"
                            >
                              Power fitness Yoga
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Advance-Yoga"
                            >
                              Advance Yoga
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Yoga-for-Women"
                            >
                              Yoga for Women
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Yoga-for-Parents"
                            >
                              Yoga for Parents
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="dropdown-item nav-link"
                              href="classes?yoga=Yoga-Combo-for-family-3-Person"
                            >
                              Yoga Combo for family 3 Person
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/register">
                        Join Now
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle dropdown-color navbar-text-color"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        Employee
                      </a>
                      <div className="dropdown-menu drop-down-content">
                        <ul className="list-unstyled drop-down-pages">
                          <li className="nav-item">
                            <Link
                              className="dropdown-item nav-link"
                              href="/emp-signup"
                            >
                              Register
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="dropdown-item nav-link"
                              href="/emp-login"
                            >
                              Login
                            </Link>
                          </li>
                        </ul>
                      </div>
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
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="banner-section-outer">
        {/* BANNER SECTION */}
        <section className="banner-section">
          <div className="container-fluid">
            <div className="row" data-aos="fade-up">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 text-md-left text-center">
                <div className="banner-section-content">
                  <h5>Start a Happy Life</h5>
                  <h1 data-aos="fade-up">
                    Start Healing Your Mind, <span className="ityped"></span>
                  </h1>
                  <p data-aos="fade-right">
                    Discover Your Inner Strength and Vitality at HoliSpire
                    Services.
                  </p>
                  <div className="btn_wrapper" data-aos="fade-up">
                    <Link
                      href="/register"
                      className="text-decoration-none getstarted_btn"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <div className="banner-section-image">
                  <figure className="mb-0">
                    <img
                      className="bannerimage"
                      src="/banner_right_image.png"
                      alt=""
                    />
                  </figure>
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
        </section>
      </div>

      {/* OUR SERVICES SECTION */}
      <section className="services_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="services_content">
                <h5>Our Services</h5>
                <h2>Practice Whereever You Want Whenever You Need</h2>
                <p>
                  At HoliSpire, we are passionate about empowering people to
                  unlock their full potential through the transformative
                  practices of yoga, meditation and zumba.
                </p>
              </div>
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="services_box_content">
                <div className="services_box_upper_portion">
                  <figure className="mb-0">
                    <img
                      src="/services_img_1.png"
                      alt=""
                      className="img-fluid"
                    />
                  </figure>
                </div>
                <div className="services_box_lower_portion">
                  <h3>Yoga For PCOS & PCOD</h3>
                  <p></p>
                  <div className="btn_wrapper">
                    <a href="" className="text-decoration-none">
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="services_box_content">
                <div className="services_box_upper_portion">
                  <figure className="mb-0">
                    <img
                      src="/services_img_2.png"
                      alt=""
                      className="img-fluid"
                    />
                  </figure>
                </div>
                <div className="services_box_lower_portion">
                  <h3>Yoga for prenatal and postnatal</h3>
                  <p></p>
                  <div className="btn_wrapper">
                    <a href="" className="text-decoration-none">
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="services_box_content">
                <div className="services_box_upper_portion">
                  <figure className="mb-0">
                    <img
                      src="/services_img_3.png"
                      alt=""
                      className="img-fluid"
                    />
                  </figure>
                </div>
                <div className="services_box_lower_portion">
                  <h3>Yoga for Cervical and Neck pain</h3>
                  <p></p>
                  <div className="btn_wrapper">
                    <a href="" className="text-decoration-none">
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="services_box_content">
                <div className="services_box_upper_portion">
                  <figure className="mb-0">
                    <img
                      src="/services_img_4.png"
                      alt=""
                      className="img-fluid"
                    />
                  </figure>
                </div>
                <div className="services_box_lower_portion">
                  <h3>Yoga for Wellness</h3>
                  <p></p>
                  <div className="btn_wrapper">
                    <a href="" className="text-decoration-none">
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <figure className="services_left_shape left_shape mb-0">
            <img src="/services_left_shape.png" alt="" className="img-fluid" />
          </figure>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section className="aboutus_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
              <div className="aboutus_image">
                <figure className="mb-0">
                  <img src="/aboutus_image.png" alt="" className="img-fluid" />
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
              className="col-lg-5 col-md-5 col-sm-12 col-xs-12"
              data-aos="fade-right"
            >
              <div className="aboutus_content">
                <h5>About us</h5>
                <h2>Take Your Yoga to the Next Level</h2>
                <p>
                  Our classes are designed to challenge you physically, energize
                  you mentally, and nourish you spiritually. Our experienced
                  teachers expertly guide you through sequences that build
                  strength, flexibility and balance.
                </p>
                <div className="aboutus_line_wrapper">
                  <h6>
                    Experience the Joy of Movement, Breath and Awareness with
                    HoliSpire.
                  </h6>
                  <figure className="mb-0 purple_line">
                    <img src="/aboutus_line.png" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="btn_wrapper">
                  <Link
                    href="/"
                    className="text-decoration-none get_started_btn"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SPECIALTIES SECTION */}
      <section className="our_specialties_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="our_specialties_heading_content">
                <h5>Our Specialties</h5>
                <h2>Why Choose Us</h2>
                <p>
                  At HoliSpire, we don't just provide great yoga, meditation and
                  zumba classes - we create life-changing experiences.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              data-aos="fade-right"
            >
              <div className="specialties_content_wrapper">
                <div className="specialties_content s1">
                  <p className="specialties_name">Vinyasa Yoga</p>
                  <p className="specialties_paragraph">
                    Flow from one pose to the next in a dynamic practice that
                    builds strength and flexibility.
                  </p>
                </div>
                <div className="specialties_content s2">
                  <p className="specialties_name">Slow Yoga</p>
                  <p className="specialties_paragraph">
                    Hold poses longer to increase body awareness, relieve
                    stress, and promote deep relaxation.
                  </p>
                </div>
                <div className="specialties_content s3">
                  <p className="specialties_name">Intuitive Yoga</p>
                  <p className="specialties_paragraph">
                    Let your inner wisdom guide your practice through a blend of
                    gentle, meditative movements.
                  </p>
                </div>
                <div className="specialties_content s4">
                  <p className="specialties_name">Aroma Yoga</p>
                  <p className="specialties_paragraph">
                    Enhance your practice with essential oils to uplift your
                    mood, energy, and focus.
                  </p>
                </div>
                <figure className="specialties_left_line mb-0">
                  <img
                    src="/specialties_left_line.png"
                    alt=""
                    className="img-fluid"
                  />
                </figure>
              </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-6 col-xs-12 d-md-block d-none">
              <figure className="specialties_image mb-0">
                <img
                  src="/specialties_image.png"
                  alt=""
                  className="img-fluid"
                />
              </figure>
            </div>
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              data-aos="fade-right"
            >
              <div className="specialties_content_wrapper">
                <div className="specialties_content specialties_content2 s5">
                  <p className="specialties_name">Kundalini Yoga</p>
                  <p className="specialties_paragraph">
                    Awaken inner energy through breathwork, chanting, and
                    powerful sequences to find balance.
                  </p>
                </div>
                <div className="specialties_content specialties_content2 s6">
                  <p className="specialties_name">Bikram Yoga</p>
                  <p className="specialties_paragraph">
                    Sweat out toxins and revitalize your body in a heated studio
                    with 26 challenging poses.
                  </p>
                </div>
                <div className="specialties_content specialties_content2 s7">
                  <p className="specialties_name">Mindfulness Training</p>
                  <p className="specialties_paragraph">
                    Develop present moment awareness and reduce anxiety through
                    mindful movements and meditation.
                  </p>
                </div>
                <div className="specialties_content specialties_content2 s8">
                  <p className="specialties_name">Workout Routines</p>
                  <p className="specialties_paragraph">
                    Combine yoga with functional strength training for a
                    full-body workout that sculpts and tones.
                  </p>
                </div>
                <figure className="specialties_right_line mb-0">
                  <img
                    src="/specialties_right_line.png"
                    alt=""
                    className="img-fluid"
                  />
                </figure>
              </div>
            </div>
          </div>
          <figure className="our_specialties_right_shape right_shape mb-0">
            <img
              src="/our_specialties_right_shape.png"
              alt=""
              className="img-fluid"
            />
          </figure>
        </div>
      </section>

      {/* GET IN TOUCH SECTION */}
      <section className="get_in_touch_section">
        <div className="container">
          <div className="row" data-aos="fade-up">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <div className="get_in_touch_content">
                <h2>How it works?</h2>
                <h5>Once you've enrolled, HoliSpire services -</h5>
                <ul>
                  <li className="pt-4">
                    1. Personalized classes specific to your health goals and
                    medical history
                  </li>
                  <li className="pt-4">
                    2. Multiple daily time slots for classes from 5.30 AM to
                    8.30 PM
                  </li>
                  <li className="pt-4">
                    3. Smaller batches for individual attention to each
                    participant
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-2 col-xs-12 d-md-block d-none"></div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <div className="get_in_touch_video position-relative">
                <a
                  className="popup-vimeo"
                  href="https://previews.customer.envatousercontent.com/6720474d-ddc3-4b86-acf1-8d093cb37b6d/watermarked_preview/watermarked_preview.mp4"
                >
                  <figure className="video_img mb-0">
                    <img
                      className="thumb img-fluid"
                      style={{ cursor: "pointer" }}
                      src="/get_in_touch_video_icon.png"
                      alt=""
                    />
                  </figure>
                </a>
              </div>
            </div>
          </div>
          <figure className="get_in_touch_shape left_shape mb-0">
            <img src="/get_in_touch_shape.png" alt="" className="img-fluid" />
          </figure>
        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section className="pricing_plans_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="pricing_plans_content">
                <h5>What We Offer</h5>
                <h2>Our Pricing Plans</h2>
              </div>
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-01.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Regular Yoga for all beginners</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 12 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 999</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-02.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Multi Style asanas</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 18 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 1500</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-03.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">
                      Yoga for Core Strength and flexibility
                    </Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 25 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 2000</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-04.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Power fitness Yoga</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 35 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 3500</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-05.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Advance Yoga</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 50 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 4900</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-06.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Yoga for Women</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 14 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 1200</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-07.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Yoga for Parents</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 15 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 1300</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <div className="pricing_plans_box_content">
                <div className="pricing_plans_box_upper_portion">
                  <figure className="pricing_plans_image mb-0">
                    <img src="/spyroots-08.jpg" alt="" className="img-fluid" />
                  </figure>
                </div>
                <div className="pricing_plans_box_lower_portion">
                  <h3>
                    <Link href="/register">Yoga Combo for family 3 Person</Link>
                  </h3>
                  <div className="row m-2">
                    <div className="col-md-6 upp">Yoga Class - For 12 Days</div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="pricing_plans_span_wrapper">
                            <span className="price">₹ 2700</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <Link
                            href="/register"
                            className="enroll_now_btn text-decoration-none"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <div className="testimonial_section">
        <div className="container">
          <div className="row" data-aos="fade-up">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <div className="testimonial_content">
                      <i className="fa-solid fa-quote-left"></i>
                      <p className="testimonial_paragraph">
                        "I started practicing yoga at HoliSpire last year and it
                        has transformed my life. The teachers are so supportive
                        and I've gained both physical strength and mental
                        clarity. I'm calmer, more energized and feel better
                        about myself than ever before. I'd recommend these
                        classes to anyone looking to improve their health and
                        happiness."
                      </p>
                      <figure>
                        <img
                          src="/testimonial_image.png"
                          alt=""
                          className="img-fluid testimonial_image"
                        />
                      </figure>
                      <p className="testimonial_person_name">
                        Hannah Schneider
                      </p>
                      <span>Happy client</span>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div className="testimonial_content">
                      <i className="fa-solid fa-quote-left"></i>
                      <p className="testimonial_paragraph">
                        "As a busy working mom, I was completely stressed out.
                        But after just 2 weeks of yoga and meditation classes at
                        HoliSpire, I felt like a new person! I'm sleeping
                        better, have more patience with my kids, and feel much
                        more resilient during hectic days. The studio has a
                        warm, welcoming atmosphere too."
                      </p>
                      <figure>
                        <img
                          src="/testimonial_image.png"
                          alt=""
                          className="img-fluid testimonial_image"
                        />
                      </figure>
                      <p className="testimonial_person_name">Padmini Rangrez</p>
                      <span>Happy client</span>
                    </div>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <i className="fa-solid fa-arrow-left-long"></i>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <i className="fa-solid fa-arrow-right-long"></i>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <figure className="testimonial_left_shape left_shape mb-0">
            <img
              src="/testimonial_left_shape.png"
              alt=""
              className="img-fluid"
            />
          </figure>
          <figure className="testimonial_right_shape right_shape mb-0">
            <img
              src="/testimonial_right_shape.png"
              alt=""
              className="img-fluid"
            />
          </figure>
        </div>
      </div>

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
                        to unlock their full potential through the
                        transformative practices of yoga, meditation and zumba.
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
                      <Link href="/">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="/">Refund Policy</Link>
                    </li>
                    <li>
                      <Link href="/">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="/">Contact Us</Link>
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
                        href="tel:+91XXXXXXXXX"
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
                        {" "}
                        F-97 Block E, katwaria sarai, New Delhi,110016
                      </span>
                    </li>
                    <li className="mb-0">
                      <span> LLPIN: ACJ-6221</span>
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
