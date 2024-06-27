import React from 'react'
import warning from './images/warning.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Result from './Result';
import { calculateResults } from './script/script';

function TypingPage() {
    const [validity, setValidity] = useState('');
    const [incorrectChar, setIncorrectChar] = useState('');
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const location = useLocation();
    const text = location.state?.text || "";
    const user_id = location.state?.user_id || ""
    const [styledText, setStyledText] = useState(text);
    const [maxLength, setMaxLength] = useState(text.length)
    const [startTime, setStartTime] = useState(new Date().getTime())

    const [results, setResults] = useState(null);

    // useEffect(() => {
    //     setStartTime(new Date().getTime());
    // }, [firstChar]);

    useEffect(() => {
        const textArray = text.split('');
        // Create a new styled text array
        const newStyledText = textArray.map((char, idx) => {
            if (idx < validity.length) {
                setIncorrectChar(validity[idx] !== text[idx] ? text[idx + 1] : '')
                return (
                    <span
                        className={validity[idx] === text[idx] ? 'correct-char' : 'incorrect-char'}
                    >
                        {char}
                    </span>
                );
            }
            return <span key={idx}>{char}</span>;
        });

        setStyledText(newStyledText);

        if (validity.length === text.length && text.length > 0) {
            const values = calculateResults(validity, text, startTime, new Date().getTime());
            setResults(values);
        }

    }, [validity]);

    const handleTextChange = (e) => {
        const currentValue = e.target.value;
        if (incorrectChar) {
            if (e.nativeEvent.inputType !== 'deleteContentBackward' && currentValue.length > 0 && currentValue[currentValue.length - 1] !== incorrectChar) {
                // Remove the last character from the input
                setValidity(currentValue.slice(0, -1));
            } else {
                setIncorrectChar(null);
                setValidity(currentValue);
            }
        } else {
            setValidity(currentValue);
        }

    };

    const handleKeyPress = (e) => {
        const isOn = e.getModifierState('CapsLock');
        setIsCapsLockOn(isOn);
    };

    return (
        <>
            {
                results ?
                    (<Result user_id={user_id} results={results} />)
                    :
                    (<div className="typing-test-container">
                        {isCapsLockOn && (
                            <div className='caps-lock'>
                                <div>
                                    <img className='warning-img' src={warning}/>
                                </div>
                                <h4>Caps lock is on</h4>
                            </div>
                        )}
                        <div className="text-to-type" id="scrollableContent">
                            {styledText}
                        </div>
                        <textarea
                            onKeyDown={handleKeyPress}
                            onKeyUp={handleKeyPress}
                            className="typing-input"
                            placeholder="Start typing here..."
                            onChange={handleTextChange}
                            value={validity}
                            style={{ border: incorrectChar ? "2px solid red" : '' }}
                            maxLength={maxLength}
                        />
                    </div>)
            }
        </>
    )
}

export default TypingPage;
