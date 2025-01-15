import express from 'express';
import cors from 'cors';
import passport from 'passport';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected Securely'))
  .catch(err => console.log('MongoDB connection error: ',err));
  app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.get('/', (req, res) => {
  res.send('Ticket Booking Backend is Running');
});

app.post('/logsign', async (req, res) => {
  const { email, googleAccessToken } = req.body;
  try {
    const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${googleAccessToken}`);
    if (!userInfoResponse.ok) {
      return res.status(400).json({ message: "Invalid Google OAuth token" });
    }

    const userInfo = await userInfoResponse.json();
    if (userInfo.email !== email) {
      return res.status(400).json({ message: "Google token does not match email" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name: userInfo.name || "Unknown",
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in response
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));