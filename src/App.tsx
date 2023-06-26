import { useState } from "react";
import "./App.css";
import Player from "./Player";
import badMemories from "./songs/bad-memories.mp3";

const SongList = [
  {
    name: "Faded",
    artist: "Alan Walker",
  },
  {
    name: "Song2",
    artist: "Yea I'm original hehe",
  },
];

function App() {
  const [playerBig, setPlayerBig] = useState(false);

  function handleClick() {
    setPlayerBig((prev) => !prev);
  }

  return (
    <>
      <div id="navbar">
        <p>just vibe</p>
        <i className="fa-solid fa-music"></i>
      </div>
      {/* Song list :  */}
      <div className="songlist" id="first">
        <p>{SongList[0].name}</p>
        <p>{SongList[0].artist}</p>
      </div>
      {SongList.map((song) => (
        <div className="songlist">
          <p>{song.name}</p>
          <p>{song.artist}</p>
        </div>
      ))}
      <Player onClick={handleClick} size={playerBig} song={badMemories} />
    </>
  );
}

export default App;
