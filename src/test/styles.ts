import styled, { css, keyframes } from "styled-components";

const toUpOpacity = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-20px);
  }

  100% {
    opacity: 0;
    transform: translateY(0);
  }
`;

export interface IWrapperProps {
  fullPlayer: boolean;
  hideVideo: boolean;
  fontFamily: string;
  pip: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  text-align: left;

  & > * {
    outline: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${(props) =>
      props.fontFamily
        ? props.fontFamily
        : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"};
  }

  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
  overflow: hidden;
  max-width: 1920px;
  video {
    height: 100% !important;
    max-height: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    cursor: ${(props) => (props.pip ? "auto" : "none")};
    opacity: ${(props) => (props.hideVideo ? 0 : 1)};

    &::cue {
      color: #eee;
      z-index: 4;
      text-shadow: #222 0 0 5px;
      background: none;
      font-family: ${(props) =>
        props.fontFamily
          ? props.fontFamily
          : "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"};
    }
  }

  ${(props) =>
    props.fullPlayer &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10000;
    `}
`;

export interface IControlsProps {
  show: boolean;
  primaryColor: string;
  progressVideo: number;
  pip: boolean;
}

export const Controlls = styled.div<IControlsProps>`
  opacity: ${(props) => (props.show ? 1 : 0)};
  /* transform: ${(props) => (props.show ? "scale(1)" : "scale(1.2)")}; */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: ${(props) => (props.pip ? "none" : "flex")};
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.4s ease;
  padding: 20px 40px;
  color: #fff;
  font-size: 1.5em;
  z-index: 5;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgb(0, 0, 0) 100%);
  div {
    z-index: 20;
  }

  .interactivities {
    position: absolute;
    width: 100%;
    height: 90%;
    transform: translate(0, 5%);
    z-index: 6;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    &__back,
    &__skip {
      width: 30%;
      height: 100%;
    }
  }

  .back {
    margin-bottom: auto;
    margin-top: 30px;
    div {
      height: 50px;
      display: flex;
      font-size: 20px;
      align-items: center;
      transition: all 0.4s ease;
      overflow: hidden;
      .back__text {
        padding: 0;
        margin-left: 0;
        margin-left: -100%;
        opacity: 0;
        transition: all ease 0.2s;
        width: 100%;
        h3 {
          margin: 0;
          font-size: 22px;
          font-weight: 500;
          line-height: 32px;
        }
        p {
          margin: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 32px;
          color: #b8b8b8;
        }
      }

      &:hover {
        transform: translateX(-10px);

        .back__text {
          margin-left: 0;
          opacity: 1;
        }
      }

      svg {
        font-size: 35px;
        margin-right: 5px;
      }
    }
  }

  .top {
    position: absolute;
    top: 40px;
    right: 40px;
    display: flex;
    align-items: center;
    gap: 24px;
    .item-control {
      cursor: pointer;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .line-reproduction {
    display: flex;
    margin-bottom: 10px;
    input {
      margin: auto;
    }

    span {
      font-size: 14px;
      margin-left: 5px;
    }
  }

  .controlls {
    margin: 20px 0;
    display: flex;
    justify-items: center;
    .end {
      margin-left: auto;
    }
    .end,
    .start {
      display: flex;
      gap: 16px;
      justify-items: center;
      align-items: center;
      &.end {
        gap: 20px;
      }
    }

    .item-control {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0;
      &.video-time {
        width: auto;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
    }

    .info-video {
      font-size: 16px;
      margin-top: -1px;

      .info-first {
        font-weight: bold;
        opacity: 1;
        margin-right: 5px;
      }

      .info-secund {
        font-weight: lighter;
        opacity: 0.5;
      }
    }

    svg {
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        fill: ${(props) => props.primaryColor};
      }
    }
    .play-pause-button {
      svg {
        fill: #fff;
        width: 50px;
        height: 50px;
      }
    }
  }

  .progress-bar {
    width: 100%;
    margin-bottom: 15px;
    appearance: none;
    height: 8px;
    transition: height 0.2s ease;
    border-radius: 5px;
    background: linear-gradient(
      93deg,
      ${(props) => props.primaryColor} ${(props) => props.progressVideo}%,
      #fff ${(props) => props.progressVideo}%
    );
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:focus {
      outline: none !important;
    }

    &::-moz-focus-outer {
      border: 0;
    }

    &::-ms-track {
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: ${(props) => props.primaryColor};
      cursor: pointer;

      outline: none !important;
      border-color: transparent;
      border: 0 !important;
      box-shadow: none !important;
      box-sizing: none;
    }

    &::-moz-range-thumb {
      -webkit-appearance: none;
      border: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: ${(props) => props.primaryColor};
      cursor: pointer;

      outline: none !important;
      border-color: transparent;
      border: 0 !important;
      box-shadow: none !important;
      box-sizing: none;
    }
  }
`;

export interface IVideoPreLoadingProps {
  show: boolean;
  colorTitle: string;
  colorSubTitle: string;
  colorIcon: string;
  showError: boolean;
  colorButtonError: string;
  backgroundColorButtonError: string;
  backgroundColorHoverButtonError: string;
  colorHoverButtonError: string;
}

export const VideoPreLoading = styled.div<IVideoPreLoadingProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  transition: all 0.5s ease;
  z-index: ${(props) => (props.show ? 2 : 0)};
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.show ? 1 : 0)};

  header {
    display: flex;
    color: #ffffff;
    align-items: center;

    h1 {
      color: ${(props) => props.colorTitle};
      font-size: 1.5em;
      font-weight: bold;
    }

    h2 {
      color: ${(props) => props.colorSubTitle};
      font-size: 1.1em;
    }

    svg {
      color: ${(props) => props.colorIcon};
      opacity: 0.5;
      margin-left: auto;
      font-size: 4em;
      padding: 10px;
      cursor: pointer;
      transition: all 0.4s ease;

      &:hover {
        transform: scale(1.2);
        opacity: 1;
      }
    }
  }

  section {
    text-align: center;
    color: #ddd;
    margin: auto;
    transition: all 0.4s ease;
    opacity: ${(props) => (props.showError ? 1 : 0)};

    .links-error {
      display: inline-flex;
      margin: auto;

      div {
        color: ${(props) => props.colorButtonError};
        background: ${(props) => props.backgroundColorButtonError};
        display: flex;
        align-items: center;
        margin: 0 5px;
        padding: 10px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.4s ease;

        &:hover {
          background: ${(props) => props.backgroundColorHoverButtonError};
          color: ${(props) => props.colorHoverButtonError};
        }
      }
    }

    h1 {
      font-size: 2em;
    }

    p {
      font-size: 1.5em;
      margin: 20px;
    }
  }
`;
export const IconOnPress = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  padding: 30px;
  transition: all 0.5s ease;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-on_press_wrapper {
    z-index: 10;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export interface IStandyByInfoProps {
  show: boolean;
  primaryColor: string;
  secundaryColor: string;
}

export const StandyByInfo = styled.div<IStandyByInfoProps>`
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 50px;
  transition: all 0.5s ease;
  opacity: ${(props) => (props.show ? 1 : 0)};

  section {
    margin: auto 0;
    padding-top: 100px;
    padding-left: 100px;

    h3 {
      color: #fff;
      font-size: 1.1em;
      margin-bottom: 5px;
    }

    h1 {
      font-weight: bold;
      font-size: 3em;
      color: ${(props) => props.primaryColor};
      margin: 10px 0;
    }

    h2 {
      color: ${(props) => props.secundaryColor};
      font-size: 20px;
      margin-top: -5px;
      font-weight: bold;
    }
  }

  footer {
    margin-top: auto;
    margin-bottom: 50px;
    margin-left: auto;
    text-transform: uppercase;
    color: #ffffff;
  }
`;

export const Loading = styled.div`
  position: absolute;
  height: 100% !important;
  width: 100% !important;
  display: flex;

  div {
    display: flex;
    margin: auto;

    div {
      &:nth-child(2) {
        animation-delay: 0.1s;
      }

      &:nth-child(3) {
        animation-delay: 0.2s;
      }

      animation: 1s linear ${toUpOpacity} infinite;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${(props) => props.color};
      margin: auto 5px;
    }
  }
`;

export interface IVolumeControlProps {
  primaryColor: string;
  percentVolume: number;
}

export const VolumeControll = styled.div<IVolumeControlProps>`
  .volumn-controll {
    bottom: 70px;
    left: -50px;
    position: absolute;
    transform: rotate(-90deg);

    .box {
      background: #222222;
      padding: 10px 18px;
      border-radius: 5px;
    }

    .box-connector {
      width: 20px;
    }

    input {
      border: none;
      appearance: none;
      height: 5px;
      border-radius: 5px;
      background: #999;
      background: linear-gradient(
        93deg,
        ${(props) => props.primaryColor} ${(props) => props.percentVolume}%,
        #fff ${(props) => props.percentVolume}%
      );
      width: 70px;

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${(props) => props.primaryColor};
        cursor: pointer;
      }

      &::-moz-range-thumb {
        -webkit-appearance: none;
        border: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${(props) => props.primaryColor};
        cursor: pointer;
      }
    }
  }
`;

const ItemControllBar = styled.div`
  bottom: 20px;
  right: -20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;

  .box-connector {
    height: 20px;
    width: 100%;
  }
`;

export const IconPlayBackRate = styled.div`
  cursor: pointer;
  font-weight: bold;

  small {
    font-weight: lighter;
    font-weight: 10px;
  }

  span {
    opacity: 0.2;
    font-size: 25px;
    transition: all 0.4s ease;

    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;

export const ItemPlaybackRate = styled(ItemControllBar)<{
  primaryColor: string;
}>`
  cursor: pointer;
  font-weight: bold;
  max-width: 304px;
  max-height: 240px;
  display: flex;
  border-radius: 16px;
  background: rgb(20, 20, 20);
  margin-bottom: 13px;
  .playback-rates {
    width: 100%;
    height: 90%;
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    .title {
      font-size: 20px;
      font-weight: bold;
      padding: 0px 32px 0px 32px;
      margin: 0;
    }
    /* Ширина и цвет полосы прокрутки */
    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 8px;
      background: #2c2d35;
      max-height: 50px;
      height: 50px;
    }
    &::-webkit-scrollbar-track {
    }

    /* Цвет и стиль полосы прокрутки */
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: ${(props) => props.primaryColor};
    }

    &__item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      padding: 10px;
      cursor: pointer;
      transition: all 0.4s ease;
      border-bottom: 1px solid rgb(44, 45, 53);
      z-index: 2;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        background: rgb(44, 45, 53);
      }
      &__bold {
        width: 100%;
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
        letter-spacing: 0%;
      }
      &__check {
        width: 24px;
        height: 24px;
        padding: 0;
      }
    }
    &__box-connector {
      width: 100%;
      height: 20px;
      position: absolute;
      display: flex;
      justify-content: end;
      bottom: -10px;
      z-index: 1;
      &__trangle-icon {
        margin-left: auto;
        padding-right: 20px;
      }
    }

    svg {
      font-size: 14px !important;
      margin-right: 5px;
    }

    .bold {
      font-weight: bold;
    }
  }
`;

export const ItemNext = styled(ItemControllBar)`
  & > div:first-child {
    background: #333;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 10px;
      margin: 0;
    }

    .item {
      background: #222;
      display: flex;
      flex-direction: column;
      font-size: 14px;
      padding: 10px;
      cursor: pointer;
      transition: all 0.4s ease;

      &:hover {
        background: #333;
      }
    }
    .bold {
      font-weight: bold;
    }
  }
`;

export const ItemListReproduction = styled(ItemControllBar)<{
  primaryColor: string;
}>`
  cursor: pointer;
  font-weight: bold;
  max-width: 304px;
  max-height: 361px;
  display: flex;
  border-radius: 16px;
  background: rgb(20, 20, 20);
  .list-reproduction {
    width: 100%;
    height: 90%;
    margin-top: 5%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    /* padding: 8px 0; */
    .title {
      font-size: 20px;
      font-weight: bold;
      padding: 0px 32px 0px 32px;
      margin: 0;
    }
    /* Ширина и цвет полосы прокрутки */
    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 8px;
      background: #2c2d35;
      max-height: 50px;
      height: 50px;
    }
    &::-webkit-scrollbar-track {
    }

    /* Цвет и стиль полосы прокрутки */
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: ${(props) => props.primaryColor};
    }

    .item-list-reproduction {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      padding: 10px 0;
      cursor: pointer;
      transition: all 0.4s ease;
      height: 30px;
      border-bottom: 1px solid #2c2d35;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        background: #2c2d35;
      }
      .bold {
        width: 64px;
      }
      .check {
        width: 30px;
        padding: 0;
      }
    }
    .selected {
      background-color: #2c2d35;
    }

    svg {
      font-size: 14px !important;
      margin-right: 5px;
    }

    .bold {
      font-weight: bold;
    }
  }
`;

export const ItemListQuality = styled(ItemControllBar)<{
  primaryColor: string;
}>`
  max-width: 304px;
  max-height: 240px;

  cursor: pointer;
  font-weight: bold;
  display: flex;
  border-radius: 16px;
  background: rgb(20, 20, 20);
  .item-list-quality {
    width: 100%;
    height: 90%;
    margin-top: 5%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    /* Ширина и цвет полосы прокрутки */
    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 8px;
      background: #2c2d35;
      max-height: 50px;
      height: 50px;
    }
    &::-webkit-scrollbar-track {
    }

    /* Цвет и стиль полосы прокрутки */
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: ${(props) => props.primaryColor};
    }

    .item-quality {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      padding: 10px 0;
      cursor: pointer;
      transition: all 0.4s ease;
      height: 30px;
      border-bottom: 1px solid #2c2d35;
      &:last-child {
        border-bottom: 0;
      }
      &:hover {
        background: #2c2d35;
      }
      .check {
        width: 30px;
        padding: 0;
      }
      .title {
        width: calc(100% - 30px);
        margin-left: 30px;
        font-size: 20px;
        font-weight: bold;
        padding: 0 32px 0 0;
        margin: 0;
      }
    }
    .selected {
      background-color: #2c2d35;
    }

    svg {
      font-size: 14px !important;
      margin-right: 5px;
    }

    .bold {
      font-weight: bold;
    }
  }
`;
