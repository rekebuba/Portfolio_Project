import React, { useState } from 'react';
import logoName from './images/logoName.png';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';


function Header({ username, userId, userPicture }) {
    const [showOptions, setShowOptions] = useState(false);
    const { logout } = useAuth()
    const navigate = useNavigate();

    const signUpPage = () => {
        navigate('/signup');
    };

    const dashboardPage = () => {
        navigate('/dashboard');
    }

    const loginPage = () => {
        navigate('/login');
        window.location.reload();
    };

    const toggleOption = () => {
        setShowOptions(!showOptions);
    }

    const testPage = (e) => {
        e.preventDefault();
        navigate('/test', { state: { username: username, userId: userId } })
    };

    function UserExists() {
        if (username || userPicture) {
            return (
                <div className='profile' onClick={toggleOption}>
                    {userPicture ?
                        <img src={userPicture} />
                        :
                        <h3>{username[0]}</h3>
                        }
                    {showOptions && <div className='dropdown'>
                        <ul>
                            <li onClick={handleLogout}>Log out</li>
                        </ul>
                    </div>}
                </div>
            )
        } else {
            return (
                <button className="sign-up" onClick={signUpPage}>Sign Up</button>
            )
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logged out successfully');
            loginPage();
        } catch (err) {
            alert('failed to Logged out');
        }
    }

    return (
        <header className='header'>
            <div onClick={dashboardPage}>
                <img src={logoName} className="site-name" alt="Site Logo" />
            </div>
            <nav>
                <a href="/dashboard">Practice</a>
                <a href="/test" onClick={testPage}>Test</a>
                {UserExists()}
            </nav>
        </header >
    );

}


export default Header;
