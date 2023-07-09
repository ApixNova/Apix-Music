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
  const [like, setLike] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);

  function handleClick() {
    setPlayerBig((prev) => !prev);
  }

  function handleClickOnList(e: React.MouseEvent<HTMLElement>) {
    if ((e.target as HTMLDivElement).id === "first") {
      setPlayerOpen(true);
      return handleClick();
    }
  }

  return (
    <>
      <div id="navbar">
        <p>apix music</p>
        <i className="fa-solid fa-music"></i>
      </div>
      <div
        className="songlist"
        id="first"
        onClick={(e) => handleClickOnList(e)}
      >
        <p>{Song.name}</p>
        <p>{Song.artist}</p>
        <i
          id="like-button"
          onClick={() => setLike((prev) => !prev)}
          className={!like ? "fa-regular fa-heart" : "fa-solid fa-heart pulse"}
        ></i>
      </div>
      {playerOpen && (
        <Player onClick={handleClick} size={playerBig} song={currentSong} />
      )}
    </>
  );
}

export default App;
