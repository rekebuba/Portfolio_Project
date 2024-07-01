import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { saveScore } from './api';


function Result() {
    const location = useLocation();
    const user_id = location.state?.user_id || "";
    const results = location.state?.results || "";
    const navigate = useNavigate();

    const Dashboard = () => {
        saveScore(user_id, results);
        navigate('/dashboard', { state: { wpm: results.wpm, accuracy: results.accuracy } })
    };

    function refreshPage() {
        window.history.back();
    }

    return (
        <div className="congrats-container" id="overlay">
            <div className="congrats-message">
                <h1>Congratulations!</h1>
                <p>You've completed your typing test.</p>
                <div className="score-container">
                    <div className="score-item">
                        <span className="score-label">speed (WPM)</span>
                        <span className="score-value" id="wpm">{results.wpm}</span>
                    </div>
                    <div className="score-item">
                        <span className="score-label">Accuracy:</span>
                        <span className="score-value" id="accuracy">{results.accuracy}%</span>
                    </div>
                </div>
                <div className='button-container'>
                    <button className="retry-button" onClick={refreshPage}>Retry Test</button>
                    <button className="retry-button" onClick={Dashboard}>Back to Dashboard</button>
                </div>
            </div>
        </div >
    );
}

export default Result;
