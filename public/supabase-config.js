// Supabase Configuration
// Replace these with your actual Supabase credentials
const SUPABASE_URL = "https://holispire.supabase.co";
const SUPABASE_ANON_KEY = "sb_secret_o3LrMGmj9pJPtQxHkCtSPw_Gq9ZYy0v";

// Initialize Supabase Client
const { createClient } = window.supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Plan pricing mapping
const planPrices = {
  1: 999, // Regular Yoga
  2: 1500, // Multi Style asanas
  4: 2000, // Yoga for Core Strength
  5: 3500, // Power fitness Yoga
  6: 4900, // Advance Yoga
  7: 1200, // Yoga for Women
  8: 1300, // Yoga for Parents
  9: 2700, // Yoga Combo for family
};

// Plan names mapping
const planNames = {
  1: "Regular Yoga for all beginners",
  2: "Multi Style asanas",
  4: "Yoga for Core Strength and flexibility",
  5: "Power fitness Yoga",
  6: "Advance Yoga",
  7: "Yoga for Women",
  8: "Yoga for Parents",
  9: "Yoga Combo for family (3 Person)",
};

// Helper function to display alerts
function showAlert(message, type = "danger") {
  const alertDiv = document.getElementById("alertMessage");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.textContent = message;
  alertDiv.style.display = "block";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 5000);
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate mobile number
function isValidMobile(mobile) {
  const mobileRegex = /^[0-9]{10}$/;
  return mobileRegex.test(mobile.replace(/\D/g, ""));
}

// Helper function to validate password
function isValidPassword(password) {
  return password.length >= 6;
}

// Calculate total amount based on plan and number of persons
function calculateTotalAmount(planId, numPersons) {
  const basePrice = planPrices[planId] || 0;
  const total = basePrice * numPersons;
  return total;
}

// Export functions for use in register.js
window.supabaseConfig = {
  supabaseClient,
  planPrices,
  planNames,
  showAlert,
  isValidEmail,
  isValidMobile,
  isValidPassword,
  calculateTotalAmount,
};
