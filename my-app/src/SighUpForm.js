import React from 'react'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from './AuthContext';

const SignUp = () => {
    const { signUp } = useAuth();
    const [user, setUser] = useState({} || '');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userColor, setUserColor] = useState(false);
    const [passColor, setPassColor] = useState(false);

    const [warning, setWarning] = useState('');

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "608106752614-rtqr8nkhqpvoi7fme1jf5hg6tua3jn8j.apps.googleusercontent.com",
            callback: handleGoogleCallback
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large", logo_alignment: 'center' }
        );
    }, []);

    useEffect(() => {
        const validateUsername = async () => {
            const { isValid, errorMessage } = await checkValidity(email, username, password);
            setIsValid(isValid);
            setErrorMessage(errorMessage);
        };

        validateUsername();
    }, [email, username, password]);

    async function checkValidity(email = '', user = '', pass = '') {
        if (email) {
            // Regular expression pattern for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Test the email against the regular expression
            if (!emailRegex.test(email)) {
                return { isValid: false, errorMessage: 'Invalid email format' };
            }
        }

        if (user) {
            try {
                // Await the response of the fetch call
                const response = await fetch('http://127.0.0.1:5000/api/v1/users');

                // Check if the response is ok
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }

                const data = await response.json();

                const hasPersonWithUser = data.some(item => item.username === user);
                if (hasPersonWithUser) {
                    setUserColor(false);
                    return { isValid: false, errorMessage: 'Username already exists' };
                } else {
                    setUserColor(true);
                }

            } catch (error) {
                // Handle any errors that occurred during the fetch
                console.error('error fetching:', error);
            }
        } else {
            setUserColor(false);
        }

        if (pass) {
            if (pass.length < 8) {
                setPassColor(false);
                return { isValid: false, errorMessage: 'Password must be at least 8 characters long' };
            } else {
                setPassColor(true);
            }
        } else {
            setPassColor(false);
        }
        setWarning('')
        return { isValid: true, errorMessage: '' };
    }

    const handleSubmit = async (e, response) => {
        e.preventDefault();
        if (typeof response === 'string') {
            if (!isValid) {
                return setWarning(errorMessage)
            }
            var userObject = JSON.parse(response);
        }

        setUser(userObject);

        try {
            await signUp(userObject);
            alert('Logged in successfully');
        } catch (err) {
            alert('Failed to log in');
        }
    };

    const handleGoogleCallback = async (response) => {
        try {
            const userObject = jwtDecode(response.credential)
            await signUp(userObject);
            alert('Logged in with Google successfully');
        } catch (err) {
            alert('Failed to log in with Google');
        }
    };

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={
                (e) => handleSubmit(e, JSON.stringify({ "email": email, "username": username, "password": password }))
            }>
                <div className="input-group">
                    <label htmlFor="username">Email (optional)</label>
                    <input type="text" id="email" name="email"
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                    <label htmlFor="username" style={{ color: userColor ? 'lightgreen' : '' }}>Username *</label>
                    <input type="text" id="username" name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="input-group">
                    <label htmlFor="password" style={{ color: passColor ? 'lightgreen' : '' }}>Password *</label>
                    <input type="password" id="password" name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <a href="#" className="have_acc">
                    Already have an account? <span style={{ textDecoration: 'underline', color: 'blue' }}>Log in here</span>
                </a>
                <p className='warning'>{warning}</p>
                <button className="login" type="submit">Sign Up</button>
                <div id="signInDiv" className='googlebutton'></div>
                {/* <a href="#" className="reset_pass">Forgot your password?</a> */}
            </form>
        </div >
    );
}

export default SignUp;