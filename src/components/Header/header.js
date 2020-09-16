import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = props => {
  return (
    <header className="header">
      <nav className="header__nav">
        <span className="nav__span">
          <Link to="/">
            <img className="span__img" src={Logo} alt="Cleo Cardoso Atelier LOGO"/>
          </Link>
        </span>
        <div className="callToActions">
          <ul>
            <li>
              <Link to="/register">
              Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>

  );
}

export default Header;