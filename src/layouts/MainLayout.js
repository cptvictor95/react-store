import React from 'react'
import './../App.scss';

// Components Import
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer';

const MainLayout = props => {
    return (
        <div className="fullHeight">
            <Header {...props} />
            <div className="App__main">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;