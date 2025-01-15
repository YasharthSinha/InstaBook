import React, { useState } from 'react';
import './LogSign.css'; // Assuming you have a CSS file for the styles
import { useGoogleLogin } from '@react-oauth/google'; // Import Google OAuth hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Preloader from '../PreLoader/PreLoader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import Navbar from '../Navbar';

const LogSign = () => {
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between Sign Up and Sign In
  const { user, setUser } = useAuth(); // Using the context to manage the user state globally
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    setIsSignUp(!isSignUp); // Toggle the view between Sign Up and Sign In
  };

  // Google login handler using OAuth
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
      const userInfoResponse = await fetch(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        const userObject = {
          given_name: userInfo.given_name,
          email: userInfo.email,
        };

        // Change this to the correct endpoint ('/logsign')
        const response = await fetch('http://localhost:5000/logsign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userInfo.email,
            googleAccessToken: tokenResponse.access_token,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.token;

          // Save the user and token in localStorage
          localStorage.setItem('user', JSON.stringify(userObject));
          localStorage.setItem('authToken', token);

          // Set user in context and navigate to the homepage
          setUser(userObject);
          navigate('/');
        } else {
          console.error('Login failed on backend');
        }
      } else {
        console.error('Failed to fetch user information');
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (!email || !password) {
      return alert('Please fill all required fields');
    }
  
    try {
      const response = await fetch('http://localhost:5000/signin', {  // Change to /signin
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password, // Send password for sign-in
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        alert(data.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
  
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (!name || !email || !password) {
      return alert('Please fill all required fields');
    }
  
    try {
      const response = await fetch('http://localhost:5000/signup', {  // Change to /signup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,  // Include name in the request body
          email,
          password, // Send password for sign-up
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        alert(data.message); // Show error message from backend
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };  

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Remove user from context and logout
    navigate('/'); // Redirect to home page
  };

  return (
    <>
      <Preloader />
      {/* Navbar Component - It will automatically reflect changes when user changes */}
      <Navbar />
      <div className="logcont">
        <div className={`container ${!isSignUp ? 'right-panel-active' : ''}`} id="container">
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUpSubmit}>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="social" onClick={googleLogin}>
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="#" className="social">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignInSubmit}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="#" className="social" onClick={googleLogin}>
                  <FontAwesomeIcon icon={faGoogle} />
                </a>
                <a href="#" className="social">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <span>or use your account</span>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
            </form>
          </div>

          {/* Overlay to switch between Sign Up and Sign In */}
          <div className="overlay-container">
            <div className="overlay">
              {/* Left Overlay Panel - Sign In */}
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Sign In
                </button>
              </div>

              {/* Right Overlay Panel - Sign Up */}
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button className="ghost" onClick={handleSignUpClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Show User Info or Logout */}
        {user ? (
          <>
            <p>Hi, {user.given_name}</p>
            <button className="oauth-button" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default LogSign;
