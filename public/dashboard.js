// Dashboard Handler with Supabase Integration

document.addEventListener('DOMContentLoaded', async function() {
    const loadingState = document.getElementById('loadingState');
    const dashboardContent = document.getElementById('dashboardContent');
    const alertMessage = document.getElementById('alertMessage');

    // Show loading state
    loadingState.style.display = 'block';
    dashboardContent.style.display = 'none';

    try {
        const { supabaseClient, showAlert, planNames } = window.supabaseConfig;

        // Check if user is logged in
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

        if (userError || !user) {
            showAlert('You must be logged in to view this page', 'danger');
            setTimeout(() => {
                window.location.href = './login.html';
            }, 2000);
            return;
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabaseClient
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

        if (profileError && profileError.code !== 'PGRST116') {
            console.error('Error fetching profile:', profileError);
            showAlert('Error loading profile', 'danger');
            loadingState.style.display = 'none';
            return;
        }

        // Populate profile information
        if (profileData) {
            document.getElementById('userNameDisplay').textContent = profileData.first_name;
            document.getElementById('profileFirstName').textContent = profileData.first_name;
            document.getElementById('profileLastName').textContent = profileData.last_name;
            document.getElementById('profileEmail').textContent = profileData.email;
            document.getElementById('profileMobile').textContent = profileData.mobile;
            document.getElementById('profileGender').textContent = profileData.gender;
            document.getElementById('profileCreatedAt').textContent = new Date(profileData.created_at).toLocaleDateString();
        }

        // Fetch user registrations
        const { data: registrationsData, error: registrationsError } = await supabaseClient
            .from('registrations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (registrationsError) {
            console.error('Error fetching registrations:', registrationsError);
            showAlert('Error loading registrations', 'danger');
        }

        // Display registrations
        const registrationsContainer = document.getElementById('registrationsContainer');

        if (!registrationsData || registrationsData.length === 0) {
            registrationsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No registrations yet. <a href="./register.html" style="color: #e1ccad;">Register for a yoga class</a></p>
                </div>
            `;
        } else {
            let registrationsHTML = '';
            
            registrationsData.forEach(registration => {
                const planName = planNames[registration.plan_id] || 'Unknown Plan';
                const statusClass = `status-${registration.status}`;
                const createdDate = new Date(registration.created_at).toLocaleDateString();
                const paidDate = registration.paid_at ? new Date(registration.paid_at).toLocaleDateString() : 'Pending';

                registrationsHTML += `
                    <div class="registration-card">
                        <h5>
                            ${planName}
                            <span class="status-badge ${statusClass}">${registration.status}</span>
                        </h5>
                        <div class="registration-details">
                            <div class="detail-item">
                                <span class="detail-label">Plan:</span>
                                <span class="detail-value">${planName}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">No. of Persons:</span>
                                <span class="detail-value">${registration.num_persons}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Total Amount:</span>
                                <span class="detail-value">₹ ${parseFloat(registration.total_amount).toFixed(2)}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Registration Date:</span>
                                <span class="detail-value">${createdDate}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Payment Status:</span>
                                <span class="detail-value">${registration.status === 'completed' ? 'Completed' : 'Pending'}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Payment ID:</span>
                                <span class="detail-value">${registration.payment_id || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            registrationsContainer.innerHTML = registrationsHTML;
        }

        // Hide loading and show content
        loadingState.style.display = 'none';
        dashboardContent.style.display = 'block';

    } catch (error) {
        console.error('Error loading dashboard:', error);
        const { showAlert } = window.supabaseConfig;
        showAlert('An unexpected error occurred: ' + error.message, 'danger');
        loadingState.style.display = 'none';
    }
});

// Logout function
async function logout() {
    try {
        const { supabaseClient, showAlert } = window.supabaseConfig;
        
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) {
            showAlert('Error logging out: ' + error.message, 'danger');
            return;
        }

        showAlert('Logged out successfully. Redirecting...', 'success');
        setTimeout(() => {
            window.location.href = './login.html';
        }, 1500);

    } catch (error) {
        const { showAlert } = window.supabaseConfig;
        showAlert('An unexpected error occurred: ' + error.message, 'danger');
    }
}