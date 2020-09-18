/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './styles.scss';

// import Accessories from './../../assets/acc2.jpeg';
// import Dresses from './../../assets/img1.jpeg';
import Teste from './../../assets/bghome.jpg';

const Directory = () => {
  return (
    <section className="directory">
        <div className="directory__wrap">

            {/* <div className="wrap__item" style={{backgroundImage: `url(${Dresses})`}}>
                <a href="#">Vestidos</a>
            </div>
            <div className="wrap__item" style={{backgroundImage: `url(${Accessories})`}}>
                <a href="#">Acessórios</a>
            </div> */}
            {/* MY HOMEPAGE */}
            <div className="wrap__item">
              <h1>HOMEPAGE TITLE</h1>
            </div>
            <div className="wrap__item" style={{backgroundImage: `url(${Teste})`}}>
              <h1>ANOTHER TEXT</h1>
            </div>

        </div>
    </section>
  );
}

export default Directory;