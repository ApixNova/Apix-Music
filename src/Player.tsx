import { useEffect, useState } from "react";
import "./Player.css";
import image from "./img/galaxy.jpg";

export default function Player({ onClick, size, song }: any) {
  const [music, setMusic] = useState({
    playing: true,
    time: 0,
  });

  function selectedSong() {
    return document.getElementById("music") as HTMLAudioElement;
  }

  function maxTime() {
    if (selectedSong() != null) {
      return Math.round(selectedSong().duration);
    }
    return 0;
  }

  function handlePlayPause() {
    setMusic((prev) => {
      const clone = structuredClone(prev);
      clone.playing = !prev.playing;
      return clone;
    });
    music.playing ? selectedSong().play() : selectedSong().pause();
    console.log(music.playing);
  }

  function updateTime() {
    let current = Math.round(selectedSong().currentTime);
    setMusic((prev) => {
      const clone = structuredClone(prev);
      clone.time = current;
      return clone;
    });
  }
  useEffect(() => {
    // console.log("use effect triggered");
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
    console.log(value);
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
    return minutes + ":" + displaySec(seconds);
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
            <h2 id="title">Overdrive (ft. Elleslie)</h2>
            <h3 id="artist">Millbrook</h3>
          </div>
        )}

        <div id="controls">
          <audio id="music" src={song} preload="metadata"></audio>
          {!size && <PlayButton />}
          <p>{convertTime(music.time)}</p>
          <input
            max={maxTime()}
            type="range"
            style={{ background: "inherit" }}
            value={music.time}
            onChange={(e) => handleChange(parseInt(e.target.value))}
          ></input>
          <p>{convertTime(maxTime())}</p>
        </div>
        {size && (
          <div id="full-player">
            <i
              onClick={() => handleChange(0)}
              className="fa-solid fa-backward-step"
            ></i>
            <div id="big-button">
              <PlayButton />
            </div>
            <i
              onClick={() => handleChange(maxTime())}
              className="fa-solid fa-forward-step"
            ></i>
          </div>
        )}
      </div>
    </>
  );
}
