import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOutUserStart } from './../redux/User/user.actions';

import Header from './../components/Header/header';
import Sidenav from './../components/Sidenav/sidenav';
import Footer from './../components/Footer/footer';

const AdminLayout = props => {
    const dispatch = useDispatch();
  
    const signOut = () => {
      dispatch(signOutUserStart());
    };
  
    return (
      <div className="adminLayout">
        <Header {...props} />
        <div className="controlPanel">
          <div className="sidebar">
            <Sidenav>
              <ul>
                <li>
                  <Link to="/admin">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="signOut" onClick={() => signOut()}>
                    Sign Out
                  </span>
                </li>
              </ul>
            </Sidenav>
          </div>
          <div className="content">
            {props.children}
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default AdminLayout;