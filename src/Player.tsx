import { useEffect } from "react";
import "./Player.css";
import image from "./img/galaxy.jpg";

export default function Player({
  onClick,
  size,
  song,
  playPrevious,
  playNext,
  handlePlayPause,
  selectedSong,
  updateTime,
  music,
}: any) {
  function maxTime() {
    if (selectedSong() != null) {
      return Number.isNaN(selectedSong().duration)
        ? 0
        : Math.round(selectedSong().duration);
    }
    return 0;
  }

  useEffect(() => {
    // console.log("use effect triggered");
    if (selectedSong().currentTime == selectedSong().duration) {
      playNext();
    }
    let current = Math.round(selectedSong().currentTime);

    // Since setInterval starts after 1 sec, handle the value 'time' instantly:

    if (current != music.time) {
      updateTime();
    }

    if (!music.playing) {
      let interval = setInterval(() => updateTime(), 1000);
      return () => clearInterval(interval);
    }
  });

  function handleChange(value: number) {
    selectedSong().currentTime = value;
    updateTime();
  }

  function convertTime(time: number) {
    function displaySec(sec: number) {
      if (sec < 10) {
        return "0" + sec;
      } else if (sec < 60) {
        return sec;
      }
    }
    let seconds = time % 60;
    let minutes = (time - seconds) / 60;
    return Number.isNaN(time) ? "0:00" : minutes + ":" + displaySec(seconds);
  }

  function PlayButton() {
    return (
      <div onClick={() => handlePlayPause()}>
        {music.playing ? (
          <i className="fa-solid fa-play"></i>
        ) : (
          <i className="fa-solid fa-pause"></i>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        id="player"
        className={size ? "big" : "small"}
        onClick={(e) => {
          if ((e.target as HTMLDivElement).id === "player") {
            onClick();
          }
        }}
      >
        {size && <img draggable="false" src={image}></img>}

        {size && (
          <div>
            <h2 id="title">{song.name}</h2>
            <h3 id="artist">{song.artist}</h3>
          </div>
        )}

        <div id="controls">
          <audio id="music" src={song.file} preload="metadata" autoPlay></audio>
          {!size && <PlayButton />}
          <p>{convertTime(music.time)}</p>
          <input
            max={maxTime()}
            type="range"
            style={{ background: "inherit" }}
            value={music.time}
            onChange={(e) => handleChange(parseInt(e.target.value))}
          ></input>
          <p id={!size ? "max-time" : "max"}>{convertTime(maxTime())}</p>
        </div>
        {size && (
          <div id="full-player">
            <i
              id="playPrevious"
              onClick={() => {
                if (music.time >= 3) {
                  handleChange(0);
                } else {
                  if (!playPrevious()) {
                    handleChange(0);
                  }
                }
              }}
              className="fa-solid fa-backward-step"
            ></i>
            <div id="big-button">
              <PlayButton />
            </div>
            <i
              id="playNext"
              onClick={() => {
                playNext();
                handlePlayPause(true);
              }}
              className="fa-solid fa-forward-step"
            ></i>
          </div>
        )}
      </div>
    </>
  );
}
