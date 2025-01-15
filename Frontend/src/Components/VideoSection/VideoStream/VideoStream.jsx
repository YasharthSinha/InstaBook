import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import './VideoStream.css';
const VideoStream = ({ id, title, src, isPlaying, videoRef }) => {
  const [playing, setPlaying] = useState(false);
  const videoElement = useRef(null);

  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoElement.current.pause();
    } else {
      videoElement.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video" ref={videoRef} style={{ position: 'relative' }}>
      <video
        onClick={handleVideoPress}
        id={id}
        className="video_player"
        src={src}
        ref={videoElement}
        loop
      />

      <div
        className="movie-title"
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '30px',
          padding: '10px 20px',
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          zIndex: '10'
        }}
      >
        <h1>{title}</h1>
      </div>

      {/* Book Now Button */}
      <Link to={`/movie`} state={{ id: id, name: title }}>
        <button
          className="book-now-button btn"
          style={{
            position: 'absolute',
            bottom: '100px',
            right: '30px',
            cursor: 'pointer',
          }}
        >
          <strong>Book Now</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default VideoStream;
