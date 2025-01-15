import React from 'react';
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer bg-gradient-to-r from-[#ae8625]  via-[#d2ac47] to-[#926f34]">
      <div className="heading">
        <h2>InstaBook<sup>™</sup></h2>
      </div>
      <div className="content">
        
        <div className="social-media">
          <h4>Social</h4>
          <p>
            <a href="#"><i className="fab fa-linkedin"></i> Linkedin</a>
          </p>
          <p>
            <a href="#"><i className="fab fa-twitter"></i> Twitter</a>
          </p>
          <p>
            <a href="#"><i className="fab fa-github"></i> Github</a>
          </p>
          <p>
            <a href="#"><i className="fab fa-codepen"></i> Codepen</a>
          </p>
          <p>
            <a href="#"><i className="fab fa-instagram"></i> Instagram</a>
          </p>
        </div>
        <div className="links">
          <h4>Quick links</h4>
          <p><a href="#">Home</a></p>
          <p><a href="#">Movies</a></p>
          <p><a href="#">Regional</a></p>
          <p><a href="#">Videos</a></p>
        </div>
        <div className="details">
          <h4 className="address">Address</h4>
          <p>
            KIIT University <br />
            Bhubaneshwar, India
          </p>
          <h4 className="mobile">Mobile</h4>
          <p><a href="#">+917704840779</a></p>
          <h4 className="mail">Email</h4>
          <p><a href="#">yasharthsinha05@gmail.com</a></p>
        </div>
      </div>
      <footer>
        © 2024 InstaBook Pvt. Ltd.
        All rights are reserved<br /><br />
        <div className="credit">Made with <span className='heart-credit' style={{ color: 'tomato' }}>❤</span> by Yasharth Sinha </div>
      </footer>
    </div>
  );
};

export default Footer;
