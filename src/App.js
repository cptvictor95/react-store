import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout.js'
import HomeLayout from './layouts/MainLayout.js'

// Components Imports
import Home from './pages/Home/home';
import Registration from './pages/Registration/registration';


function App() {
    return (
      <div className="App">

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

        </Switch>

      </div>
    );
}

export default App;
