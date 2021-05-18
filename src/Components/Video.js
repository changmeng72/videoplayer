import React from "react";

let Video = React.forwardRef((props, ref) => {
  return (
    <>
      <video
        ref={ref}
        className={props.className}
        onPlay={props.onPlay}
        onPause={props.onPause}
        onTimeUpdate={props.onTimeUpdate}
        onDurationChange={props.onDurationChange}
        onClick={props.togglePlay}
      >
        <source
          src="https://media.w3.org/2010/05/sintel/trailer.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </>
  );
});

export default Video;
