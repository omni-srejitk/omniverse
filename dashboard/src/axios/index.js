import axios from 'axios';

export default axios.create({
  headers: {
    get: {
      Authorization: `Token ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
    },
  },
});
