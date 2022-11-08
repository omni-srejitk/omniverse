import axios from 'axios';

export default axios.create({
  headers: {
    common: {
      Authorization: `Token ${import.meta.env.VITE_AUTHORIZATION_TOKEN}`,
    },
  },
});
