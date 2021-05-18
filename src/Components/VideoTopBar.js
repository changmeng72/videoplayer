import "./video.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function VideoTopBar() {
  return (
    <div className="videotopbar">
      <button className="btnvideo">
        <ArrowBackIcon />
      </button>
      <span style={{ marginLeft: 10 }}>Back to Browse</span>
    </div>
  );
}

export default VideoTopBar;
