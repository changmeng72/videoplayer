import { forwardRef, useEffect, useState } from "react";

export function formatDuration(seconds = 0) {
  let total = Math.floor(seconds);
  if (seconds < 0) total = 0;
  let result = "";
  let h = Math.floor(total / 3600);
  let m = Math.floor((total % 3600) / 60);
  let s = total % 60;
  if (s < 10) result = ":0" + s;
  else result = ":" + s;
  if (m < 10) result = "0" + m + result;
  else result = m + result;
  if (h > 0) result = h + ":" + result;
  return result;
}

const VideoProgressBar = forwardRef((props, ref) => {
  const [durationString, setDurationString] = useState("00:00");
  const [searchTimePos, setSearchTimePos] = useState(0);

  const showTimeTag = () => {
    props.toggleTimeTag(true);
  };
  const hideTimeTag = () => {
    props.toggleTimeTag(false);
    setSearchTimePos(() => 0);
  };
  const showVideoPositionTime = (event) => {
    setSearchTimePos(() => event.clientX - 15); //here use fixed coord for test only,fix maybe
    props.toggleTimeTag(true);
    props.showVideoPositionTime(event);
  };
  useEffect(() => {
    setDurationString(formatDuration(props.duration));
  }, [props.duration]);

  return (
    <div className="videoprogressbar" ref={ref}>
      <div
        className="progressbarwrapper"
        style={{ width: Math.floor(props.videoWidth - 100) + "px" }} //fixed layout, fix maybe
        onClick={props.setCurTimeByClick}
        onMouseMove={showVideoPositionTime}
        onMouseEnter={showTimeTag}
        onMouseLeave={hideTimeTag}
      >
        <div className="progressbar" style={{ width: "100%" }}>
          <div
            className="loaded"
            style={{
              width:
                (props.loadedDuration * (props.videoWidth - 100)) /
                  props.duration +
                "px",
            }}
          ></div>
          <div
            className="searchTime"
            style={{
              width: searchTimePos + "px",
            }}
          ></div>

          <div
            className="curposition"
            style={{
              width:
                (props.curTime * (props.videoWidth - 100)) / props.duration +
                "px",
            }}
          ></div>

          <div
            className="processhandler"
            onMouseDown={props.setCurTimeByDrag}
            onDragStart={() => false}
            style={{
              left:
                (props.curTime * (props.videoWidth - 100)) / props.duration -
                8 +
                "px",
            }}
          ></div>
        </div>
      </div>
      <div className="videoduration">{durationString}</div>
    </div>
  );
});

export default VideoProgressBar;
