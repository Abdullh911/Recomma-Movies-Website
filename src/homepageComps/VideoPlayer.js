import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
      <iframe 
        src={videoUrl} 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
        allowFullScreen 
        title="Video Player"
      />
    </div>
  );
};

export default VideoPlayer;