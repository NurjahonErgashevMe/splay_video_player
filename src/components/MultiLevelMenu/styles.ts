import styled from "styled-components";

const Navbar = styled.nav`
  height: var(60px);
  background-color: #242526;
  padding: 0 1rem;
  border-bottom: 1px solid #474a4d;
`;

const NavList = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;

const NavItemWrapper = styled.li`
  width: calc(var(60px) * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled.a`
  --button-size: calc(var(60px) * 0.5);
  width: var(--button-size);
  height: var(--button-size);
  background-color: #484a4d;
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;

const IconWrapper = styled.span`
  fill: var(#dadce1);
  width: 20px;
  height: 20px;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 58px;
  width: 300px;
  transform: translateX(-45%);
  background-color: #242526;
  border: 1px solid #474a4d;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  transition: height var(500ms) ease;
`;

const MenuItem = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: 1s var(500ms);
  padding: 0.5rem;

  &:hover {
    background-color: #525357;
  }
`;

const IconRight = styled.span`
  margin-left: auto;
`;

export {
  DropdownWrapper,
  IconButton,
  IconRight,
  IconWrapper,
  MenuItem,
  NavItemWrapper,
  NavList,
  Navbar,
};
