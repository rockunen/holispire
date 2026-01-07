// Register Form Handler with Supabase Integration

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const submitBtn = document.getElementById("submitBtn");
  const loader = document.getElementById("loader");

  // Wait for supabaseConfig to be available
  if (typeof window.supabaseConfig === "undefined") {
    console.error(
      "Supabase config not loaded. Please check supabase-config.js"
    );
    return;
  }

  // Calculate price on page load
  try {
    calculatePrice();
  } catch (error) {
    console.error("Error calculating price on load:", error);
  }

  // Form submission handler
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear previous alerts
    document.getElementById("alertMessage").style.display = "none";

    // Get form values
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const sex = document.getElementById("sex").value;
    const plan = document.getElementById("plan").value;
    const person = document.getElementById("person").value;
    const paidAmount = document.getElementById("paid_amount").value;
    const referalCode = document.getElementById("referal_code").value.trim();

    // Validate form
    if (
      !validateForm(fname, lname, email, mobile, password, sex, plan, person)
    ) {
      return;
    }

    // Show loader and disable button
    loader.classList.add("show");
    submitBtn.disabled = true;

    try {
      const { supabaseClient, showAlert } = window.supabaseConfig;

      // Step 1: Register user with Supabase Auth
      const { data: authData, error: authError } =
        await supabaseClient.auth.signUp({
          email: email,
          password: password,
        });

      if (authError) {
        showAlert("Registration failed: " + authError.message, "danger");
        loader.classList.remove("show");
        submitBtn.disabled = false;
        return;
      }

      const userId = authData.user.id;

      // Step 2: Store user profile in database
      const { data: profileData, error: profileError } = await supabaseClient
        .from("user_profiles")
        .insert([
          {
            user_id: userId,
            first_name: fname,
            last_name: lname,
            email: email,
            mobile: mobile,
            gender: sex,
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        showAlert("Failed to save profile: " + profileError.message, "danger");
        loader.classList.remove("show");
        submitBtn.disabled = false;
        return;
      }

      // Step 3: Create registration record
      const { data: registrationData, error: registrationError } =
        await supabaseClient.from("registrations").insert([
          {
            user_id: userId,
            plan_id: plan,
            num_persons: parseInt(person),
            total_amount: parseFloat(paidAmount.replace(/[^\d.]/g, "")),
            referral_code: referalCode || null,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]);

      if (registrationError) {
        showAlert(
          "Failed to save registration: " + registrationError.message,
          "danger"
        );
        loader.classList.remove("show");
        submitBtn.disabled = false;
        return;
      }

      // Step 4: Initialize payment
      initiatePayment(fname, email, mobile, paidAmount, userId, plan, person);
    } catch (error) {
      const { showAlert } = window.supabaseConfig;
      showAlert("An unexpected error occurred: " + error.message, "danger");
      loader.classList.remove("show");
      submitBtn.disabled = false;
    }
  });

  // Form validation function
  function validateForm(
    fname,
    lname,
    email,
    mobile,
    password,
    sex,
    plan,
    person
  ) {
    const { showAlert, isValidEmail, isValidMobile, isValidPassword } =
      window.supabaseConfig;
    let isValid = true;

    // Clear all error messages
    document
      .querySelectorAll(".invalid-feedback")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".form-control")
      .forEach((el) => el.classList.remove("is-invalid"));

    // Validate first name
    if (!fname) {
      document.getElementById("fnameError").textContent =
        "First name is required";
      document.getElementById("fname").classList.add("is-invalid");
      isValid = false;
    }

    // Validate last name
    if (!lname) {
      document.getElementById("lnameError").textContent =
        "Last name is required";
      document.getElementById("lname").classList.add("is-invalid");
      isValid = false;
    }

    // Validate email
    if (!email) {
      document.getElementById("emailError").textContent = "Email is required";
      document.getElementById("email").classList.add("is-invalid");
      isValid = false;
    } else if (!isValidEmail(email)) {
      document.getElementById("emailError").textContent =
        "Invalid email format";
      document.getElementById("email").classList.add("is-invalid");
      isValid = false;
    }

    // Validate mobile
    if (!mobile) {
      document.getElementById("mobileError").textContent =
        "Mobile number is required";
      document.getElementById("mobile").classList.add("is-invalid");
      isValid = false;
    } else if (!isValidMobile(mobile)) {
      document.getElementById("mobileError").textContent =
        "Mobile number must be 10 digits";
      document.getElementById("mobile").classList.add("is-invalid");
      isValid = false;
    }

    // Validate password
    if (!password) {
      document.getElementById("passwordError").textContent =
        "Password is required";
      document.getElementById("password").classList.add("is-invalid");
      isValid = false;
    } else if (!isValidPassword(password)) {
      document.getElementById("passwordError").textContent =
        "Password must be at least 6 characters";
      document.getElementById("password").classList.add("is-invalid");
      isValid = false;
    }

    // Validate gender
    if (!sex) {
      document.getElementById("sexError").textContent =
        "Please select a gender";
      document.getElementById("sex").classList.add("is-invalid");
      isValid = false;
    }

    // Validate plan
    if (!plan) {
      document.getElementById("planError").textContent = "Please select a plan";
      document.getElementById("plan").classList.add("is-invalid");
      isValid = false;
    }

    // Validate number of persons
    if (!person) {
      document.getElementById("personError").textContent =
        "Please select number of persons";
      document.getElementById("person").classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      showAlert("Please fill in all required fields correctly", "danger");
    }

    return isValid;
  }

  // Initialize payment with Razorpay
  function initiatePayment(
    fname,
    email,
    mobile,
    paidAmount,
    userId,
    plan,
    person
  ) {
    const { showAlert } = window.supabaseConfig;

    // Check if Razorpay script is loaded
    if (typeof Razorpay === "undefined") {
      showAlert(
        "Payment gateway not loaded. Please refresh the page.",
        "danger"
      );
      loader.classList.remove("show");
      submitBtn.disabled = false;
      return;
    }

    // Extract numeric value from paidAmount (remove ₹ and spaces)
    const amount = parseFloat(paidAmount.replace(/[^\d.]/g, ""));

    const options = {
      key: "rzp_live_uVevAW2TsQGKYJ", // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Spy Root Services",
      description: "Yoga Class Registration",
      image: ".yogastic_logo.png",
      handler: async function (response) {
        try {
          // Payment successful, update registration status
          const { supabaseClient } = window.supabaseConfig;

          const { error: updateError } = await supabaseClient
            .from("registrations")
            .update({
              status: "completed",
              payment_id: response.razorpay_payment_id,
              paid_at: new Date().toISOString(),
            })
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(1);

          if (updateError) {
            console.error("Error updating payment status:", updateError);
          }

          loader.classList.remove("show");
          submitBtn.disabled = false;

          // Show success message and redirect
          showAlert("Registration successful! Redirecting...", "success");
          setTimeout(() => {
            window.location.href = "./welcome.html";
          }, 2000);
        } catch (error) {
          console.error("Payment confirmation error:", error);
          showAlert(
            "Payment confirmed but there was an issue updating records. Please contact support.",
            "warning"
          );
          loader.classList.remove("show");
          submitBtn.disabled = false;
        }
      },
      prefill: {
        name: fname,
        email: email,
        contact: mobile,
      },
      theme: {
        color: "#e1ccad",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();

    // Handle payment failures
    rzp.on("payment.failed", function (response) {
      loader.classList.remove("show");
      submitBtn.disabled = false;
      showAlert("Payment failed: " + response.error.description, "danger");
    });
  }
});

// Calculate price function
function calculatePrice() {
  const plan = document.getElementById("plan").value;
  const person = document.getElementById("person").value;
  const paidAmountInput = document.getElementById("paid_amount");

  if (plan && person) {
    if (typeof window.supabaseConfig === "undefined") {
      console.error("Supabase config not available yet");
      return;
    }

    const { calculateTotalAmount } = window.supabaseConfig;
    const total = calculateTotalAmount(plan, parseInt(person));
    paidAmountInput.value = "₹ " + total.toFixed(2);
  } else {
    paidAmountInput.value = "";
  }
}
