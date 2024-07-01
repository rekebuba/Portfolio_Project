import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import UserHist from './UserHist';
import Header from './Header';
import Footer from './Footer'

const Dashboard = () => {
    const { userData } = useAuth()
    const [userText, setUserText] = useState('');
    const [username, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [incorectFormat, setIncorectFormat] = useState(false);
    const navigate = useNavigate();

    const typingPage = () => {
        if (userText) {
            navigate('/typing', { state: { text: userText, user_id: userId } });
        } else {
            setIncorectFormat(true);
        }
    }

    const validText = (text) => {
        const formattedText = text.replace(/\\n/g, '\u21B5');
        const trimmedString = formattedText.replace(/\s+/g, ' ');
        setUserText(trimmedString);
    }


    useEffect(() => {
        const fetchUserName = async () => {
            const data = await userData();
            if (data) {
                setUserName(data.name ? data.name : data.username);
                setUserId(data.id);
            }
        };

        fetchUserName();
    }, []);


    return (
        <>
            <Header username={username} userId={userId} />
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Welcome {username}</h1>
                </div>

                <main className="dashboard-main">
                    <section id="test" className="section">
                        <h2>Practice Typing</h2>
                        <div className="test-area">
                            <textarea
                                placeholder="add text to begin the test..."
                                onChange={(e) => {
                                    validText(e.target.value);
                                    setIncorectFormat(false);
                                }}
                                style={{ border: incorectFormat ? "2px solid red" : '' }}
                            />
                        </div>
                        <button className="start-button" onClick={typingPage}>Start Test</button>
                    </section>
                    <UserHist userId={userId} />
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Dashboard;
