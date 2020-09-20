import React from 'react';
import './styles.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from './../../firebase/utils';


const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const Header = props => {
  const { currentUser } = useSelector(mapState);

  return (
    <header className="header">
      <nav className="header__nav">
        <span className="nav__span">
          <Link to="/">
            <span>flea store</span>
          </Link>
        </span>
        <div className="callToActions">

          {currentUser && (
            <ul>
              <li>
                <Link to='/dashboard'>
                  account
                </Link>
                <Link to='/' onClick={() => auth.signOut()}>
                  logout
                </Link>
                {/* <span></span> */}
              </li>
            </ul>
          )}

          {!currentUser && (
          <ul>
            <li>
              <Link to="/register">
                register
              </Link>
              <Link to="/login">
                login
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

export default Header;