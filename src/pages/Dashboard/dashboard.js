import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';

const Dashboard = props => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <Link to='/profile'>
                <h4>My Profile</h4>
            </Link>
        </div>
    )
}

export default Dashboard;