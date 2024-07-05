import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Header from './Header';
import { getPage } from './api';


function TestTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username || "";
    const userId = location.state?.userId || "";

    const typingPage = async (type, num) => {
        const data = await getPage();
        let combinedText = '';
        const range = type === 'timed' ? num : num * 2
        for (let i = 0; i < range; i++) {
            combinedText += data[i].text + '\u21B5'; // Carriage return (Enter symbol)
        }

        if (data) {
            navigate('/typing', { state: { text: combinedText, user_id: userId, format: type, timer: num } })
        }
    }

    return (
        <>
            <Header username={username} />
            <div className='dashboard-container'>
                <h1>Timed Tests</h1>
                <div className='timer-container'>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>1 minute</p>
                            <button className='test-button' onClick={(e) => typingPage("timed", 1)}>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>3 minute</p>
                            <button className='test-button' onClick={(e) => typingPage("timed", 3)}>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>5 minute</p>
                            <button className='test-button' onClick={(e) => typingPage("timed", 5)}>Start &#9654;</button>
                        </div>
                    </div>
                </div>
                <h1>Page Tests</h1>
                <div className='timer-container'>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>1 page</p>
                            <button className='test-button' onClick={(e) => typingPage("page", 1)}>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>2 page</p>
                            <button className='test-button' onClick={(e) => typingPage("page", 2)}>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>3 page</p>
                            <button className='test-button' onClick={(e) => typingPage("page", 3)}>Start &#9654;</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TestTime;
