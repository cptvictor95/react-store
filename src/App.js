import React from 'react';
import './App.scss';
import Footer from './components/Footer/footer';

// Components Imports
import Header from './components/Header/header';
import Home from './pages/Home/home';


function App() {
    return (
      <div className="App">

        <Header />

        <main className="App__main">


          <Home />


        </main>

        <Footer />

      </div>
    );
}

export default App;
