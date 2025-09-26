import React, { useEffect, useRef } from 'react';
export default function Video() {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });
  }, []);

  return (
     <div
      className="
        fixed bottom-32 right-0 z-50
        w-[300px] h-{300px}
        max-sm:w-[180px] max-sm:h-[160px]
        p-2
      "
    >
     {/* <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-md shadow-xl"
      />*/}
    </div>
  );
};


