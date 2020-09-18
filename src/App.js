import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// firebase utils
import { auth, handleUserProfile } from './firebase/utils';

// Actions
import { setCurrentUser } from './redux/User/user.actions';

// Layouts
import MainLayout from './layouts/mainLayout.js'
import HomeLayout from './layouts/homeLayout.js'

// Components Imports
import Home from './pages/Home/home';
import Recovery from './pages/Recovery/passwordRecovery';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';


class App extends Component {
  authListener = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
          })
        })
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

    render() {
      const { currentUser } = this.props;
      return (
        <div className="App">

          {/* APP ROUTES */}
          <Switch>
              <Route exact={true} path='/' render={() => (
                <HomeLayout>
                  <Home />
                </HomeLayout>
              )} />

              <Route path='/register' render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout>
                  <Registration />
                </MainLayout>
              )} />

              <Route path='/login' render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout>
                  <Login />
                </MainLayout>
              )} />

              <Route path='/recovery' render={() => (
                <MainLayout>
                  <Recovery />
                </MainLayout>
              )} />
  
          </Switch>
        </div>
      );
    }
}

// SET USER STATE GLOBALLY ON APP
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
