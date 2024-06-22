import React, { useState } from 'react';
import logo from './images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Dashbord = () => {
    const { logout } = useAuth()
    const [userId, setUserId] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const location = useLocation();
    const user = location.state?.user || '';

    const navigate = useNavigate();

    const signUpPage = () => {
        navigate('/signup')
    };

    const loginPage = () => {
        navigate('/login');
    };


    const userData = (required) => {
        if (!user) {
            return "to CachKeys"
        } else if (required === 'profile') {
            console.log(user);
        } else if (required === 'name') {
            return user.name ? user.name : user.username;
        }
    }

    const togleOption = () => {
        setShowOptions(!showOptions);
    }

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logged out successfully');
            loginPage();
        } catch (err) {
            alert('falild to Logged out');
        }
    }
    return (
        <>
            <header className='header'>
                <img src={logo} className="site-name" alt="Site Logo" />
                <nav>
                    <a href="#">Practice</a>
                    <a href="#">Test</a>
                    <a href="#">Profile</a>
                    {user ? <div className='profile' onClick={togleOption}>
                        <h3>
                            {userData('name')[0]}
                        </h3>
                        {showOptions && <div className='dropdown'>
                            <ul>
                                <li onClick={handleLogout}>Log out</li>
                            </ul>
                        </div>}
                    </div> : <button className="sign-up" onClick={signUpPage}>Sign Up</button>}
                </nav>
            </header >
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Welcome, {userData("name")}</h1>
                </header>

                <main className="dashboard-main">
                    <section id="practice" className="section">
                        <h2>Practice Typing</h2>
                        <div className="typing-area">
                            <textarea id="typingInput" placeholder="Start typing..."></textarea>
                        </div>
                        <button className="start-button">Start Practice</button>
                    </section>

                    <section id="test" className="section">
                        <h2>Typing Speed Test</h2>
                        <div className="test-area">
                            <p id="testText">Your test text will appear here...</p>
                            <textarea id="testInput" placeholder="Start typing to begin the test..."></textarea>
                        </div>
                        <button className="start-button">Start Test</button>
                        <div className="results">
                            <p>WPM: <span id="wpmResult">0</span></p>
                            <p>Accuracy: <span id="accuracyResult">0%</span></p>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Dashbord;
