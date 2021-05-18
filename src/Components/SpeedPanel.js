import { forwardRef, useEffect, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";

const SpeedPanel = forwardRef((props, ref) => {
  const [speed, setSpeed] = useState(props.speed); //current Speed
  const [currentSelected, setCurrentSelected] = useState(
    //current user selected
    parseInt(props.speed / 0.25 - 1)
  );

  useEffect(() => {
    setSpeed(() => props.speed);
  }, [props.speed]);

  const handleClick = (evt) => {
    const ele = evt.currentTarget;
    setCurrentSelected(() => ele.value);
  };

  const changeSpeed = () => {
    props.updateSpeed(currentSelected * 0.25 + 0.25);
    ref.current.style.visibility = "hidden";
  };

  const closeWithoutChange = () => {
    setCurrentSelected(() => parseInt(speed / 0.25 - 1));
    ref.current.style.visibility = "hidden";
  };

  return (
    <div className="speedPanel" ref={ref} style={{ visibility: "hidden" }}>
      <p className="title">Playback speed</p>
      <hr></hr>
      <ul className="speedList">
        {[
          "x 0.25",
          "x 0.5",
          "x 0.75",
          "Normal(x 1)",
          "x 1.25",
          "x 1.5",
          "x 1.75",
          "x 2.0",
        ].map((v, index) => (
          <li
            key={v}
            value={index}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <div className="speed">{v}</div>
            <div className="selected">
              {index === currentSelected && (
                <CheckIcon style={{ fontSize: "1.5rem" }}></CheckIcon>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className="speedPanelBtn speedPanelOKBtn" onClick={changeSpeed}>
        Confirm
      </button>
      <button
        className="speedPanelBtn speedPanelCancelBtn"
        onClick={closeWithoutChange}
      >
        Cancel
      </button>
    </div>
  );
});
export default SpeedPanel;
