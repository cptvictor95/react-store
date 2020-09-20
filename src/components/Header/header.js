import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/User/user.actions'
import { Link } from 'react-router-dom';
import './styles.scss';


const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const Header = props => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  const signOut = () => {
    dispatch(signOutUserStart());
  }

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
                <Link to='/' onClick={() => signOut()}>
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