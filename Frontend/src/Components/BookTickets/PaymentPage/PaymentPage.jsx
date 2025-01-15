
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./PaymentPage.css";
import SubNavbar from '../SubNavbar/SubNavbar';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, premiumSeatsfinal, normalSeatsfinal } = location.state || {};

  // State to capture the user inputs
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Initialize Razorpay and launch the payment gateway
  const launchRazorPay = () => {
    if (!email || !phone) {
      alert('Please enter both email and phone number.');
      return;
    }

    let options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay Key ID
      amount: totalAmount * 100, // Razorpay expects the amount in paise
      currency: 'INR',
      name: 'InstaBook',
      description: 'Movie Ticket Booking Payment',
      handler: function (response) {
        alert('Payment successful!');

        // Pass the user details along with seats and payment info to the success page
        navigate('/payment-success', {
          state: { email, phone, totalAmount, premiumSeatsfinal, normalSeatsfinal }
        });
      },
      theme: { color: '#c4242d' }
    };

    let razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <SubNavbar />
      <div className="payment-page bg-gradient-to-r from-[#ae8625] via-[#d2ac47] to-[#926f34]">
        <div className='input-container'>
          <label htmlFor="email" className="input-label">Enter your email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="phone" className="input-label">Enter your phone:</label>
          <input
            type="phone"
            id="phone"
            placeholder="Enter your phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <h3>Total Amount: ₹{totalAmount}</h3>

        <button className="pay-now-btn pybtn" onClick={launchRazorPay}>
          <span class="circle1"></span>
          <span class="circle2"></span>
          <span class="circle3"></span>
          <span class="circle4"></span>
          <span class="circle5"></span>
          <span class="text">Pay Now</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
