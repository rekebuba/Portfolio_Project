import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashbord = () => {
    const [userId, setUserId] = useState('');
    
    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    return (
        <div>
            Welcome
            {/* <h1>Dashbord</h1>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={handleInputChange}
            />
            <button><Link to='/login'>Go to User Profile</Link></button> */}
        </div>
    );
};

export default Dashbord;
