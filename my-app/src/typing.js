import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { IsValidity } from './script/script';

function TypingPage() {
    const [ validity, setValdity ] = useState('');
    const location = useLocation();
    const user = location.state?.text || '';

    useEffect(() => {

        IsValidity();

    }, [validity]);

    return (
        <body className='typing-test-body'>
            <div className="typing-test-container">
                <div className="text-to-type" id="scrollableContent">
                    {user}
                </div>
                <textarea id="typing-input" className="typing-input" placeholder="Start typing here..." onChange={(e) => setValdity(e.target.value)}></textarea>
            </div>
            <script src="script/script.js"></script>
        </body>
    )
}

export default TypingPage;
