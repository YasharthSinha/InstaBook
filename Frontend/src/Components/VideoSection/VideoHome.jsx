import React, { useEffect, useState, useRef } from 'react';
import VideoStream from './VideoStream/VideoStream';
import Videos from './VideoStream/Videos';
import Navbar from '../Navbar';
import PreLoader from '../PreLoader/PreLoader';
import "./VideoHome.css";

const VideoHome = () => {
  const [video, setVideo] = useState([]);
  const videoRefs = useRef({}); // Using an object to hold video refs
  const [playingId, setPlayingId] = useState(null); // Track the currently playing video ID

  // Update the video list on mount
  useEffect(() => {
    setVideo(Videos);
  }, []);

  // IntersectionObserver to detect when video enters or leaves the screen
  useEffect(() => {
    const options = {
      root: null, // Observe within the viewport
      rootMargin: '0px',
      threshold: 0.5, // Video should be at least 50% visible to trigger
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoId = entry.target.id;
        if (entry.isIntersecting) {
          // If video enters the screen, play it and stop others
          setPlayingId(videoId);
        } else {
          // If video leaves the screen, stop it
          if (playingId === videoId) {
            setPlayingId(null);
          }
        }
      });
    }, options);

    // Observe all video elements
    Object.values(videoRefs.current).forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, [playingId]);

  return (
    <div>
      <PreLoader />
      <Navbar />
      <div className="app">
        <div className="vid">
          {video.map((vid) => (
            <VideoStream
              key={vid.id}
              id={vid.id}
              title={vid.title}
              src={vid.url}
              isPlaying={playingId === vid.id} // Pass if the video is playing
              videoRef={(el) => (videoRefs.current[vid.id] = el)} // Assign refs using video id as key
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoHome;
