import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { useScrollYPosition } from "react-use-scroll-position";
import "../assets/styles/navbar.css";
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import { AUTH_TOKEN, USER_ID } from '../constants';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollYPosition();
  const { state, dispatch } = useContext(AuthContext);
  let history = useHistory();

  const logout = () => {
    // delete the token and user id from storage    
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER_ID);

    dispatch({
        type: 'LOGGED_IN_USER',
        payload: null
    });
    history.push('/');
    
};

  const { user } = state;

  const stickeyTrigger = window.innerHeight / 2.75;

  const links = [
    { title: "Home", href: "/", visible: true },
    { title: "Login", href: "/login", visible: !user },
    { title: "Register", href: "/register", visible: !user },
    { title: "Slot-Machine", href: "/slotmachine", visible: !!user },
    
  ]

  return (
    <div
      className={`nav${scrollY > stickeyTrigger ? " nav-stickey" : ""}${
        menuOpen ? " nav-open" : ""
      }`}>
      <div className="nav-content">
        <div className="nav-logo">Slot-Machine</div>

        <nav className="nav-links__container">
          {links &&
            links.map((link, i) => ( link.visible &&
              <Link className="nav-link" to={link.href} key={i}>
                <div className="nav-link__text">{link.title}</div>
                <div className="nav-link__background" />
              </Link>
            ))}
            {!!user && <a className='nav-link' onClick={logout} href="/"><span className="nav-link__text">Logout</span></a>}
        </nav>

        <div className="nav-menu__icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
