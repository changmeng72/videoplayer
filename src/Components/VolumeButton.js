import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useRef } from "react";

export default function VolumeButton(props) {
  const ref = useRef(null);

  const handleMouseOver = (event) => {
    event.preventDefault();
    let rect = ref.current.getBoundingClientRect();
    props.handleVolumeMouseOver(rect.left + rect.width / 2, rect.top);
  };
  const handleMouseDown = (event) => {
    props.handleVolumeMouseDown();
  };

  return (
    <button
      className="btnvideo"
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseDown}
      ref={ref}
    >
      {props.volume === 0 ? (
        <VolumeOffIcon></VolumeOffIcon>
      ) : props.volume > 0.5 ? (
        <VolumeUpIcon></VolumeUpIcon>
      ) : (
        <VolumeDownIcon></VolumeDownIcon>
      )}
    </button>
  );
}
