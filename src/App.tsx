import { useState } from "react";
import "./App.css";
import Player from "./Player";
import song1 from "./songs/Millbrook - Overdrive (ft. Ellerslie) [NCS Release].mp3";
import song2 from "./songs/yanvince - fearless [NCS Release].mp3";
import song3 from "./songs/The Arc - Nothing at All [NCS Release].mp3";

const demoPlaylist = [
  {
    name: "Overdrive (ft. Elleslie)",
    artist: "Millbrook",
    file: song1,
    id: 1,
  },
  {
    name: "fearless",
    artist: "yanvice",
    file: song2,
    id: 2,
  },
  {
    name: "Nothing at All",
    artist: "The Arc",
    file: song3,
    id: 3,
  },
];

function App() {
  const [playerBig, setPlayerBig] = useState(false);
  const [like, setLike] = useState<number[]>([]);
  const [playerOpen, setPlayerOpen] = useState(false);
  // id of current song:
  const [current, setCurrentSong] = useState(1);
  // const [playing, setPlaying] = useState(false)
  const [music, setMusic] = useState({
    playing: false,
    time: 0,
  });
  function handlePlayPause(justPlay = false) {
    setMusic((prev) => {
      const clone = structuredClone(prev);
      if (justPlay == true) {
        clone.playing = false;
      } else {
        clone.playing = !prev.playing;
      }
      return clone;
    });
    music.playing ? selectedSong().play() : selectedSong().pause();
  }
  function selectedSong() {
    return document.getElementById("music") as HTMLAudioElement;
  }
  function updateTime() {
    let current = Math.round(selectedSong().currentTime);
    setMusic((prev) => {
      const clone = structuredClone(prev);
      clone.time = current;
      return clone;
    });
  }

  function handleClick() {
    setPlayerBig((prev) => !prev);
  }

  function playPrevious() {
    // if we are playing the first song, return false so we can handle it in the player
    if (current == 1) {
      return false;
    } else {
      setCurrentSong((prev) => prev - 1);
      return true;
    }
  }

  function playNext() {
    // if we are playing the last song, restart the playlist
    if (
      demoPlaylist.map((song) => song.id).indexOf(current) ==
      demoPlaylist.length - 1
    ) {
      setCurrentSong(1);
    } else {
      setCurrentSong((prev) => prev + 1);
    }
  }

  function handleClickOnList(e: React.MouseEvent<HTMLElement>) {
    if ((e.target as HTMLDivElement).className === "songlist") {
      setCurrentSong(Number.parseInt((e.target as HTMLDivElement).id));
      setPlayerOpen(true);
      setMusic((prev) => {
        const clone = structuredClone(prev);
        clone.playing = false;
        return clone;
      });
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
        {demoPlaylist.map((song) => {
          return (
            <div
              className={
                current == song.id && playerOpen
                  ? "songlist colored"
                  : "songlist"
              }
              id={song.id.toString()}
              key={song.id.toString()}
              onClick={(e) => handleClickOnList(e)}
            >
              {current == song.id && playerOpen && (
                <i className="fa-solid fa-play is-playing"></i>
              )}
              <p className="song-name">{song.name}</p>
              <p className="song-artist">{song.artist}</p>
              <i
                className={
                  !like.includes(song.id)
                    ? "fa-regular fa-heart like-button"
                    : "fa-solid fa-heart pulse like-button"
                }
                onClick={() =>
                  setLike((prev) => {
                    return like.includes(song.id)
                      ? prev
                          .slice(0, like.indexOf(song.id))
                          .concat(prev.slice(like.indexOf(song.id) + 1))
                      : prev.concat(song.id);
                  })
                }
              ></i>
            </div>
          );
        })}
      </div>
      {playerOpen && (
        <Player
          onClick={handleClick}
          size={playerBig}
          song={demoPlaylist.filter((s) => s.id == current)[0]}
          playPrevious={playPrevious}
          playNext={playNext}
          handlePlayPause={handlePlayPause}
          selectedSong={selectedSong}
          updateTime={updateTime}
          music={music}
        />
      )}
    </>
  );
}

export default App;
