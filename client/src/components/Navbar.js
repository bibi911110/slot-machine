import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useScrollYPosition } from "react-use-scroll-position";
import "../assets/styles/navbar.css";

const Navbar = ({ links }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollYPosition();

  const stickeyTrigger = window.innerHeight / 2.75;

  return (
    <div
      className={`nav${scrollY > stickeyTrigger ? " nav-stickey" : ""}${
        menuOpen ? " nav-open" : ""
      }`}>
      <div className="nav-content">
        <div className="nav-logo">Slot-Machine</div>

        <nav className="nav-links__container">
          {links &&
            links.map((link, i) => (
              <Link className="nav-link" to={link.href} key={i}>
                <div className="nav-link__text">{link.title}</div>
                <div className="nav-link__background" />
              </Link>
            ))}
        </nav>

        <div className="nav-menu__icon" onClick={() => setMenuOpen(!menuOpen)}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  links: [
    { title: "Home", href: "/" },
    { title: "Login", href: "/login" },
    { title: "Register", href: "/register" }
  ]
};

export default Navbar;
