import { useState } from "react";
import "./App.css";
import Player from "./Player";
import currentSong from "./songs/Millbrook - Overdrive (ft. Ellerslie) [NCS Release].mp3";

const Song = {
  name: "Overdrive (ft. Elleslie)",
  artist: "Millbrook",
};
function App() {
  const [playerBig, setPlayerBig] = useState(false);

  function handleClick() {
    setPlayerBig((prev) => !prev);
  }

  return (
    <>
      <div id="navbar">
        <p>apix music</p>
        <i className="fa-solid fa-music"></i>
      </div>
      <div className="songlist" id="first">
        <p>{Song.name}</p>
        <p>{Song.artist}</p>
        <i className="fa-regular fa-heart"></i>
        <i className="fa-solid fa-heart"></i>
      </div>
      <Player onClick={handleClick} size={playerBig} song={currentSong} />
    </>
  );
}

export default App;
