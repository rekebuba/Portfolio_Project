import React from 'react'
import warning from './images/warning.png'
import { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom';
import Timer from './Timer';

function TypingPage() {
    const [incorrectChar, setIncorrectChar] = useState('');
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const location = useLocation();
    const text = location.state?.text || "";
    const timer = location.state?.timer || 0;
    const format = location.state?.format || "";
    const user_id = location.state?.user_id || "";
    const [styledText, setStyledText] = useState(text);
    const [complete, setComplete] = useState(false);

    const [typedKeys, setTypedKeys] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            const isOn = event.getModifierState('CapsLock');
            setIsCapsLockOn(isOn);

            // Check for valid printable keys
            if (
                key.length === 1 || // Printable characters
                key === 'Enter' ||
                key === 'Backspace'
            ) {
                setTypedKeys((prevTypedKeys) => {
                    if (key === 'Backspace') {
                        return prevTypedKeys.slice(0, -1);
                    } else if (key === 'Enter') {
                        return prevTypedKeys + '\u21B5';
                    } else {
                        return prevTypedKeys + key;
                    }
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const textArray = text.split('');

        // Create a new styled text array
        const newStyledText = textArray.map((char, idx) => {
            const isActive = idx === typedKeys.length;
            const isCorrect = typedKeys[idx] === char;
            const modifiedCharClass = `screenBasic-letter ${isCorrect ? 'correct-char' : 'incorrect-char'}`;
            const basicCharClass = `screenBasic-letter ${isActive ? 'active-char' : ''} `;
            const displayChar = char === ' ' ? '\u00A0' : char;

            if (idx < typedKeys.length) {
                // setIncorrectChar(typedKeys[idx] !== char ? text[idx = 1] : '')
                return char === '\u21B5' ? (
                    <>
                        <div className={modifiedCharClass}>{displayChar}</div>
                        <div className="break"></div>
                    </>
                ) : (
                    <div className={modifiedCharClass}>{displayChar}</div>
                );
            }

            return char === '\u21B5' ? (
                <>
                    <div className={basicCharClass}>{displayChar}</div>
                    <div className="break"></div>
                </>
            ) : (
                <div className={basicCharClass}>{displayChar}</div>
            );
        });

        setStyledText(newStyledText);

        if (typedKeys.length === text.length) {
            setComplete(true);
        }

    }, [typedKeys]);

    return (
        <div className='typing-test-body'>
            {<Timer format={format === 'timed' ? 'countDown' : 'countUp'} initialMinutes={timer} typedKeys={typedKeys} text={text} complete={complete} user_id={user_id} />}
            <div className="typing-test-container">
                {isCapsLockOn && (
                    <div className='caps-lock'>
                        <div>
                            <img className='warning-img' src={warning} />
                        </div>
                        <h4>Caps lock is on</h4>
                    </div>
                )}
                <div className="text-to-type">
                    {styledText}
                </div>
            </div>
        </div>
    )
}

export default TypingPage;
