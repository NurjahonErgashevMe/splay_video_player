/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, SyntheticEvent } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import {
  FaVolumeDown,
  FaVolumeOff,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

import Prev10Icon from "public/icons/rotate-left_10.svg";
import Next10Icon from "public/icons/rotate-right_10.svg";
import PlayListIcon from "public/icons/playlist.svg";
import SettingsIcon from "public/icons/settings.svg";
import VolumeIcon from "public/icons/volume.svg";
import SkipIcon from "public/icons/skip.svg";
import BackIcon from "public/icons/back.svg";
import ArrowLeftIcon from "public/icons/arrow-left.svg";
// import MessageIcon from "public/icons/message.svg";
// import FullScreenIcon from "public/icons/fullscreen.svg";
// import SelfSizeIcon from "public/icons/resume.svg";
import ResumeIcon from "public/icons/resume.svg";
import PlayIcon from "public/icons/play.svg";
import CheckIcon from "public/icons/check.svg";

import SVG from "react-inlinesvg";
import {
  Loading,
  StandyByInfo,
  VideoPreLoading,
  Container,
  Controlls,
  VolumeControll,
  ItemPlaybackRate,
  IconPlayBackRate,
  ItemNext,
  ItemListReproduction,
  ItemListQuality,
  IconOnPress,
  Wrapper,
} from "./styles";
import translations from "../../public/locales";

import { useFullscreen } from "../hooks/useFullScreen";
import { useMergedRef } from "../hooks/useMergedRef";
import { useHotkeys } from "../hooks/useHotKeys/useHotKeys";
import PlayPauseAnimateButton, {
  YSPlayPauseButton,
} from "@/components/PlayPauseAnimateButton/PlayPauseAnimateButton";
import { Transition } from "@/components/Transition";
import { useDelayedHover } from "@/hooks/useDelayHover";

i18n.use(initReactI18next).init({
  resources: translations,
  lng: "pt",
  fallbackLng: "pt",

  interpolation: {
    escapeValue: false,
  },
});

export enum LanguagesPlayer {
  ru = "ru",
  en = "en",
}

export interface IDataNext {
  title: string;
  description?: string;
}

export interface IQualities {
  prefix: string;
  nome: string;
  playing: boolean;
  id: string | number;
}

export interface IItemReproduction {
  percent?: number;
  id: number | string;
  playing: boolean;
  name: string;
  /**
   * @deprecated
   */
  nome?: string;
}

export interface IProps {
  title?: string | boolean;
  subTitle?: string | boolean;
  titleMedia?: string | boolean;
  extraInfoMedia?: string | boolean;
  playerLanguage?: keyof typeof LanguagesPlayer;
  fullPlayer?: boolean;
  backButton?: () => void;
  src: string;
  autoPlay?: boolean;
  onCanPlay?: () => void;
  onTimeUpdate?: (e: SyntheticEvent<HTMLVideoElement, Event>) => void;
  onEnded?: () => void;
  onErrorVideo?: () => void;
  onNextClick?: () => void;
  onPrevClick?: () => void;
  onClickItemListReproduction?: (id: string | number, playing: boolean) => void;
  onCrossClick?: () => void;
  primaryColor?: string;
  secundaryColor?: string;
  startPosition?: number;
  playbackRateEnable?: boolean;
  fontFamily?: string;
  playbackRateStart?: number;
  playbackRateOptions?: string[];
  autoControllCloseEnabled?: boolean;
  overlayEnabled?: boolean;
  dataNext?: IDataNext;
  dataPrev?: IDataNext;
  reprodutionList?: IItemReproduction[];
  qualities?: IQualities[];
  onChangeQuality?: (quality: string | number) => void;
}

export default function ReactNetflixPlayer({
  title = false,
  subTitle = false,
  titleMedia = false,
  extraInfoMedia = false,
  playerLanguage = LanguagesPlayer.ru,

  fullPlayer = false,
  backButton = undefined,

  src,
  autoPlay = false,

  onCanPlay = undefined,
  onTimeUpdate = undefined,
  onEnded = undefined,
  onErrorVideo = undefined,
  onNextClick = undefined,
  onPrevClick = undefined,
  onClickItemListReproduction = undefined,
  onCrossClick = () => {},
  startPosition = 0,

  dataNext = {} as IDataNext,
  dataPrev = {} as IDataNext,
  reprodutionList = [],
  qualities = [],
  onChangeQuality = [] as any,
  playbackRateEnable = true,
  overlayEnabled = true,
  autoControllCloseEnabled = true,

  // Styles
  primaryColor = "#ff4b00",
  secundaryColor = "#ffffff",
  fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",

  playbackRateOptions = ["0.25", "0.5", "0.75", "1", "1.25", "1.5", "2"],
  playbackRateStart = 1,
}: // subtitleMedia,
IProps) {
  // References
  const videoComponent = useRef<null | HTMLVideoElement>(null);
  const timerRef = useRef<null | any>(null);
  const timerBuffer = useRef<null | any>(null);
  const playerElement = useRef<null | HTMLDivElement>(null);
  const listReproduction = useRef<null | HTMLDivElement>(null);
  const PlayPauseButtonRef = useRef<YSPlayPauseButton>(null);
  // Estados
  const {
    toggle: fullScreenToggle,
    fullscreen: fullScreen,
    ref: fullScreenRef,
  } = useFullscreen();
  const [videoReady, setVideoReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [end, setEnd] = useState(false);
  const [controlBackEnd, setControlBackEnd] = useState(false);

  const [volume, setVolume] = useState(100);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<any>(false);
  const [waitingBuffer, setWaitingBuffer] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<string | number>(
    playbackRateStart
  );
  // const [choseBuffer, setChoseBuffer] = useState<number>(0);
  const [started, setStarted] = useState(false);
  const [isPip, setIsPip] = useState(false);
  const [showControlVolume, setShowControlVolume] = useState(false);
  const [showQuality, setShowQuality] = useState(false);
  const [showDataNext, setShowDataNext] = useState(false);
  const [showDataPrev, setShowDataPrev] = useState(false);
  const [showPlaybackRate, setShowPlaybackRate] = useState(false);
  const [showReproductionList, setShowReproductionList] = useState(false);
  const [keyPressIcon, setKeyPressIcon] = useState<null | string>(null);

  // i18n hook
  const { t } = useTranslation();

  // other hooks
  const { openDropdown: spaceHotKeyOpen, closeDropdown: spaceHotKeyClose } =
    useDelayedHover({
      open: () => {
        stopVideo();
        setKeyPressIcon(() => (playing ? ResumeIcon : PlayIcon));
      },
      close: () => setKeyPressIcon(() => null),
      openDelay: 0,
      closeDelay: 1000,
    });
  const {
    openDropdown: ArrowLeftHotKeyOpen,
    closeDropdown: ArrowLeftHotKeyClose,
  } = useDelayedHover({
    open: () => {
      previousSeconds(10);
      setKeyPressIcon(() => Prev10Icon);
    },
    close: () => setKeyPressIcon(() => null),
    openDelay: 0,
    closeDelay: 1000,
  });
  const {
    openDropdown: ArrowRightHotKeyOpen,
    closeDropdown: ArrowRightHotKeyClose,
  } = useDelayedHover({
    open: () => {
      nextSeconds(10);
      setKeyPressIcon(() => Next10Icon);
    },
    close: () => setKeyPressIcon(() => null),
    openDelay: 0,
    closeDelay: 1000,
  });

  const mergedPlayerRef = useMergedRef(playerElement, fullScreenRef);
  useHotkeys([
    [
      "Space",
      () => {
        spaceHotKeyOpen();
        spaceHotKeyClose();
      },
    ],
    [
      "ArrowLeft",
      () => {
        ArrowLeftHotKeyOpen();
        ArrowLeftHotKeyClose();
      },
    ],
    [
      "ArrowRight",
      () => {
        ArrowRightHotKeyOpen();
        ArrowRightHotKeyClose();
      },
    ],
  ]);

  // const [, setActualBuffer] = useState({
  //   index: 0,
  //   start: 0,
  //   end: 0,
  //   endBuffer: 0,
  // });

  const secondsToHms = (d: number) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    let seconds = s.toString();

    if (s < 10) {
      seconds = `0${s}`;
    }

    if (h) {
      return `${h}:${m}:${seconds}`;
    }

    return `${m}:${seconds}`;
  };

  const timeUpdate = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    setShowInfo(false);
    setEnd(false);

    if (waitingBuffer) {
      setWaitingBuffer(false);
    }

    if (timerBuffer.current) {
      clearTimeout(timerBuffer.current);
    }

    timerBuffer.current = setTimeout(() => setWaitingBuffer(true), 1000);

    if (onTimeUpdate) {
      onTimeUpdate(e);
    }

    const target = e.target as HTMLVideoElement;

    const lenghtBuffer = target.buffered.length;
    let start = 0;
    let endBuffer = 0;
    const atualTime = target.currentTime;

    for (let i = 1; i <= lenghtBuffer; i++) {
      const startCheck = target.buffered.start(i - 1);
      const endCheck = target.buffered.end(i - 1);

      if (endCheck > atualTime && atualTime > startCheck) {
        // setChoseBuffer(i);

        if (endCheck > endBuffer) {
          endBuffer = endCheck;
        }

        if (startCheck < start) {
          start = startCheck;
        }
      }
    }

    // setActualBuffer({
    //   index: choseBuffer,
    //   start,
    //   endBuffer,
    // });

    setProgress(target.currentTime);
  };

  const goToPosition = (position: number) => {
    setProgress(() => position);
    if (videoComponent.current) {
      videoComponent.current.currentTime = position;
    }
  };

  // const play = () => {
  //   if (videoComponent.current) {
  //     if (videoComponent.current.paused) {
  //       videoComponent.current.play();
  //       console.log(`play : `, playing);
  //       setPlaying(true);
  //       return;
  //     }

  //     console.log(`pause : `, playing);
  //     setPlaying(false);
  //     videoComponent.current.pause();
  //     return;
  //   }
  // };

  const onEndedFunction = () => {
    if (videoComponent.current) {
      if (
        +startPosition === +videoComponent.current.duration &&
        !controlBackEnd
      ) {
        setControlBackEnd(true);
        videoComponent.current.currentTime =
          videoComponent.current.duration - 30;
        if (autoPlay) {
          setPlaying(true);
          videoComponent.current.play();
        } else {
          setPlaying(false);
        }
      } else {
        setEnd(true);
        setPlaying(false);

        if (onEnded) {
          onEnded();
        }
      }
    }
  };

  function nextSeconds(seconds: number) {
    if (videoComponent.current) {
      const current = videoComponent.current.currentTime;
      const total = videoComponent.current.duration;

      if (current + seconds >= total - 2) {
        videoComponent.current.currentTime =
          videoComponent.current.duration - 1;
        setProgress(videoComponent.current.duration - 1);
        return;
      }

      setProgress(() => current + seconds);
      videoComponent.current.currentTime += seconds;
    }
  }

  function previousSeconds(seconds: number) {
    if (videoComponent.current) {
      const current = videoComponent.current.currentTime;

      if (current - seconds <= 0) {
        videoComponent.current.currentTime = 0;
        setProgress(0);
        return;
      }
      setProgress(() => current - seconds);

      videoComponent.current.currentTime -= seconds;
    }
  }

  const startVideo = () => {
    if (videoComponent.current) {
      try {
        setDuration(videoComponent.current.duration);
        setVideoReady(true);

        if (!started) {
          setStarted(true);
          setPlaying(false);

          if (autoPlay) {
            videoComponent.current.play();
            setPlaying(!videoComponent.current.paused);
          }
        }

        if (onCanPlay) {
          onCanPlay();
        }
      } catch (err) {
        setPlaying(false);
      }
    }
  };

  const erroVideo = () => {
    if (onErrorVideo) {
      onErrorVideo();
    }
    setError(t("playError", { lng: playerLanguage }));
  };

  const setMuttedAction = (value: boolean) => {
    if (videoComponent.current) {
      setMuted(value);
      setShowControlVolume(false);
      videoComponent.current.muted = value;
    }
  };

  const setVolumeAction = (value: number) => {
    if (videoComponent.current) {
      setVolume(value);
      videoComponent.current.volume = value / 100;
    }
  };

  const chooseFullScreen = () => {
    if (playerElement.current) {
      fullScreenToggle();
      if (fullScreen) {
        setShowInfo(() => true);
      }
    }
  };

  const controllScreenTimeOut = () => {
    if (!autoControllCloseEnabled) {
      setShowInfo(true);
      return;
    }

    setShowControls(false);
    if (!playing) {
      setShowInfo(true);
    }
  };

  const hoverScreen = () => {
    setShowControls(true);
    setShowInfo(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(controllScreenTimeOut, 5000);
  };

  function stopVideo() {
    hoverScreen();
    if (videoComponent.current) {
      if (videoComponent.current.paused) {
        videoComponent.current.play();
        setPlaying(() => true);
        return;
      }
      videoComponent.current.pause();
      setPlaying(() => false);
    }
  }

  const scrollToSelected = () => {
    const element = listReproduction.current;
    if (element) {
      const selected = element.getElementsByClassName(
        "selected"
      )[0] as HTMLElement;
      const position = selected?.offsetTop;
      const height = selected?.offsetHeight;
      element.scrollTop = position - height * 2;
    }
  };

  const onChangePlayBackRate = (value: string | number) => {
    if (videoComponent.current) {
      const speed = value === "Normal" ? 1 : +value;
      videoComponent.current.playbackRate = speed;
      setPlaybackRate(speed);
    }
  };

  useEffect(() => {
    if (showReproductionList) {
      scrollToSelected();
    }
  }, [showReproductionList]);

  useEffect(() => {
    const videoElement = videoComponent?.current;

    const handleEnterPip = () => {
      setPlaying(() => true);
      setIsPip(true);
    };

    const handleLeavePip = () => {
      setPlaying(() => false);
      setIsPip(false);
    };

    videoElement?.addEventListener("enterpictureinpicture", handleEnterPip);
    videoElement?.addEventListener("leavepictureinpicture", handleLeavePip);

    return () => {
      videoElement?.removeEventListener(
        "enterpictureinpicture",
        handleEnterPip
      );
      videoElement?.removeEventListener(
        "leavepictureinpicture",
        handleLeavePip
      );
    };
  }, []);

  useEffect(() => {
    if (src && videoComponent.current) {
      videoComponent.current.currentTime = startPosition;
      setProgress(0);
      setDuration(0);
      setVideoReady(false);
      setError(false);
      setShowReproductionList(false);
      setShowDataNext(false);
      setShowDataPrev(false);
      // setActualBuffer({
      //   index: 0,
      //   start: 0,
      //   end: 0,
      //   endBuffer: 0,
      // });
      setPlaying(autoPlay);
    }
  }, [src]);

  function renderLoading() {
    return (
      <Loading color={primaryColor}>
        <div>
          <div />
          <div />
          <div />
        </div>
      </Loading>
    );
  }

  function renderInfoVideo() {
    return (
      <StandyByInfo
        primaryColor={primaryColor}
        secundaryColor={secundaryColor}
        show={
          (showInfo === true && videoReady === true && playing === false) ||
          isPip
        }
      >
        {(title || subTitle) && (
          <section className="center">
            <h3 className="text">
              {t("youAreWatching", { lng: playerLanguage })}
            </h3>
            <h1 className="title">{title}</h1>
            <h2 className="sub-title">{subTitle}</h2>
          </section>
        )}
        <footer>{t("paused", { lng: playerLanguage })}</footer>
      </StandyByInfo>
    );
  }

  function renderCloseVideo() {
    return (
      <VideoPreLoading
        backgroundColorHoverButtonError="#f78b28"
        colorHoverButtonError="#ddd"
        colorButtonError="#ddd"
        backgroundColorButtonError="#333"
        colorTitle="#fff"
        colorSubTitle="#fff"
        colorIcon="#fff"
        show={videoReady === false || (videoReady === true && error)}
        showError={!!error}
      >
        {(title || subTitle) && (
          <header>
            <div>
              <h1>{title}</h1>
              <h2>{subTitle}</h2>
            </div>
            <FiX onClick={onCrossClick} color={primaryColor} />
          </header>
        )}

        <section>
          {error && (
            <div>
              <h1>{error}</h1>
              {qualities.length > 1 && (
                <div>
                  <p>
                    {t("tryAccessingOtherQuality", { lng: playerLanguage })}
                  </p>
                  <div className="links-error">
                    {qualities.map((item) => (
                      <div
                        onClick={() => {
                          setShowQuality(false);
                          onChangeQuality(item.id);
                        }}
                        key={item.id}
                        className="item-quality"
                      >
                        <span className="check">
                          {item.playing ? (
                            <SVG src={CheckIcon} width={35} height={30}></SVG>
                          ) : null}
                        </span>
                        <span className="title">{item.nome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </VideoPreLoading>
    );
  }
  // function RenderIconOnPress(props?: { Icon?: any }) {
  //   return (
  //     <Transition
  //       mounted={!!props?.Icon}
  //       keepMounted={false}
  //       duration={50}
  //       exitDuration={250}
  //       transition={"fade"}
  //     >
  //       {(styles) => <IconOnPress style={styles}> {props?.Icon}</IconOnPress>}
  //     </Transition>
  //   );
  // }

  const handleTogglePip = async () => {
    try {
      if (videoComponent.current) {
        if (document.pictureInPictureElement) {
          setPlaying(() => true);
          setIsPip(() => false);
          await document.exitPictureInPicture();
        } else {
          setPlaying(() => false);
          setIsPip(() => true);
          await videoComponent.current.requestPictureInPicture();
        }
      }
    } catch (error) {
      setPlaying(() => true);
      setIsPip(() => false);
      console.error(
        "Ошибка включения/отключения режима Picture-in-Picture:",
        error
      );
    }
  };
  return (
    <Wrapper
      onMouseMove={hoverScreen}
      ref={mergedPlayerRef}
      onDoubleClick={chooseFullScreen}
      fullPlayer={fullPlayer}
      hideVideo={!!error}
      fontFamily={fontFamily}
      pip={isPip}
    >
      {(videoReady === false || (waitingBuffer === true && playing === true)) &&
        !error &&
        !end &&
        renderLoading()}

      {(!!overlayEnabled || isPip) && renderInfoVideo()}

      {renderCloseVideo()}
      {/* <RenderIconOnPress Icon={keyPressIcon} /> */}
      <IconOnPress>
        <Transition
          mounted={!!keyPressIcon}
          keepMounted={false}
          duration={100}
          exitDuration={100}
          transition={"fade"}
        >
          {(styles) => (
            <div className="icon-on_press_wrapper" style={styles}>
              <SVG
                src={keyPressIcon ?? ""}
                color="#fff"
                width={40}
                height={40}
              />
            </div>
          )}
        </Transition>
      </IconOnPress>
      <video
        ref={videoComponent}
        controls={false}
        onCanPlay={() => startVideo()}
        onTimeUpdate={timeUpdate}
        onError={erroVideo}
        onEnded={onEndedFunction}
        muted={muted}
        src={src}
      ></video>
      {/* <track
        label="English"
        kind="subtitles"
        srcLang="en"
        src={subtitleMedia}
        default
      /> */}

      <Controlls
        show={
          !isPip ||
          (showControls === true && videoReady === true && error === false)
        }
        primaryColor={primaryColor}
        progressVideo={(progress * 100) / duration}
        pip={isPip}
      >
        {backButton && (
          <div className="back">
            <div
              onClick={() => {
                handleTogglePip();
                backButton();
              }}
              style={{ cursor: "pointer" }}
            >
              <SVG src={ArrowLeftIcon} width={38} height={38} fill={"#fff"} />
              <span className="back__text">
                <h3>{dataPrev?.title}</h3>
                <p>{dataPrev?.description}</p>
              </span>
            </div>
          </div>
        )}

        {showControlVolume !== true &&
          showQuality !== true &&
          !showDataNext &&
          !showReproductionList && (
            <div className="line-reproduction">
              <input
                type="range"
                value={progress}
                className="progress-bar"
                max={duration}
                onChange={(e) => goToPosition(+e.target.value)}
                title=""
                style={
                  {
                    // background: `linear-gradient(93deg, rgba(247,139,40,1) ${
                    //   (progress * 100) / duration
                    // }%, blue ${
                    //   (progress * 100) / duration
                    // }%, blue ${
                    //   (atualBuffer.end * 100) / duration
                    // }%, red ${
                    //   (atualBuffer.end * 100) / duration
                    // }%)`,
                  }
                }
              />
            </div>
          )}

        {videoReady === true && (
          <div className="controlls">
            <div className="start">
              <div className="item-control">
                <PlayPauseAnimateButton
                  className="play-pause-button"
                  ref={PlayPauseButtonRef}
                  state={playing ? "playing" : "paused"}
                  onToggle={(e) => {
                    if (e === "playing") {
                      setPlaying(() => true);
                      videoComponent?.current?.play();
                      return;
                    }
                    videoComponent?.current?.pause();
                    setPlaying(() => false);
                    return;
                  }}
                />
              </div>

              <div className="item-control">
                <SVG
                  src={Prev10Icon}
                  fill="#fff"
                  width={28}
                  height={32}
                  onClick={() => previousSeconds(10)}
                />
              </div>

              <div className="item-control">
                <SVG
                  src={Next10Icon}
                  width={28}
                  height={32}
                  onClick={() => nextSeconds(10)}
                />
              </div>

              {muted === false && (
                <VolumeControll
                  onMouseLeave={() => setShowControlVolume(false)}
                  className="item-control"
                  primaryColor={primaryColor}
                  percentVolume={volume}
                >
                  {showControlVolume === true && (
                    <div className="volumn-controll">
                      <div className="box-connector" />
                      <div className="box">
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={volume}
                          onChange={(e) => setVolumeAction(+e.target.value)}
                          title=""
                        />
                      </div>
                    </div>
                  )}

                  {volume >= 60 && (
                    <SVG
                      src={VolumeIcon}
                      width={28}
                      height={32}
                      onMouseEnter={() => setShowControlVolume(true)}
                      onClick={() => setMuttedAction(true)}
                    />
                  )}

                  {volume < 60 && volume >= 10 && (
                    <FaVolumeDown
                      onMouseEnter={() => setShowControlVolume(true)}
                      onClick={() => setMuttedAction(true)}
                    />
                  )}

                  {volume < 10 && volume > 0 && (
                    <FaVolumeOff
                      onMouseEnter={() => setShowControlVolume(true)}
                      onClick={() => setMuttedAction(true)}
                    />
                  )}

                  {volume <= 0 && (
                    <FaVolumeMute
                      onMouseEnter={() => setShowControlVolume(true)}
                      onClick={() => setVolumeAction(0)}
                    />
                  )}
                </VolumeControll>
              )}

              {muted === true && (
                <div className="item-control">
                  <FaVolumeMute onClick={() => setMuttedAction(false)} />
                </div>
              )}
              <span className="item-control video-time">
                {secondsToHms(progress)} : {secondsToHms(duration)}
              </span>
              <div className="item-control info-video">
                <span className="info-first">{titleMedia}</span>
                <span className="info-secund">{extraInfoMedia}</span>
              </div>
            </div>

            <div className="end">
              {!!playbackRateEnable && (
                <div
                  className="item-control"
                  onMouseLeave={() => setShowPlaybackRate(false)}
                >
                  {showPlaybackRate === true && (
                    <ItemPlaybackRate primaryColor={primaryColor}>
                      <div className="playback-rates">
                        {playbackRateOptions.map((item, index) => (
                          <div
                            className="item"
                            onClick={() => onChangePlayBackRate(item)}
                            key={index}
                          >
                            <div className="check">
                              {+item === +playbackRate && (
                                <>
                                  <SVG
                                    width={35}
                                    height={30}
                                    src={CheckIcon}
                                    fill="transparent"
                                    stroke="#fff"
                                  ></SVG>
                                </>
                              )}
                            </div>
                            <div className="bold">{`${item}x`}</div>
                          </div>
                        ))}
                      </div>
                      <div className="box-connector" />
                    </ItemPlaybackRate>
                  )}

                  <IconPlayBackRate
                    className="playbackRate"
                    onMouseEnter={() => setShowPlaybackRate(true)}
                  >
                    <span>
                      {playbackRate === "Normal" ? "1" : `${playbackRate}`}
                      <small>x</small>
                    </span>
                  </IconPlayBackRate>
                </div>
              )}

              {onPrevClick && (
                <div
                  className="item-control"
                  onMouseLeave={() => setShowDataPrev(false)}
                >
                  {showDataPrev === true && dataPrev.title && (
                    <ItemNext>
                      <div>
                        <div className="title">
                          {t("prevEpizode", { lng: playerLanguage })}
                        </div>
                        <div className="item" onClick={onPrevClick}>
                          <div className="bold">{dataNext.title}</div>
                          {dataNext.description && (
                            <div>{dataPrev.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="box-connector" />
                    </ItemNext>
                  )}

                  <SVG
                    src={BackIcon}
                    width={20}
                    height={20}
                    onClick={onNextClick}
                    onMouseEnter={() => setShowDataPrev(true)}
                  />
                </div>
              )}
              {onNextClick && (
                <div
                  className="item-control"
                  onMouseLeave={() => setShowDataNext(false)}
                >
                  {showDataNext === true && dataNext.title && (
                    <ItemNext>
                      <div>
                        <div className="title">
                          {t("nextEpisode", { lng: playerLanguage })}
                        </div>
                        <div className="item" onClick={onNextClick}>
                          <div className="bold">{dataNext.title}</div>
                          {dataNext.description && (
                            <div>{dataNext.description}</div>
                          )}
                        </div>
                      </div>
                      <div className="box-connector" />
                    </ItemNext>
                  )}

                  <SVG
                    width={20}
                    height={20}
                    src={SkipIcon}
                    onClick={onNextClick}
                    onMouseEnter={() => setShowDataNext(true)}
                  />
                </div>
              )}

              <div
                className="item-control"
                onMouseLeave={() => setShowReproductionList(false)}
              >
                {showReproductionList && (
                  <ItemListReproduction primaryColor={primaryColor}>
                    <div className="list-reproduction" ref={listReproduction}>
                      {reprodutionList.map((item, index) => (
                        <div
                          className={`item-list-reproduction ${
                            item.playing && "selected"
                          }`}
                          onClick={() =>
                            onClickItemListReproduction &&
                            onClickItemListReproduction(item.id, item.playing)
                          }
                          key={index}
                        >
                          <div className="bold">
                            <span style={{ marginRight: 5 }}>{index + 1}</span>
                            {item.nome}
                          </div>

                          {item.percent && <div className="percent" />}
                        </div>
                      ))}
                    </div>
                  </ItemListReproduction>
                )}
                {reprodutionList && reprodutionList.length > 1 && (
                  <SVG
                    src={PlayListIcon}
                    width={20}
                    height={20}
                    onMouseEnter={() => setShowReproductionList(true)}
                  />
                )}
              </div>

              {qualities && qualities.length > 1 && (
                <div
                  className="item-control"
                  onMouseLeave={() => setShowQuality(false)}
                >
                  {showQuality === true && (
                    <ItemListQuality primaryColor={primaryColor}>
                      <div className="item-list-quality">
                        {qualities &&
                          qualities.map((item) => (
                            <div
                              onClick={() => {
                                setShowQuality(false);
                                onChangeQuality(item.id);
                              }}
                              key={item.id}
                              className="item-quality"
                            >
                              <span className="check">
                                {item.playing ? (
                                  <SVG
                                    src={CheckIcon}
                                    width={35}
                                    height={30}
                                  ></SVG>
                                ) : null}
                              </span>
                              <span className="title">{item.nome}</span>
                            </div>
                          ))}
                      </div>
                    </ItemListQuality>
                  )}

                  <SVG
                    src={SettingsIcon}
                    width={20}
                    height={20}
                    onMouseEnter={() => setShowQuality(true)}
                  />
                </div>
              )}

              <div className="item-control">
                {fullScreen === false ? (
                  <FaExpand onClick={fullScreenToggle} />
                ) : (
                  <FaCompress onClick={fullScreenToggle} />
                )}
              </div>
            </div>
          </div>
        )}
      </Controlls>
    </Wrapper>
  );
}
