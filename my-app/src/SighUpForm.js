import React from 'react'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isValid, setIsValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [userColor, setUserColor] = useState(false);
    const [passColor, setPassColor] = useState(false);

    const [warning, setWarning] = useState('');

    const navigate = useNavigate();

    const Dashboard = (userData) => {
        navigate('/dashboard', { state : { user: userData.data } });
    };

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

            if (!emailRegex.test(email)) {
                return { isValid: false, errorMessage: 'Invalid email format' };
            }
        }

        if (user) {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/v1/users');

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
        if (!isValid) {
            return setWarning(errorMessage)
        }

        try {
            const userData = await signUp(response);
            alert('Logged in successfully');
            Dashboard(userData);
        } catch (err) {
            alert('Failed to log in');
        }
    };

    const handleGoogleCallback = async (response) => {
        try {
            const userObject = jwtDecode(response.credential)
            const userData = await signUp(userObject);
            alert('Logged in with Google successfully');
            Dashboard(userData);
        } catch (err) {
            alert('Failed to log in with Google');
        }
    };

    return (
        <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={
                (e) => handleSubmit(e, { "email": email, "username": username, "password": password })
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
                <Link to="/login" className="have_acc">
                    Already have an account? <span style={{ textDecoration: 'underline', color: 'blue' }}>Log in here</span>
                </Link>
                <p className='warning'>{warning}</p>
                <button className="login" type="submit">Sign Up</button>
                <div id="signInDiv" className='googlebutton'></div>
            </form>
        </div >
    );
}

export default SignUp;
