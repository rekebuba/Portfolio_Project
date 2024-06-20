import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';
import { useLocation } from 'react-router-dom';

const Dashbord = () => {
    const [userId, setUserId] = useState('');
    const location = useLocation();
    const user = location.state?.user;

    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    const helloUser = (user) => {
        if (user.name) {
            return user.name;
        } else if (user.username) {
            return user.username;
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
                    <button className="sign-up">Sign Up</button>
                </nav>
            </header >
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Welcome, [{ helloUser(user) }]</h1>
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
