import "./App.css";
import { useEffect, useState } from "react";
import VideoContainer from "./Components/VideoContainer";

function App() {
  const [videoWidth, setVideoWidth] = useState(
    document.documentElement.clientWidth
  );
  const [videoHeight, setVideoHeight] = useState(
    document.documentElement.clientHeight
  );

  useEffect(() => {
    function onResize() {
      setVideoWidth(document.documentElement.clientWidth);
      setVideoHeight(document.documentElement.clientHeight);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="App">
      <VideoContainer width={videoWidth} height={videoHeight}></VideoContainer>
    </div>
  );
}

export default App;
