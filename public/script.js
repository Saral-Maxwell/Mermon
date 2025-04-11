const API_URL = 'http://localhost:3000';

// Register Form
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, phone, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            // Generate OTP after successful registration
            await generateOTP(email);
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        alert('Error during registration');
    }
});

// Login Form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful!');
            // Generate OTP after successful login
            await generateOTP(email);
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Error during login');
    }
});

// OTP Form
document.getElementById('otpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const otp = document.getElementById('otp').value;

    try {
        const response = await fetch(`${API_URL}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        });

        const data = await response.json();
        if (response.ok) {
            alert('OTP verified successfully!');
            document.getElementById('otpSection').style.display = 'none';
        } else {
            alert(data.message || 'OTP verification failed');
        }
    } catch (error) {
        alert('Error during OTP verification');
    }
});

// Generate OTP
async function generateOTP(email) {
    try {
        const response = await fetch(`${API_URL}/generate-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();
        if (response.ok) {
            alert('OTP sent to your email!');
            document.getElementById('otpSection').style.display = 'block';
        } else {
            alert(data.message || 'Failed to generate OTP');
        }
    } catch (error) {
        alert('Error generating OTP');
    }
} 