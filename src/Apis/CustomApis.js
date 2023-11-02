import axios from 'axios';
const API = process.env.REACT_APP_API;

export const visitInfoApi = (visitInfo) => {
  console.log();
  return axios.post(`${API}/account-book/account-info`, visitInfo, {
    headers: { withCredentials: true },
  });
};
