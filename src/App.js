import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// hoc
import WithAuth from './hoc/withAuth';

// Actions
import { checkUserSession } from './redux/User/user.actions';

// Layouts
import MainLayout from './layouts/mainLayout.js'
import HomeLayout from './layouts/homeLayout.js'

// Page Imports
import Home from './pages/Home/home';
import Recovery from './pages/Recovery/passwordRecovery';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';
import Dashboard from './pages/Dashboard/dashboard';
import Profile from './pages/Profile/profile';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, [dispatch]);


  return (
    <div className="App">

      {/* APP ROUTES */}
      <Switch>
          <Route exact={true} path='/' render={() => (
            <HomeLayout>
              <Home />
            </HomeLayout>
          )} />

          <Route path='/register' render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )} />

          <Route path='/login' render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

          <Route path='/recovery' render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />

          <Route path='/dashboard' render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} />

          <Route path='/profile' render={() => (
            <WithAuth>
              <MainLayout>
                <Profile />
              </MainLayout>
            </WithAuth>
          )} />

      </Switch>
    </div>
  );
}


export default App;
