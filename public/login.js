// Login Form Handler with Supabase Integration

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');

    // Form submission handler
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous alerts
        document.getElementById('alertMessage').style.display = 'none';

        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // Validate form
        if (!validateForm(email, password)) {
            return;
        }

        // Show loader and disable button
        loader.classList.add('show');
        submitBtn.disabled = true;

        try {
            const { supabaseClient, showAlert } = window.supabaseConfig;

            // Sign in with Supabase Auth
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                showAlert('Login failed: ' + error.message, 'danger');
                loader.classList.remove('show');
                submitBtn.disabled = false;
                return;
            }

            // Login successful
            loader.classList.remove('show');
            submitBtn.disabled = false;
            
            showAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 1500);

        } catch (error) {
            const { showAlert } = window.supabaseConfig;
            showAlert('An unexpected error occurred: ' + error.message, 'danger');
            loader.classList.remove('show');
            submitBtn.disabled = false;
        }
    });

    // Form validation function
    function validateForm(email, password) {
        const { showAlert, isValidEmail } = window.supabaseConfig;
        let isValid = true;

        // Clear all error messages
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

        // Validate email
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            document.getElementById('email').classList.add('is-invalid');
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Invalid email format';
            document.getElementById('email').classList.add('is-invalid');
            isValid = false;
        }

        // Validate password
        if (!password) {
            document.getElementById('passwordError').textContent = 'Password is required';
            document.getElementById('password').classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            showAlert('Please fill in all required fields correctly', 'danger');
        }

        return isValid;
    }
});