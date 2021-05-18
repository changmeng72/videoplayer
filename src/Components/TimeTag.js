import { forwardRef, useEffect, useState } from "react";
import { formatDuration } from "./VideoProgressBar";

const TimeTag = forwardRef((props, ref) => {
  const [formatTime, setformatTime] = useState(0);
  useEffect(() => {
    setformatTime(formatDuration(props.time));
  }, [props.time]);

  return (
    <div className="timetag" style={{ left: props.timeTagX + "px" }}>
      {formatTime}
    </div>
  );
});
export default TimeTag;
