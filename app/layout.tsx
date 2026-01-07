import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HoliSpire",
  description: "Your wellness and spiritual healing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zxx">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta charSet="utf-8" />
        {/* Apple Touch Icons */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        {/* Favicon */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        {/* Latest compiled and minified CSS */}
        <link href="/bootstrap.min.css" rel="stylesheet" />
        {/* Font Awesome link */}
        <link rel="stylesheet" href="/all.min.css" />
        {/* StyleSheet link CSS */}
        <link href="/style.css" rel="stylesheet" type="text/css" />
        <link href="/mediaqueries.css" rel="stylesheet" type="text/css" />
        <link href="/custom-style.css" rel="stylesheet" type="text/css" />
        <link href="/special-classes.css" rel="stylesheet" type="text/css" />
        <link href="/aos.css" rel="stylesheet" />
        <link rel="stylesheet" href="/magnific-popup.css" />

        <style>{`
          .left_icons {
            height: 100%;
          }
          
          /* NAVBAR STYLING */
          .banner-section-outer header {
            width: 100%;
            position: relative;
            z-index: 999;
            background: transparent;
          }
          
          .main_header {
            padding: 20px 90px 0;
            background: transparent;
          }
          
          .navbar-collapse ul {
            text-align: center;
            align-items: center;
            display: inherit;
          }
          
          .navbar-expand-lg {
            position: relative;
            z-index: 1;
          }
          
          .navbar-expand-lg .navbar-nav .nav-link {
            padding-right: 0;
            padding-left: 0;
          }
          
          .nav-link {
            padding: 0;
          }
          
          .navbar-brand {
            margin-left: 0;
            margin-right: 0;
            padding-top: 0;
            padding-bottom: 0;
          }
          
          .navbar-nav {
            padding-left: 80px;
            margin-top: 0;
          }
          
          .navbar-nav li {
            margin: 0 35px 0 18px;
          }
          
          .navbar-nav li:first-child {
            margin-left: 0;
          }
          
          .navbar-nav li:last-child {
            margin-right: 0;
            padding-right: 0;
          }
          
          .navbar-nav .nav-item a {
            font-family: "Playfair Display", serif;
            font-size: 18px;
            line-height: 18px;
            font-weight: 400;
            color: #ffffff !important;
            transition: all 0.3s ease-in-out;
          }
          
          .navbar-nav .nav-item a:hover {
            color: #e1ccad !important;
            background-color: transparent;
          }
          
          .navbar-nav .active > a {
            color: #e1ccad !important;
          }
          
          .navbar-nav .dropdown {
            margin: 0 15px 0 20px;
          }
          
          .navbar-nav .nav-item .dropdown-item {
            color: #242424 !important;
            transition: all 0.3s ease-in-out;
          }
          
          .navbar-nav .nav-item .dropdown-item:hover {
            color: #242424 !important;
            background-color: #e1ccad !important;
          }
          
          .navbar-nav .drop-down-pages .active > a {
            color: #242424 !important;
            background-color: #e1ccad !important;
          }
          
          .navbar-collapse .drop-down-pages {
            text-align: left;
            margin-left: 0;
          }
          
          .navbar-nav .dropdown-menu {
            background-color: #ffffff;
            position: absolute;
            left: -20px;
            top: 38px;
            padding: 0;
            border: none;
            box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.1);
          }
          
          .navbar-nav .drop-down-pages li {
            margin: 0;
          }
          
          .navbar-nav .drop-down-pages .nav-item a {
            font-size: 16px;
            line-height: 16px;
            font-weight: 400;
            padding: 12px 20px;
          }
          
          .navbar-expand-lg .drop-down-pages .nav-link {
            padding-left: 0;
          }
          
          .navbar-nav .nav-item .contact_us {
            background-color: #e1ccad;
            color: #413625 !important;
            padding: 20px 50px;
            text-align: center;
            display: inline-block;
            border-radius: 30px 0px 30px 0px;
            transition: all 0.3s ease-in-out;
          }
          
          .navbar-nav .nav-item .contact_us:hover {
            color: #242424 !important;
            background-color: #ffffff;
          }
          
          .navbar-nav .active > .contact_us {
            color: #242424 !important;
            background-color: #ffffff;
          }
          
          .head-logo img {
            -webkit-animation: mover 1s infinite alternate;
            animation: mover 1s infinite alternate;
            max-width: 250px;
          }
          
          @-webkit-keyframes mover {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-30px);
            }
          }
          
          @keyframes mover {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-30px);
            }
          }
          
          /* FORM STYLING - LOGIN & REGISTER */
          .login-banner-section,
          .register-banner-section {
            padding: 80px 0 100px;
            position: relative;
          }
          
          .login-form-wrapper,
          .register-form-wrapper {
            display: flex;
            align-items: center;
            gap: 40px;
          }
          
          .login-form-content,
          .register-form-content {
            flex: 1;
            padding: 40px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            backdrop-filter: blur(10px);
          }
          
          .login-form-content h3,
          .register-form-content h3 {
            text-align: center;
            color: white;
            font-size: 36px;
            margin-bottom: 30px;
            font-family: "Playfair Display", serif;
          }
          
          .login-image,
          .register-image {
            flex: 1;
            position: relative;
            animation: float 6s ease-in-out infinite;
          }
          
          .login-image figure,
          .register-image figure {
            margin: 0;
          }
          
          .login-image figure img,
          .register-image figure img {
            width: 100%;
            max-width: 400px;
            display: block;
            border-radius: 10px;
          }
          
          .auth-form {
            background: transparent;
            display: block !important;
            visibility: visible !important;
          }
          
          .auth-form .form-group {
            margin-bottom: 15px;
            display: block !important;
            visibility: visible !important;
          }
          
          .auth-form label {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
            display: block !important;
            color: white !important;
          }
          
          .auth-form .form-control {
            background-color: rgba(255, 255, 255, 0.95);
            border: none;
            padding: 12px 15px;
            font-size: 14px;
            border-radius: 5px;
            transition: all 0.3s ease;
            display: block !important;
            width: 100% !important;
            visibility: visible !important;
          }
          
          .auth-form .form-control:focus {
            background-color: white;
            box-shadow: 0 0 0 0.2rem rgba(230, 200, 170, 0.25);
            border: none;
          }
          
          .auth-form select.form-control {
            cursor: pointer;
          }
          
          .auth-form .form-control.is-invalid {
            border-color: #dc3545;
          }
          
          .invalid-feedback {
            color: #dc3545;
            font-size: 12px;
            display: block !important;
            margin-top: 5px;
          }
          
          .btn-primary {
            background-color: #e1ccad !important;
            color: #413625 !important;
            border: none;
            padding: 12px 30px;
            font-size: 16px;
            font-weight: 500;
            border-radius: 30px 0px 30px 0px;
            transition: all 0.3s ease-in-out;
            margin-top: 15px;
            width: 100%;
            display: block !important;
            visibility: visible !important;
          }
          
          .btn-primary:hover {
            background-color: white !important;
            color: #764979 !important;
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          
          .btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          .alert {
            border-radius: 5px;
            margin-bottom: 20px;
            display: block !important;
          }
          
          .loader {
            display: none;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #e1ccad;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin-right: 10px;
            vertical-align: middle;
          }
          
          .loader.show {
            display: inline-block;
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          @keyframes float {
            0% {
              box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
              transform: translatex(0px);
            }
            50% {
              box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
              transform: translatex(-20px);
            }
            100% {
              box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
              transform: translatex(0px);
            }
          }
          
          .forgot-password,
          .signup-link,
          .login-link {
            text-align: center;
            margin-top: 20px;
            color: white;
          }
          
          .forgot-password a,
          .signup-link a,
          .login-link a {
            color: #e1ccad;
            text-decoration: none;
            font-weight: 500;
          }
          
          .forgot-password a:hover,
          .signup-link a:hover,
          .login-link a:hover {
            text-decoration: underline;
          }
          
          /* Responsive forms */
          @media (max-width: 768px) {
            .login-form-wrapper,
            .register-form-wrapper {
              flex-direction: column;
              gap: 20px;
            }
            
            .login-form-content,
            .register-form-content {
              padding: 20px;
            }
            
            .login-form-content h3,
            .register-form-content h3 {
              font-size: 28px;
            }
            
            .login-image,
            .register-image {
              max-width: 300px;
              margin: 0 auto;
            }
            
            .main_header {
              padding: 20px 30px 0;
            }
            
            .navbar-nav {
              padding-left: 0;
            }
            
            .navbar-nav li {
              margin: 5px 0;
              text-align: left;
            }
            
            .navbar-nav .nav-item .contact_us {
              padding: 15px 30px;
            }
          }
        `}</style>
      </head>

      <body className={`${inter.variable} antialiased`}>
        {children}

        {/* Latest compiled JavaScript */}
        <script src="/jquery-3.6.0.min.js"></script>
        <script src="/popper.min.js"></script>
        <script src="/video-popup.js"></script>
        <script src="/bootstrap.min.js"></script>
        <script src="/aos.js"></script>
        <script src="/video-section.js"></script>
        <script src="/animation.js"></script>
        <script src="https://unpkg.com/ityped@0.0.10"></script>
        <script src="/type.js"></script>
      </body>
    </html>
  );
}
