import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Result from './Result';
import { calculateResults } from './script/script';

function TypingPage() {
    const [validity, setValdity] = useState('');
    const [incorrectChar, setIncorrectChar] = useState(false);
    const location = useLocation();
    const text = location.state?.text || '';
    // const [firstChar, setfirstChar] = useState(text[0]);
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
                setMaxLength(validity[idx] != text[idx] ? idx + 1 : text.length);
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

    }, [validity]);

    if (validity.length === text.length) {
        const values = calculateResults(validity, text, startTime, new Date().getTime());
        setResults(values);
    }

    return (
        results ?
            (<Result results={results} />)
            :
            (<div className="typing-test-container">
                <div className="text-to-type" id="scrollableContent">
                    {styledText}
                </div>
                <textarea
                    id="typing-input"
                    className="typing-input"
                    placeholder="Start typing here..."
                    onChange={(e) => setValdity(e.target.value)}
                    style={{ border: incorrectChar ? "2px solid red" : '' }}
                    maxLength={maxLength}
                ></textarea>
            </div>)
    )
}

export default TypingPage;
