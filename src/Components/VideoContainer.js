import React, { useEffect, useRef, useState } from "react";
import Video from "./Video";
import VideoTopBar from "./VideoTopBar";
import VideoProgressBar from "./VideoProgressBar";
import VideoControlBar from "./VideoControlBar";
import SpeedPanel from "./SpeedPanel";
import VolumeBar from "./VolumeBar";
import TimeTag from "./TimeTag";
import "./video.css";

const volumeBarHeight = 80;
const volumeholderRadius = 8;
let count = 0;

function VideoContainer(props) {
  const [showController, setShowController] = useState(false);
  const video = useRef(null);
  const container = useRef(null);
  const speedRef = useRef(null);
  const volumeBarRef = useRef(null);
  const speedButtonRef = useRef(null);
  const progressBarRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0); //currentTime of Video
  const [duration, setDuration] = useState(0); //duration of video
  const [play, setPlay] = useState(false); //current playing state
  const [fullscreen, setFullscreen] = useState(false); //state of full screen
  const [playRate, setPlayRate] = useState(1); //current playback rate
  const [volume, setVolume] = useState(1); //current volume
  const [lastVolume, setLastVolume] = useState(1); //previous volume ,used to toggle between mute and no mute
  const [loadedDuration, setloadedDuration] = useState(0.0); //duration of loaded media
  /* for time tag*/
  const [timeTagX, setTimeTagX] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [showTimeTag, setShowTimeTag] = useState(false);

  //hide the controller when it's idle and playing
  useEffect(() => {
    const updateLoadedDuration = () => {
      if (
        video.current &&
        video.current.buffered &&
        video.current.buffered.end
      ) {
        setloadedDuration(() => video.current.buffered.end(0));
      }
    };

    const monitorMotion = (event) => {
      count = 0;
      setShowController(true);
    };

    const showController = () => {
      count = count + 1;
      if (count === 6) {
        // now it's static, waiting 3 secs before hide the controlls
        count = 0;
        setShowController(false);
      }
      updateLoadedDuration();
    };

    document.addEventListener("mousemove", monitorMotion);

    let timer = setInterval(showController, 500); //interval is 500ms now

    return () => {
      document.removeEventListener("mousemove", monitorMotion);
      clearInterval(timer);
    };
  }, []);

  //set video playbackrate
  useEffect(() => {
    video.current.playbackRate = playRate;
  }, [playRate]);
  //set video volume
  useEffect(() => {
    video.current.volume = volume;
  }, [volume]);

  // handle video event
  const onPlay = () => {
    setPlay(() => true);
  };
  const onPause = () => {
    setPlay(() => false);
  };
  const onTimeUpdate = () => {
    setCurrentTime(video.current.currentTime);
  };
  const onDurationChange = () => {
    setDuration(video.current.duration);
  };
  // progress bar
  const setCurTimeByClick = (event, offsetX = 0) => {
    let rect = progressBarRef.current.getBoundingClientRect();
    let pos = event.clientX - rect.left;
    if (pos > props.width - 100) pos = props.width - 100;
    if (pos < 0) pos = 0;
    video.current.currentTime = (duration * pos) / (props.width - 100);
  };

  const setCurTimeByDrag = (event) => {
    let rect = event.target.getBoundingClientRect();
    let offsetX = event.clientX - rect.left - volumeholderRadius;

    function handleMouseMove(event) {
      setCurTimeByClick(event, offsetX);
    }

    function handleMouseUp(event) {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };
  /*show time tag when mouseover progress bar*/
  ///////
  const showVideoPositionTime = (event) => {
    let rect = event.currentTarget.getBoundingClientRect();
    let offsetX = event.clientX - rect.left;

    if (props.width > 100) {
      setSearchTime(parseInt((offsetX * duration) / (props.width - 100))); //length of progress bar is w-100
    }

    setTimeTagX(event.clientX);
  };

  const toggleTimeTag = (show) => {
    setShowTimeTag(() => show);
  };

  /*volumebar*/
  const checkAndCloseVolumeBar = (event) => {
    if (
      volumeBarRef.current &&
      volumeBarRef.current.style.visibility === "visible"
    ) {
      let vbRect = volumeBarRef.current.getBoundingClientRect();

      if (
        //this is a small detection area, if the mouse out of it ,then the volume bar will be hidden.
        event.clientY < vbRect.bottom + 100 &&
        event.clientY > vbRect.top - 10 &&
        event.clientX > vbRect.left - 10 &&
        event.clientX < vbRect.right + 10
      ) {
      } else {
        //point out of area
        volumeBarRef.current.style.visibility = "hidden";
        oper.toggleProgressBar(true);
        document.removeEventListener("mousemove", checkAndCloseVolumeBar);
      }
    } else {
      document.removeEventListener("mousemove", checkAndCloseVolumeBar);
    }
  };

  //volume bar operations
  const handleSetVolumeWithPoint = (event, offsetY = 0) => {
    let rect = volumeBarRef.current.getBoundingClientRect();
    let pos = rect.bottom - event.clientY - 20 - offsetY; //layout of volume bar is fixed now, fix maybe
    if (pos < 0) pos = 0;
    if (pos > volumeBarHeight) pos = volumeBarHeight;
    let v = pos / volumeBarHeight;
    setVolume(() => v);
    setLastVolume(() => v);
  };

  const handleVolumeBarMouseDown = (offsetY) => {
    function handleMouseMove(event) {
      handleSetVolumeWithPoint(event, offsetY);
    }
    function handleMouseUp(event) {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    }

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };
  /*operations provided to child controls*/
  let oper = {
    play: () => {
      video.current.play();
      setDuration(video.current.duration);
    },
    pause: () => {
      video.current.pause();
    },
    rewind: () => {
      let t = video.current.currentTime - 10;
      if (t < 0) video.current.currentTime = 0;
      else video.current.currentTime = t;
      setCurrentTime(video.current.currentTime);
    },
    skip: () => {
      let t = video.current.currentTime + 10;
      if (t > video.current.duration)
        video.current.currentTime = video.current.duration;
      else video.current.currentTime = t;
      setCurrentTime(video.current.currentTime);
    },
    fullscreen: () => {
      let elem = container.current;
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullScreen) elem.msRequestFullScreen();
      setFullscreen(() => true);
    },
    exitFullScreen: () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setFullscreen(() => false);
    },
    toggleSpeed: () => {
      speedRef.current.style.visibility === "hidden"
        ? (speedRef.current.style.visibility = "visible")
        : (speedRef.current.style.visibility = "hidden");
      if (speedRef.current.style.visibility === "visible") {
        speedRef.current.focus();
      }
    },
    updateSpeed: (v) => {
      if (v >= 0.25 && v <= 2.0) setPlayRate(() => v);
    },
    toggleProgressBar: (visible) => {
      if (visible === true) progressBarRef.current.style.visibility = "visible";
      else if (progressBarRef.current.style.visibility !== "hidden")
        progressBarRef.current.style.visibility = "hidden";
      else progressBarRef.current.style.visibility = "visible";
    },
    handleVolumeMouseOver: (x, y) => {
      if (volumeBarRef.current.style.visibility !== "visible") {
        volumeBarRef.current.style.top = y - 10 - 120 + "px"; // static layout 10 margin-bottom and 120 height
        volumeBarRef.current.style.left = x - 10 + "px";
        volumeBarRef.current.style.visibility = "visible";
        oper.toggleProgressBar(false);
        document.addEventListener("mousemove", checkAndCloseVolumeBar);
      }
    },
    handleVolumeMouseDown: () => {
      if (video.current.volume === 0) {
        setVolume(() => lastVolume);
      } else {
        setVolume(() => 0);
      }
    },
    togglePlay: () => {
      if (play) {
        video.current.pause();
      } else {
        video.current.play();
        count = 0;
      }
    },
  };

  //

  return (
    <div
      className="videocontainer"
      style={{ width: props.width + "px", height: props.height + "px" }}
      ref={container}
    >
      <Video
        className="video"
        ref={video}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        onDurationChange={onDurationChange}
        togglePlay={oper.togglePlay}
      ></Video>
      {(showController || play === false) && (
        <>
          <VideoTopBar></VideoTopBar>
          {showTimeTag && (
            <TimeTag timeTagX={timeTagX} time={searchTime}>
              10:23
            </TimeTag>
          )}
          <VideoProgressBar
            setCurTimeByClick={setCurTimeByClick}
            setCurTimeByDrag={setCurTimeByDrag}
            videoWidth={props.width}
            curTime={currentTime}
            duration={duration}
            ref={progressBarRef}
            loadedDuration={loadedDuration}
            showVideoPositionTime={showVideoPositionTime}
            toggleTimeTag={toggleTimeTag}
          ></VideoProgressBar>

          <VideoControlBar
            videoWidth={props.width}
            oper={oper}
            volume={volume}
            playing={play}
            fullscreen={fullscreen}
            ref={speedButtonRef}
          ></VideoControlBar>
          <SpeedPanel
            ref={speedRef}
            speed={playRate}
            updateSpeed={oper.updateSpeed}
          ></SpeedPanel>
          <VolumeBar
            handleVolumeBarMouseDown={handleVolumeBarMouseDown}
            handleSetVolumeOnClick={handleSetVolumeWithPoint}
            ref={volumeBarRef}
            volume={volume}
            barHeight={volumeBarHeight}
            handlerRadius={volumeholderRadius}
          ></VolumeBar>
        </>
      )}
    </div>
  );
}

export default VideoContainer;
