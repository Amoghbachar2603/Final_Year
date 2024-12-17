import React, { useState, useEffect, useRef } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';

const VideoRecorder = () => {
  const videoRef = useRef(null);

  const handleStopRecording = (blob) => {
    // Example: Sending the video blob to the server
    const formData = new FormData();
    formData.append('video', blob, 'recording.mp4');

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Video uploaded successfully!');
        } else {
          console.error('Upload failed');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Video Recorder</h1>
      <ReactMediaRecorder
        video
        onStop={(blobUrl, blob) => handleStopRecording(blob)}
        render={({ status, startRecording, stopRecording, previewStream }) => {
          useEffect(() => {
            if (videoRef.current && previewStream) {
              videoRef.current.srcObject = previewStream;
            }
          }, [previewStream]);

          return (
            <div>
              <p>Status: {status}</p>
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                style={{ width: '300px' }}
              />
              <button onClick={startRecording}>Start Recording</button>
              <button onClick={stopRecording}>Stop Recording</button>
            </div>
          );
        }}
      />
    </div>
  );
};

export default VideoRecorder;
