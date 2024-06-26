import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function Result() {
    const [wpm, setWpm] = useState('');
    const [accuracy, setAccuracy] = useState('');

    const navigate = useNavigate();

    const Dashboard = () => {
        console.log(accuracy)
        navigate('/dashboard', { state: { wpm: wpm, accuracy: accuracy } })
    };

    function togleRefresh() {
        window.location.reload();
    }

    return (
        <div className="congrats-container" id="overlay">
            <div className="congrats-message">
                <h1>Congratulations!</h1>
                <p>You've completed your typing test.</p>
                <div className="score-container">
                    <div className="score-item">
                        <span className="score-label">speed:</span>
                        <span className="score-value" id="wpm" onChange={(e) => setWpm(e.target.value)}></span>
                    </div>
                    <div className="score-item">
                        <span className="score-label">Accuracy:</span>
                        <span className="score-value" id="accuracy" onChange={(e) => setAccuracy(e.target.value)}></span>
                    </div>
                </div>
                <div className='button-container'>
                    <button className="retry-button" onClick={togleRefresh}>Retry Test</button>
                    <button className="retry-button" onClick={Dashboard}>Back to Dashboard</button>
                </div>
            </div>
        </div >
    );
}

export default Result;
