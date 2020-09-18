import React from 'react';
import './styles.scss';
// import Logo from './../../assets/logo.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';


const Header = props => {
  const { currentUser } = props;

  return (
    <header className="header">
      <nav className="header__nav">
        <span className="nav__span">
          <Link to="/">
            {/* <img className="span__img" src={Logo} alt="Cleo Cardoso Atelier LOGO"/> */}
            <span>flea store</span>
          </Link>
        </span>
        <div className="callToActions">

          {currentUser && (
            <ul>
              <li>
                <Link to='/profile'>
                  Profile
                </Link>
                <Link to='/' onClick={() => auth.signOut()}>
                  Logout
                </Link>
                <span></span>
              </li>
            </ul>
          )}

          {!currentUser && (
          <ul>
            <li>
              <Link to="/register">
                Register
              </Link>
              <Link to="/login">
                Login
              </Link>
            </li>
          </ul>
          )}
        </div>
      </nav>
    </header>

  );
}

Header.defaultProps = {
  currentUser: null
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps, null)(Header);