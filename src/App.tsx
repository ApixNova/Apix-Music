import { useState } from "react";
import "./App.css";
import Player from "./Player";
import currentSong from "./songs/Millbrook - Overdrive (ft. Ellerslie) [NCS Release].mp3";


const demoPlaylist = [
  {
    name: "Overdrive (ft. Elleslie)",
    artist: "Millbrook",
    file: currentSong,
    id: 1
  },
  {
    name: "Overdrive (ft. Elleslie)",
    artist: "Millbrook",  
    file: currentSong,
    id: 2
  }
]
function App() {
  const [playerBig, setPlayerBig] = useState(false);
  const [like, setLike] = useState<number[]>([]);
  const [playerOpen, setPlayerOpen] = useState(false);

  function handleClick() {
    setPlayerBig((prev) => !prev);
  }

  function handleClickOnList(e: React.MouseEvent<HTMLElement>) {
    if ((e.target as HTMLDivElement).className === "songlist") {
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
      <div id="playlist">
      {demoPlaylist.map(song => {
        return (
          <div
        className="songlist"
        onClick={(e) => handleClickOnList(e)}
      >
        <p>{song.name}</p>
        <p>{song.artist}</p>
        <i
          onClick={() => setLike(prev => {
            return like.includes(song.id) ?
            prev.slice(0, like.indexOf(song.id)).concat(prev.slice(like.indexOf(song.id)+1)) 
            : prev.concat(song.id)
          })}
          className={!like.includes(song.id) ? "fa-regular fa-heart like-button" : "fa-solid fa-heart pulse like-button"}
        ></i>
      </div>
        )
      })
      }
      </div>
      {playerOpen && (
        <Player onClick={handleClick} size={playerBig} song={currentSong} />
      )}
    </>
  );
}

export default App;
