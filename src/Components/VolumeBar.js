import { forwardRef, useEffect, useRef, useState } from "react";

const VolumeBar = forwardRef((props, ref) => {
  const refProbar = useRef();
  const refProhld = useRef();

  const [curPos, setCurPos] = useState(0);

  useEffect(() => {
    if (props.volume >= 0 && props.volume <= 1)
      setCurPos(props.volume * props.barHeight);
  }, [props.volume, props.barHeight]);

  const handleVolumeBarMouseDown = (event) => {
    let rect = refProhld.current.getBoundingClientRect();
    let offset = rect.bottom - event.clientY - props.handlerRadius;
    props.handleVolumeBarMouseDown(offset);
  };

  return (
    <div
      className="volumecolumn"
      style={{ top: props.y, left: props.x }}
      ref={ref}
      onDragStart={() => false}
    >
      <div
        className="progressbar"
        ref={refProbar}
        style={{ height: props.barHeight + "px", position: "relative" }}
        onClick={props.handleSetVolumeOnClick}
      >
        <div
          className="curpositionV"
          style={{
            top: props.barHeight - curPos + "px",
            height: curPos + "px",
          }}
        ></div>
        <div
          className="processhandlerV"
          ref={refProhld}
          onMouseDown={handleVolumeBarMouseDown}
          onDragStart={() => false}
          style={{ bottom: curPos - props.handlerRadius + "px" }}
        ></div>
      </div>
    </div>
  );
});

export default VolumeBar;
