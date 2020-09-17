import React from 'react'
import './../App.scss';

// Components Import
import Header from '../components/Header/header'
import Footer from '../components/Footer/footer';

const HomeLayout = props => {
    return (
        <div className="App__main">
            <Header {...props} />
                {props.children}
            <Footer />
        </div>
    )
}

export default HomeLayout;