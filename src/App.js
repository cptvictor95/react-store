import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

// firebase utils
import { auth, handleUserProfile } from './firebase/utils';

// Layouts
import MainLayout from './layouts/mainLayout.js'
import HomeLayout from './layouts/homeLayout.js'

// Components Imports
import Home from './pages/Home/home';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';

const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

    render() {
      const { currentUser } = this.state;
      return (
        <div className="App">

          {/* APP ROUTES */}
          <Switch>
              <Route exact={true} path='/' render={() => (
                <HomeLayout currentUser={currentUser}>
                  <Home />
                </HomeLayout>
              )} />
  
              <Route path='/register' render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )} />
  
              <Route path='/login' render={() => currentUser ? <Redirect to="/" /> : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )} />
  
          </Switch>
  
        </div>
      );
    }
}

export default App;
