import axios from 'axios';
import { ERROR_MESSAGE } from '../constants/errorMessage';

export const fetchBreed = async (breed) => {
  try {
    const response = await axios.get('/api/dogs/fetch_image', {
      params: { breed },
    });
    return response.data.image_url;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error || ERROR_MESSAGE.DEFAULT_API_ERROR;
    alert(errorMessage);
  }
};