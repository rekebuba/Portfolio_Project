import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Dashbord = () => {
    const [userId, setUserId] = useState('');
    
    const handleInputChange = (e) => {
        setUserId(e.target.value);
    };

    const navigateToUserProfile = () => {
        history.push(`/user/${userId}`);
    };

    return (
        <div>
            <h1>Dashbord</h1>
            <input
                type="text"
                placeholder="Enter User ID"
                value={userId}
                onChange={handleInputChange}
            />
            <button onClick={navigateToUserProfile}>Go to User Profile</button>
        </div>
    );
};

// export default Dashbord;
