import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useCallback,
  Ref,
  CSSProperties,
} from "react";
import { Button } from "./playPauseAnimateButton.styles";

export interface Props {
  state?: "playing" | "paused";
  onPlay?: () => void;
  onPause?: () => void;
  onToggle?: (state: string) => void;
  className?: string;
  style?: CSSProperties;
}

export interface YSPlayPauseButton extends HTMLButtonElement {
  play: () => void;
  pause: () => void;
  toggle: () => void;
  isPaused: () => boolean;
}

const ButtonComponent = forwardRef(
  (
    {
      className,
      style,
      state: defaultState = "paused",
      onPause,
      onPlay,
      onToggle,
    }: Props,
    ref: Ref<YSPlayPauseButton>
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [state, setState] = useState(defaultState);

    const toggle = useCallback(() => {
      setState((s) => (s === "paused" ? "playing" : "paused"));
    }, []);

    useEffect(() => {
      setState(defaultState);
    }, [defaultState]);

    useEffect(() => {
      if (onToggle) {
        onToggle(state);
      }
      if (state === "paused") {
        if (onPause) {
          onPause();
        }
      } else {
        if (onPlay) {
          onPlay();
        }
      }
    }, [state]);

    useLayoutEffect(() => {
      if (!ref || !buttonRef.current) {
        return;
      }

      const el: Partial<YSPlayPauseButton> = buttonRef.current;

      el.isPaused = () => state === "paused";
      el.play = () => setState("playing");
      el.pause = () => setState("paused");
      el.toggle = () => toggle();

      if (typeof ref === "function") {
        ref(el as YSPlayPauseButton);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ref as any).current = el as YSPlayPauseButton;
      }
    }, [ref, state, toggle]);

    return (
      <Button
        ref={buttonRef}
        onClick={toggle}
        playing={state === "playing"}
        className={className}
        style={style}
      >
        <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">
          <path d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" />
        </svg>
      </Button>
    );
  }
);

export default ButtonComponent;
