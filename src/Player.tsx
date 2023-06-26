import { useEffect, useState } from "react";
import "./Player.css";

export default function Player({ onClick, size, song }: any) {
  const [music, setMusic] = useState({
    playing: true,
    time: 0,
  });

  function handlePlayPause() {
    setMusic((prev) => {
      const clone = structuredClone(prev);
      clone.playing = !prev.playing;
      return clone;
    });
    let selectedSong = document.getElementById("music") as HTMLAudioElement;
    music.playing ? selectedSong.play() : selectedSong.pause();
    console.log(music.playing);
  }

  function updateTime() {
    let selectedSong = document.getElementById("music") as HTMLAudioElement;
    let current = Math.round(selectedSong.currentTime);
    setMusic((prev) => {
      const clone = structuredClone(prev);
      clone.time = current;
      return clone;
    });
  }
  useEffect(() => {
    console.log("use effect triggered");
    let selectedSong = document.getElementById("music") as HTMLAudioElement;
    let current = Math.round(selectedSong.currentTime);

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
    let selectedSong = document.getElementById("music") as HTMLAudioElement;
    selectedSong.currentTime = value;
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
        <audio id="music" src={song}></audio>
        <div onClick={() => handlePlayPause()}>
          {music.playing ? (
            <i className="fa-solid fa-play"></i>
          ) : (
            <i className="fa-solid fa-pause"></i>
          )}
        </div>
        <input
          type="range"
          style={{ background: "inherit" }}
          value={music.time}
          onChange={(e) => handleChange(parseInt(e.target.value))}
        ></input>
        <p>{convertTime(music.time)}</p>
      </div>
    </>
  );
}
