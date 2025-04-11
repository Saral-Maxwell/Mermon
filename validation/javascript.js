function toggleForms() {
    const signinForm = document.getElementById('signin-form');
    const loginForm = document.getElementById('login-form');

    // Toggle between Sign In and Login forms
    if (signinForm.style.display === "none") {
        signinForm.style.display = "block";
        loginForm.style.display = "none";
    } else {
        signinForm.style.display = "none";
        loginForm.style.display = "block";
    }
}

function validateSignin() {
    const username = document.getElementById('signinUsername').value;
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return false;
    }

    if (password.length <= 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    alert('Sign In Successful');
    return true;
}

function validateLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!username || !password) {
        alert('Please fill in all fields');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    // Redirect to landing page with username as a URL parameter
    window.location.href = `landing.htm?username=${encodeURIComponent(username)}`;
    return false;  // Prevent form submission
}
