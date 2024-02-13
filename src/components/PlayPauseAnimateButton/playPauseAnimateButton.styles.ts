import styled, { css } from "styled-components";

type ButtonProps = {
  playing: boolean;
};

const Button = styled.button<ButtonProps>`
  user-select: none;
  -webkit-user-drag: none;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  opacity: 1;
  transition: all 0.218s linear;
  border: none;
  background-color: transparent;
  svg {
    width: 100%;
    height: 100%;
  }

  svg path {
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: 0.218s;
  }

  ${({ playing }) =>
    playing &&
    css`
      svg path {
        d: path("M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z");
      }
    `}

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0;
    top: 0;
    left: 0;
    transition: all 218ms linear;
    transform: translateZ(0);
  }

  &:after {
    left: auto;
    right: 0;
  }
`;

export { Button };
