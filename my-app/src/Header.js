import React from 'react'
import logo from './images/logo.png';
import LandingPage from './LandingPage';

import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate();

    const signInpage = () => {
        navigate('/signin')
    };

    return (
        <header>
            <img src={logo} className="site-name" alt="Site Logo" />
            <nav>
                <a href="#">Page</a>
                <a href="#">Page</a>
                <a href="#">Page</a>
                <button className="sign-up" onClick={signInpage}>Sign Up</button>
            </nav>
        </header >
    );
}

export default Header;
