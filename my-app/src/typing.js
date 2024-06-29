import React from 'react'
import warning from './images/warning.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Result from './Result';
import { calculateResults } from './script/script';

function TypingPage() {
    const [incorrectChar, setIncorrectChar] = useState('');
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const location = useLocation();
    const text = location.state?.text || "";
    const user_id = location.state?.user_id || ""
    const [styledText, setStyledText] = useState(text);
    const [startTime, setStartTime] = useState(new Date().getTime())

    const [results, setResults] = useState(null);
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
                        return prevTypedKeys + '\n';
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
            if (idx < typedKeys.length) {
                // setIncorrectChar(typedKeys[idx] !== char ? text[idx = 1] : '')
                return (
                    <div
                        className={`screenBasic-letter ${typedKeys[idx] === char ? 'correct-char' : 'incorrect-char'}`}>
                        {char === ' ' ? '\u00A0' : char}
                    </div>
                );
            }
            return <div className={`screenBasic-letter ${idx === typedKeys.length ? 'active-char' : ''}`}>{char === ' ' ? '\u00A0' : char}</div>;
        });

        setStyledText(newStyledText);

        if (typedKeys.length === text.length) {
            const values = calculateResults(typedKeys, text, startTime, new Date().getTime());
            setResults(values);
        }

    }, [typedKeys]);

    return (
        <body className='typing-test-body'>
            {
                results ?
                    (<Result user_id={user_id} results={results} />)
                    :
                    (<div className="typing-test-container">
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
                    </div>)
            }
        </body>
    )
}

export default TypingPage;
