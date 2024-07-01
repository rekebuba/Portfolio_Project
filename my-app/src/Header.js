import React, { useState } from 'react';
import logoName from './images/logoName.png';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


function Header({ username, userId }) {
    const [showOptions, setShowOptions] = useState(false);
    const { logout } = useAuth()
    const navigate = useNavigate();

    const signUpPage = () => {
        navigate('/signup');
    };

    const dashboardPage = () => {
        navigate('/dashboard');
    }

    const loginPage = () => {
        navigate('/login');
    };

    const toggleOption = () => {
        setShowOptions(!showOptions);
    }

    const testPage = (e) => {
        e.preventDefault();
        navigate('/test', { state: { username: username, userId: userId } })
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
            <div onClick={dashboardPage}>
                <img src={logoName} className="site-name" alt="Site Logo" />
            </div>
            <nav>
                <a href="/dashboard">Practice</a>
                <a href="/test" onClick={testPage}>Test</a>
                {username ? <div className='profile' onClick={toggleOption}>
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
