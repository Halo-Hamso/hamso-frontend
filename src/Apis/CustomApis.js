import axios from 'axios';
const API = process.env.REACT_APP_API;

export const visitInfoApi = (visitInfo) => {
  const { memberId, ...anotherVisitInfo } = visitInfo;

  return axios.post(
    `${API}/account-book/account-info/${memberId}`,
    anotherVisitInfo,
    {
      headers: { withCredentials: true },
    }
  );
};
