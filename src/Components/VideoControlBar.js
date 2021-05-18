import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Replay10Icon from "@material-ui/icons/Replay10";
import Forward10Icon from "@material-ui/icons/Forward10";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SpeedIcon from "@material-ui/icons/Speed";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import FullscreenOutlinedIcon from "@material-ui/icons/FullscreenOutlined";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import PauseIcon from "@material-ui/icons/Pause";

import { forwardRef } from "react";
import VolumeButton from "./VolumeButton";

const VideoControlBar = forwardRef((props, ref) => {
  return (
    <div className="videocontrolbar">
      {props.playing === false ? (
        <button onClick={props.oper.play} className="btnvideo btnInPause">
          <PlayArrowIcon></PlayArrowIcon>
        </button>
      ) : (
        <button onClick={props.oper.pause} className="btnvideo">
          <PauseIcon></PauseIcon>
        </button>
      )}

      <button
        onClick={props.oper.rewind}
        className={props.playing === false ? "btnvideo btnInPause" : "btnvideo"}
      >
        <Replay10Icon></Replay10Icon>
      </button>

      <button
        onClick={props.oper.skip}
        className={props.playing === false ? "btnvideo btnInPause" : "btnvideo"}
      >
        <Forward10Icon></Forward10Icon>
      </button>

      <VolumeButton
        handleVolumeMouseDown={props.oper.handleVolumeMouseDown}
        handleVolumeMouseOver={props.oper.handleVolumeMouseOver}
        volume={props.volume}
      ></VolumeButton>
      {props.videoWidth > 465 && (
        <div className="videoname">
          <p>
            The Office(U.S.)
            <span className="episode">S1:E1 ...</span>
          </p>
        </div>
      )}
      <button className="btnvideo">
        <HelpOutlineIcon></HelpOutlineIcon>
      </button>

      <button className="btnvideo">
        <SkipNextIcon></SkipNextIcon>
      </button>

      <button className="btnvideo">
        <LibraryBooksIcon></LibraryBooksIcon>
      </button>

      <button className="btnvideo">
        <InsertCommentOutlinedIcon></InsertCommentOutlinedIcon>
      </button>

      <button className="btnvideo" onClick={props.oper.toggleSpeed} ref={ref}>
        <SpeedIcon></SpeedIcon>
      </button>

      {props.fullscreen ? (
        <button
          onClick={props.oper.exitFullScreen}
          className={
            props.playing === false ? "btnvideo btnInPause" : "btnvideo"
          }
        >
          <FullscreenExitIcon></FullscreenExitIcon>
        </button>
      ) : (
        <button
          onClick={props.oper.fullscreen}
          className={
            props.playing === false ? "btnvideo btnInPause" : "btnvideo"
          }
          style={{ marginRight: 21 }}
        >
          <FullscreenOutlinedIcon></FullscreenOutlinedIcon>
        </button>
      )}
    </div>
  );
});

export default VideoControlBar;
