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

export const businessImageApi = (image) => {
  console.log(image);
  const formDataImg = new FormData();
  formDataImg.append('image', image);
  return axios.post(`${API}/bill/image`, formDataImg, {
    headers: { 'Content-Type': 'multipart/form-data' },
    Authorization: 'Bearer a3wegwfe',
  });
};

export const ChartApi = async (info) => {
  return await axios.get(
    `${API}/account-book/chart`,
    { params: info },
    {
      headers: {},
    }
  );
};
