const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/authDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  password: String,
  otp: String,
  otpExpires: Date,
});

const User = mongoose.model("User", UserSchema);

// Nodemailer Configuration (Use your Gmail credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password", 
  },
});

// Register User
app.post("/register", async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    const newUser = new User({ username, email, phone, password });
    await newUser.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Generate OTP
app.post("/generate-otp", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = crypto.randomInt(100000, 999999).toString(); 
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60000; 
  await user.save();

  // Send OTP via Email
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).json({ message: "Failed to send OTP" });

    res.json({ message: "OTP sent successfully!" });
  });
});

// Verify OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.json({ message: "OTP verified! Login successful." });
});

// Start Server
app.listen(3000, () => console.log("Server running on port 3000"));

const nodemailer = require("nodemailer");

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com", // Replace with your email
        pass: "your-app-password" // Use an App Password (not your real password)
    }
});

// Function to send email
async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: "your-email@gmail.com",
        to: to,
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Example usage
sendEmail("recipient@example.com", "Test Email", "Hello, this is a test email from Nodemailer!");
