import React, { useEffect, useState } from 'react';
import { getScore } from './api'


function UserHist({ userId }) {
    const [showHistory, setShowHistory] = useState(false);
    const [styleResult, setStyleResult] = useState(null);

    function getMonthMap() {
        return {
            1: 'JAV',
            2: 'FEB',
            3: 'MARCH',
            4: 'APRIL',
            5: 'MAY',
            6: 'JUNE',
            7: 'JULY',
            8: 'AUG',
            9: 'SEPT',
            10: 'OCT',
            11: 'NOV',
            12: 'DEC'
        };
    }

    useEffect(() => {
        if (!showHistory) return;

        const fetchUserScore = async () => {
            try {
                const data = await getScore(userId);
                const newStyledResult = data.map((item) => {
                    const dateRegex = /^[\d+]*-0?(\d+)-(\d+)/
                    const match = dateRegex.exec(item.created_at);
                    const month = getMonthMap()[match[1]];
                    const day = match[2];
                    const wpm = item.wpm;
                    const accuracy = item.accuracy;

                    return (
                        <div className="result-container">
                            <div className="date-box">
                                <div className="month">{month}</div>
                                <div className="day">{day}</div>
                            </div>
                            <div className="result-info">
                                <div className="wpm">
                                    <span className="number">{wpm}</span>
                                    <span className="label">WPM</span>
                                </div>
                                <div className="accuracy">
                                    <span className="number">{accuracy}%</span>
                                    <span className="label">Accuracy</span>
                                </div>
                            </div>
                            <button className="print-button">Print Certificate</button>
                        </div>
                    )
                });
                setStyleResult(newStyledResult);
            } catch (error) {
                console.error('Error fetching user score');
            }
        };
        fetchUserScore();
    }, [showHistory]);

    const toggleHistory = () => {
        setShowHistory(!showHistory);
    }

    return (
        <>
            <div className='history-div'>
                <button className="show-history-button" onClick={toggleHistory}>Show history</button>
            </div>
            {showHistory &&
                <div className='result-history'>
                    {styleResult}
                </div>
            }
        </>
    );
}

export default UserHist;
