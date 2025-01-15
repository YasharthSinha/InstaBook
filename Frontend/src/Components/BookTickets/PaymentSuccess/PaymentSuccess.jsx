import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./PaymentSuccess.css";
const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, phone, totalAmount, premiumSeatsfinal, normalSeatsfinal } = location.state || {};
  const goHome=()=>{
    navigate('/');
  }
  return (
    <div className="payment-success bg-gradient-to-r from-[#ae8625] via-[#d2ac47] to-[#926f34]">
      <h2>Payment Successful!</h2>
      <p>Thank you for booking with InstaBook. Here are your booking details:</p>
      <div className="confirmation-details">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Total Amount Paid:</strong> ₹{totalAmount}</p>
        <p><strong>Premium Seats:</strong> {premiumSeatsfinal}</p>
        <p><strong>Normal Seats:</strong> {normalSeatsfinal}</p>
      </div>
      <button onClick={goHome}>Go home</button>
    </div>
  );
};

export default PaymentSuccessPage;
