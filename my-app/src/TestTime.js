import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import Header from './Header';
import TypingPage from './Typing';


function TestTime() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.username || "";

    return (
        <>
            <Header username={username} />
            <div className='dashboard-container'>
                    <h1>Timed Tests</h1>
                <div className='timer-container'>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>1 minute</p>
                            <button className='test-button'>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>3 minute</p>
                            <button className='test-button'>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>5 minute</p>
                            <button className='test-button'>Start &#9654;</button>
                        </div>
                    </div>
                </div>
                    <h1>Page Tests</h1>
                <div className='timer-container'>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>1 page</p>
                            <button className='test-button'>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>2 page</p>
                            <button className='test-button'>Start &#9654;</button>
                        </div>
                    </div>
                    <div className="test-timer-container">
                        <div className="test-timer">
                            <p>3 page</p>
                            <button className='test-button'>Start &#9654;</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TestTime;
