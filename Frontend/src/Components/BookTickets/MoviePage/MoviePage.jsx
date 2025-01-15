import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SubNavbar from '../SubNavbar/SubNavbar';
import Preloader from '../../PreLoader/PreLoader';
import "./MoviePage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faX } from '@fortawesome/free-solid-svg-icons';

const MoviePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name } = location.state || {};

  // State to manage the number of seats and pricing
  const [premiumSeats, setPremiumSeats] = useState(0);
  const [normalSeats, setNormalSeats] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [seatType, setSeatType] = useState(''); // Track which seat type is selected ('premium' or 'normal')

  const premiumSeatPrice = 400; // Example price for premium seats
  const normalSeatPrice = 200;  // Example price for normal seats


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const showTimes = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "10:00 PM"];
  const today = new Date();
  // Function to handle seat increment and decrement
  const handleSeatChange = (type, action) => {
    if (type === 'premium') {
      if (action === 'increase') {
        setPremiumSeats(prev => prev + 1);
      } else if (action === 'decrease' && premiumSeats > 0) {
        setPremiumSeats(prev => prev - 1);
      }
    } else if (type === 'normal') {
      if (action === 'increase') {
        setNormalSeats(prev => prev + 1);
      } else if (action === 'decrease' && normalSeats > 0) {
        setNormalSeats(prev => prev - 1);
      }
    }
  };

  // Calculate the total amount
  const totalAmount = (premiumSeats * premiumSeatPrice) + (normalSeats * normalSeatPrice);
  const premiumSeatsfinal = premiumSeats;
  const normalSeatsfinal = normalSeats;
  // Open the modal for seat selection
  const openSeatSelectionModal = (type) => {
    setSeatType(type);
    setIsModalOpen(true);
  };

  // Handle seat selection from modal
  const handleSeatSelection = (number) => {
    if (seatType === 'premium') {
      setPremiumSeats(number);
    } else if (seatType === 'normal') {
      setNormalSeats(number);
    }
    setIsModalOpen(false); // Close modal after selecting
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Remove seats for a particular type
  const removeSeats = (type) => {
    if (type === 'premium') {
      setPremiumSeats(0);
    } else if (type === 'normal') {
      setNormalSeats(0);
    }
  };

  // Handle "Proceed to Pay" button click
  const handleProceedToPay = () => {
    navigate('/payment', { state: { totalAmount, premiumSeatsfinal, normalSeatsfinal } });
  };
  if (!id || !name) {
    return <div>Movie details not available!</div>;
  }

  return (
    <>
      <Preloader />
      <SubNavbar />
      <section className="movie-page-container bg-gradient-to-r from-[#ae8625] via-[#d2ac47] to-[#926f34] ">
        <h1 className='movie-pg-heading'>You are booking for: {name}</h1>
        <div className='show-timing-selection'>

        </div>
        {/* Premium Seats Section */}
        <div className="seat-selection-container">
          <div className="seat-type">
            <span className="seat-label">Recliner(₹400)</span>
            <div className="seat-controls">
              <a onClick={() => openSeatSelectionModal('premium')}><FontAwesomeIcon icon={faChevronDown} /></a>
              <span>{premiumSeats}</span>
              <a onClick={() => removeSeats('premium')} className="delete-icon"><FontAwesomeIcon icon={faX} /></a>
            </div>
          </div>

          {/* Normal Seats Section */}
          <div className="seat-type">
            <span className="seat-label">Classic(₹200)</span>
            <div className="seat-controls">
              <a onClick={() => openSeatSelectionModal('normal')}><FontAwesomeIcon icon={faChevronDown} /></a>
              <span>{normalSeats}</span>
              <a onClick={() => removeSeats('normal')} className="delete-icon"><FontAwesomeIcon icon={faX} /></a>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="total-amount">
          <h4>Total Amount: ₹{totalAmount}</h4>
        </div>

        {/* Proceed to Pay Button */}
        <div className="proceed-button-container">
          <button className="proceed-to-pay-btn ptpbtn" onClick={handleProceedToPay}>
            <span class="circle1"></span>
            <span class="circle2"></span>
            <span class="circle3"></span>
            <span class="circle4"></span>
            <span class="circle5"></span>
            <span class="text">Checkout</span>
          </button>
        </div>

        {/* Modal for Seat Selection */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={closeModal}>&times;</span>
              <h3>Seat Selection</h3>
              <p><strong>Seat Type:</strong> {seatType === 'premium' ? 'Recliner (₹400)' : 'Classic (₹200)'}</p>
              <div className="seat-options">
                {[...Array(10).keys()].map(i => (
                  <button
                    key={i}
                    className="seat-option-btn"
                    onClick={() => handleSeatSelection(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MoviePage;
