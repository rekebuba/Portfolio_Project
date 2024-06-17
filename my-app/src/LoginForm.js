import React from 'react';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const Dashboard = () => {
        navigate('/dashboard')
    };

    const { signUp } = useAuth();
    const [user, setUser] = useState({} || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    const handleSubmit = async (e, response) => {
        e.preventDefault();
        var userObject = JSON.parse(response);

        setUser(userObject);

        try {
            await signUp(userObject);
            alert('Logged in successfully');
            Dashboard();
        } catch (err) {
            alert('Failed to log in');
        }
    };

    const handleGoogleCallback = async (response) => {
        try {
            const userObject = jwtDecode(response.credential)
            await signUp(userObject);
            alert('Logged in with Google successfully');
            Dashboard();
        } catch (err) {
            alert('Failed to log in with Google');
        }
    };

    return (
        <div className="login-container">
            <h2>Log In</h2>
            <form onSubmit={
                (e) => handleSubmit(e, JSON.stringify({ "username": username, "password": password }))
            }>
                <div className="input-group">
                    <label htmlFor="username">Username *</label>
                    <input type="text" id="username" name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password *</label>
                    <input type="password" id="password" name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <Link to="/signup" className="have_acc">
                Don't have an account? <span style={{ textDecoration: 'underline', color: 'blue' }}>Sign Up</span>
                </Link>
                <p className='warning'>{warning}</p>
                <button className="login" type="submit">Log In</button>
                <div id="signInDiv" className='googlebutton'></div>
                {/* <a href="#" className="reset_pass">Forgot your password?</a> */}
            </form>
        </div >
    );
}

export default Login;
