import React from 'react';
import { useSelector } from 'react-redux'
import UserProfile from './../UserProfile/profile';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const Sidenav = ({ children }) => {
  const { currentUser } = useSelector(mapState);

  const configUserProfile = {
    currentUser
  }

  return (
    <div className="sidenav">

      <UserProfile {...configUserProfile} />

      <div className="menu">
        {children}
      </div>
    </div>
  );
}

export default Sidenav;