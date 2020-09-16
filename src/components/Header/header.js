import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <span className="nav__span">
            <img className="span__img" src={Logo} alt="Cleo Cardoso Atelier LOGO"/>
        </span>
      </nav>
    </header>

  );
}

export default Header;