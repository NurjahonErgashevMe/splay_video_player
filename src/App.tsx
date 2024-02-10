// import { useCallback, useEffect, useRef, useState } from "react";
// import "./App.scss";

import ReactNetflixPlayer from "./test/Test";

// import Video from "../public/videos/video.mp4";
// import {
//   IconPlayerPause,
//   IconPlayerPlayFilled,
//   IconVolume,
// } from "@tabler/icons-react";
// import clsx from "clsx";
// import { useFullscreen } from "./hooks/useFullScreen";
// import { useInterval } from "./hooks/useInterval";
// import { videoTime } from "./helpers/videoTime";

// import {
//   PanInfo,
//   motion,
// } from "framer-motion";

// function App() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const watchedLineRef = useRef<HTMLDivElement>(null);

//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const [volume, setVolume] = useState<number>(1);
//   const [currentVideoTime, setCurrentVideoTime] = useState<string>("");
//   const [playbackRate, setPlaybackRate] = useState<number>(1);
//   const { toggle, fullscreen } = useFullscreen();

//   const [playedPercentage, setPlayedPercentage] = useState<number>(0);

//   const interval = useInterval(() => {
//     if (isPlaying && videoRef?.current) {
//       return setCurrentVideoTime(() =>
//         videoTime(videoRef?.current?.currentTime ?? 0)
//       );
//     }
//   }, 1000 / playbackRate);

//   useEffect(() => {
//     const updateProgress = () => {
//       interval.start();
//       if (videoRef.current) {
//         const { currentTime, duration } = videoRef.current;
//         const percentage = (currentTime / duration) * 100;
//         setPlayedPercentage(percentage);
//       }
//     };

//     if (videoRef.current) {
//       videoRef.current.addEventListener("timeupdate", updateProgress);
//     }

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener("timeupdate", updateProgress);
//       }
//       interval.stop();
//     };
//   }, [interval]);

//   const togglePlay = useCallback(() => {
//     {
//       if (videoRef.current) {
//         if (videoRef.current.paused) {
//           videoRef.current.play();
//           setIsPlaying(true);
//         } else {
//           videoRef.current.pause();
//           setIsPlaying(false);
//         }
//       }
//     }
//   }, []);

//   const handlePlaybackRateChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const newPlaybackRate = parseFloat(event.target.value);
//       setPlaybackRate(() => newPlaybackRate);
//       if (videoRef.current) {
//         videoRef.current.playbackRate = newPlaybackRate;
//       }
//     },
//     []
//   );

//   const handleVolumeChange = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       setVolume(() => +event.target.value);
//       if (videoRef.current) {
//         videoRef.current.volume = +event.target.value;
//       }
//     },
//     []
//   );
//   const skipForward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime += 10; // Перемотка на +10 секунд
//     }
//     setCurrentVideoTime(() => videoTime(videoRef?.current?.currentTime ?? 0));
//   };

//   const skipBackward = () => {
//     if (videoRef.current) {
//       videoRef.current.currentTime -= 10; // Перемотка на -10 секунд
//     }
//     setCurrentVideoTime(() => videoTime(videoRef?.current?.currentTime ?? 0));
//   };

//   const handleSeek = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
//     if (videoRef.current && watchedLineRef.current) {
//       const rect = watchedLineRef?.current?.getBoundingClientRect();
//       const offsetX = e.clientX - rect.left;
//       const percentage = (offsetX / rect.width) * 100;
//       const currentTime = (percentage / 100) * videoRef.current.duration;
//       videoRef.current.currentTime = currentTime;
//     }
//   };

//   const handleDrag = (
//     event: MouseEvent | PointerEvent | TouchEvent,
//     info: PanInfo
//   ) => {
//     const newPosition = (info.delta.x / window.innerWidth) * 100;
//     setPlayedPercentage(info.delta.x);
//   };

//   return (
//     <div className="video">
//       <div
//         className={clsx(
//           "video-container",
//           fullscreen ? "video-container--fullscreen" : null
//         )}
//       >
//         <video
//           ref={videoRef}
//           className={"video"}
//           width={300}
//           height={300}
//           muted={false}
//         >
//           <source src={Video} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         <div className={"controls"}>
//           <div className={"bottom-content"}></div>
//           <button onClick={togglePlay}>
//             {isPlaying ? <IconPlayerPause /> : <IconPlayerPlayFilled />}
//           </button>
//           <label>
//             <IconVolume />
//             <input
//               type="range"
//               min="0"
//               max="1"
//               step="0.01"
//               value={volume}
//               onChange={handleVolumeChange}
//             />
//           </label>
//           <label>
//             <input
//               type="range"
//               min="0.25"
//               max="2"
//               step="0.25"
//               value={playbackRate}
//               onChange={handlePlaybackRateChange}
//             />
//             <span>{playbackRate}x</span>
//           </label>
//           <button onClick={skipBackward}>-10 sec</button>
//           <button onClick={skipForward}>+10 sec</button>
//           <button onClick={toggle}>
//             {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
//           </button>
//           <span>{currentVideoTime}</span>
//         </div>
//         <div
//           className={"progressBar"}
//           onClick={handleSeek}
//           ref={watchedLineRef}
//         >
//           <div style={{ width: `${playedPercentage}%` }} className={"played"}>
//             <motion.div
//               drag="x"
//               transition={{ delay: 1.5 }}
//               dragConstraints={watchedLineRef}
//               className="circle"
//               // dragListener={false}
//               dragElastic={0}
//               dragMomentum={false}
//               style={{ right: 0 }}
//               onDrag={handleDrag}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import Video from "../public/videos/video.mp4";

function App() {
  return (
    <ReactNetflixPlayer
      src={Video}
      playerLanguage="ru"
      backButton={() => console.log("back")}
      title="Уэнсдэй"
      subTitle="Уэнсдэей 1 сезон трейлер"
      dataNext={{
        title: "Черепашки ниндзя",
        description: "Ниндзя черепашки-это бла бла бла",
      }}
      dataPrev={{
        title: "Черепашки ниндзя",
        description: "Ниндзя черепашки-это бла бла бла",
      }}
      onNextClick={() => console.log("next")}
      onPrevClick={() => console.log("prev")}
    ></ReactNetflixPlayer>
  );
}

export default App;
