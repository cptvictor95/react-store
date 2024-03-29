import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// Actions
import { checkUserSession } from './redux/User/user.actions';

// Layouts
import MainLayout from './layouts/mainLayout.js'
import HomeLayout from './layouts/homeLayout.js'
import AdminLayout from './layouts/adminLayout.js'
import DashboardLayout from './layouts/dashboardLayout.js'

// Component Imports
import AdminToolbar from './components/AdminToolbar/admintoolbar.js'

// Page Imports
import Home from './pages/Home/home';
import Recovery from './pages/Recovery/passwordRecovery';
import Registration from './pages/Registration/registration';
import Login from './pages/Login/login';
import Dashboard from './pages/Dashboard/dashboard';
import Profile from './pages/Profile/profile';

import './App.scss';
import Admin from './pages/Admin/admin';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());

  }, [dispatch]);


  return (
    <div className="App">
      <AdminToolbar />
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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </WithAuth>
          )} />

          <Route path='/admin' render={() => (
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
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
