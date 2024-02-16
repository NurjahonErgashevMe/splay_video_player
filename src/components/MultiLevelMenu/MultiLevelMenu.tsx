/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import SVG from "react-inlinesvg";
import CaretIcon from "public/icons/caret.svg";
import CogIcon from "public/icons/cog.svg";
import ChevronIcon from "public/icons/chevron.svg";
import ArrowIcon from "public/icons/arrow.svg";
import BoltIcon from "public/icons/bolt.svg";
import styles from "./index.module.scss";

function MultiLevelMenu() {
  return (
    <Navbar>
      <NavItem icon={<SVG src={CaretIcon} />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function Navbar(props: { children: React.ReactNode }) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles["navbar-nav"]}>{props.children}</ul>
    </nav>
  );
}

function NavItem(props: { icon: React.ReactNode; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles["nav-item"]}>
      <a
        href="#"
        className={styles["icon-button"]}
        onClick={() => setOpen(!open)}
      >
        {props.icon}
      </a>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState<number | null>(null);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    if (dropdownRef.current?.firstChild) {
      setMenuHeight(dropdownRef.current?.firstChild.offsetHeight ?? null);
    }
  }, []);

  function calcHeight(el: HTMLElement) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props: {
    goToMenu?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
  }) {
    return (
      <a
        href="#"
        className={styles["menu-item"]}
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className={styles["icon-button"]}>{props.leftIcon}</span>
        {props.children}
        <span className={styles["icon-right"]}>{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div
      className={styles.dropdown}
      style={{ height: menuHeight ?? 0 }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<SVG src={CogIcon} />}
            rightIcon={<SVG src={ChevronIcon} />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<SVG src={ChevronIcon} />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem goToMenu="main" leftIcon={<SVG src={ArrowIcon} />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<SVG src={BoltIcon} />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<SVG src={BoltIcon} />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<SVG src={BoltIcon} />}>
            JavaScript
          </DropdownItem>
          <DropdownItem leftIcon={<SVG src={BoltIcon} />}>
            Awesome!
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className={styles.menu}>
          <DropdownItem goToMenu="main" leftIcon={<SVG src={ArrowIcon} />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default MultiLevelMenu;
