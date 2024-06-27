import axios from 'axios';

export const saveScore = async (user_id, score) => {
    console.log(user_id)
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/user/score/${user_id}`, score);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error saving score:', error);
        throw error;
    }
};
