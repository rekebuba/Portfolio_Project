import axios from 'axios';

export const saveScore = async (user_id, score) => {
    try {
        await axios.post(`http://localhost:5000/api/v1/user/score/${user_id}`, score);
    } catch (error) {
        console.error('Error saving score:', error);
        throw error;
    }
};

export const getScore = async (user_id) => {
    try {
        const result = await axios.get(`http://localhost:5000/api/v1/user/score/${user_id}`);
        return result.data;
    } catch (error) {
        console.error('Error getting score:', error);
        throw error;
    }
};

export const getPage = async () => {
    try {
        const result = await axios.get(`http://localhost:5000/api/v1/paragraph/pages`);
        return result.data;
    } catch (error) {
        console.error('Error getting score:', error);
        throw error;
    }
}
