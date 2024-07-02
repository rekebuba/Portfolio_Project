import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Result from './Result'
import { useNavigate } from 'react-router-dom'


const Timer = ({ format, initialMinutes = 1, typedKeys, text, complete, user_id }) => {
    const [countDown, setTimeDown] = useState(initialMinutes * 60);
    const [countUp, setTimeUp] = useState(0);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [results, setResults] = useState(null);

    const navigate = useNavigate();

    const resultPage = () => {
        navigate('/result', { state: { results: results, user_id: user_id } })
    };

    useEffect(() => {
        if (isTimeUp || complete) return;
        // count Down
        const countDownInterval = setInterval(() => {
            setTimeDown(prevTime => {
                if (prevTime === 1 || complete) {
                    clearInterval(countDownInterval);
                    setIsTimeUp(true);
                }
                return prevTime > 0 ? prevTime - 1 : 0;
            });
        }, 1000);

        // count Up
        const countUpInterval = setInterval(() => {
            setTimeUp(prevTime => {
                if (complete) {
                    clearInterval(countUpInterval);
                    setIsTimeUp(true);
                }
                return prevTime + 1;
            });
        }, 1000);

        return () => {
            clearInterval(countDownInterval);
            clearInterval(countUpInterval);
        };
    }, [complete, isTimeUp, initialMinutes]);

    useEffect(() => {
        if (complete || isTimeUp) {
            const strTypedTime = formatTime(countUp);
            const [minutes, seconds] = strTypedTime.split(':').map(Number);
            const TypedTime = minutes + (seconds / 60);
            const values = calculateResults(typedKeys, text, TypedTime);
            setResults(values);
        }
    }, [complete, isTimeUp]);

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = `${Math.floor(time / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes} : ${getSeconds}`;
    };

    /* 
    Typing Test Logic:​
        Algorithm to calculate typing speed (words per minute) and
        accuracy (percentage of correctly typed characters).​
    */

    function calculateResults(textTyped, originalText, typedTime) {
        const totalCharactersTyped = textTyped.length;
        const wordsTyped = totalCharactersTyped / 5;

        // Calculate WPM
        const wpm = Math.round(wordsTyped / typedTime);

        // Calculate accuracy
        let correctCharacters = 0;
        for (let i = 0; i < textTyped.length; i++) {
            if (textTyped[i] === originalText[i]) {
                correctCharacters++;
            }
        }
        const accuracy = Math.round((correctCharacters / totalCharactersTyped) * 100);

        return { wpm, accuracy };
    };

    return (
        <>
            {isTimeUp || complete ? (
                results ? (
                    resultPage()
                ) : (
                    <div>Loading...</div>
                )
            ) : (
                <div className="timer">
                    <h1>{formatTime(format === 'countDown' ? countDown : countUp)}</h1>
                </div>
            )}
        </>
    );
};

export default Timer;
