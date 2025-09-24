import axios from 'axios';


export const axiosWrapper = async (url :string) => {
    try {
        const response = await axios.get(url);
        return {success: true, data: response.data}
    } catch (error: any) {
        return {success: false, error: error.message || 'An error occurred'}
        
    }
}