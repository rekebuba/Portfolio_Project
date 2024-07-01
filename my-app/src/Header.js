import React, { useState } from 'react';
import logo from './images/logo.png';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


function Header({ username, userId }) {
    const [showOptions, setShowOptions] = useState(false);
    const { logout } = useAuth()
    const navigate = useNavigate();

    const signUpPage = () => {
        navigate('/signup')
    };

    const loginPage = () => {
        navigate('/login');
    };

    const togleOption = () => {
        setShowOptions(!showOptions);
    }

    const testPage = () => {
        navigate('/test', {state: {username: username, userId: userId}})
    };

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logged out successfully');
            loginPage();
        } catch (err) {
            alert('failed to Logged out');
        }
    }

    return (
        <header className='header'>
            <img src={logo} className="site-name" alt="Site Logo" />
            <nav>
                <a href="/text">Practice</a>
                <a onClick={testPage}>Test</a>
                <a href="#">Profile</a>
                {username ? <div className='profile' onClick={togleOption}>
                    <h3>
                        {username[0]}
                    </h3>
                    {showOptions && <div className='dropdown'>
                        <ul>
                            <li onClick={handleLogout}>Log out</li>
                        </ul>
                    </div>}
                </div> : <button className="sign-up" onClick={signUpPage}>Sign Up</button>}
            </nav>
        </header >
    );
}

export default Header;
