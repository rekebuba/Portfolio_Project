import React, { useEffect, useState } from 'react';
import logo from './images/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import UserHist from './UserHist'

const Dashbord = () => {
    const { logout, userData } = useAuth()
    const [userText, setUserText] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [username, setUserName] = useState('');
    const [userId, setUserId] = useState('');

    const location = useLocation();
    // const { wpm, accuracy } = location.state || '';
    const navigate = useNavigate();

    const signUpPage = () => {
        navigate('/signup')
    };

    const loginPage = () => {
        navigate('/login');
    };

    const typingPage = () => {
        navigate('/typing', { state: { text: userText, user_id: userId } })
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
            alert('failed to Logged out');
        }
    }

    useEffect(() => {
        const fetchUserName = async () => {
            const data = await userData();
            if (data) {
                setUserName(data.name);
                setUserId(data.id);
            }
        };

        fetchUserName();
    }, []);


    return (
        <>
            <header className='header'>
                <img src={logo} className="site-name" alt="Site Logo" />
                <nav>
                    <a href="#">Practice</a>
                    <a href="#">Test</a>
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
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>Welcome {username}</h1>
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
                            <textarea id="testInput" placeholder="Start typing to begin the test..." onChange={(e) => setUserText(e.target.value)}></textarea>
                        </div>
                        <button className="start-button" onClick={typingPage}>Start Test</button>
                    </section>
                    <UserHist userId={userId} />
                </main>
            </div>
        </>
    );
};

export default Dashbord;
