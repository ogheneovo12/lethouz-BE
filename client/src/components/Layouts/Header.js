import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { history } from "../../helpers";
import { Can }from "../Can";
import {
  useLayoutDispatch,
  toggleAuthModal,
  signOut,
  useUserDispatch,
} from "../../contexts";
import PropTypes from "prop-types";
import { ReactComponent as Logo } from "./logo.svg"
import { Search, Toolbox } from "../index";
export function Header({ toggleSidebar }) {
  const layoutDispatch = useLayoutDispatch();
  const userDispatch = useUserDispatch();
  const menu = useRef(null);
  const [showmenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showmenu);
  const closeMenu = () => setShowMenu(false);
  
  useEffect(() => {
    document.querySelector("main").addEventListener("click", closeMenu);
    return () => {
      document.querySelector("main").removeEventListener("click", closeMenu);
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    menu.current.classList.toggle("show", showmenu);
  }, [showmenu]);
  return (
    <header className="header_white">
      <div className="header_container">
        <div className="header_logo">
          <Link to="/">
          <Logo width="100%" />
          </Link>
        </div>
        <Search inhead filter />

        <ul className="right-menu">
          <li>
            <Toolbox toggleMenu={toggleMenu} />
          </li>
          <li>
            <ul className="menu" ref={menu} onMouseLeave={closeMenu}>
              <Link to="/"><li>Home</li></Link>
              <Can
                role="auth"
                yes={() => (
                  <Link to="/user/account">
                    <li>Account</li>
                  </Link>
                )}
              />
              <Can
                role="auth"
                yes={() => (
                  <Link to="/property/add">
                    <li>Upload apartment</li>{" "}
                  </Link>
                )}
              />
                <Can
                role="auth"
                yes={() => (
                  <Link to="/property/uploaded">
                    <li>uploaded apartments</li>{" "}
                  </Link>
                )}
              />
                <Can
                role="auth"
                yes={() => (
                  <Link to="/property/saved">
                    <li>saved apartments</li>{" "}
                  </Link>
                )}
              />
              <Can
                role="auth"
                yes={() => (
                  <Link to="/user/account/notifications">
                    <li>Notifications</li>
                  </Link>
                )}
              />
              <Can role="auth" yes={() => <li>Settings</li>} />
              <Can
                role="auth"
                no={() => (
                  <li
                    onClick={() => {
                      toggleAuthModal(layoutDispatch, "login");
                    }}
                  >
                    Login
                  </li>
                )}
              />
              <Can
                role="auth"
                no={() => (
                  <li
                    onClick={() => {
                      toggleAuthModal(layoutDispatch, "signup");
                    }}
                  >
                    Signup
                  </li>
                )}
              />
              <Can
                role="auth"
                yes={() => (
                  <li onClick={() => signOut(userDispatch, history)}>Logout</li>
                )}
              />
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}

Header.propTypes = {
  toggleSidebar: PropTypes.func,
};
