import axiosInstance from './service/config';

const fetch = async (options) => {
  try {
    const data = await axiosInstance({ ...options });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetch;
