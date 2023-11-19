import { useEffect, useState } from 'react';
import { businessImageApi } from '../Apis/CustomApis';

function BusinessHome() {
  const [preImg, setpreImg] = useState('');
  const [uploadImg, setUploadImg] = useState('');

  const handleImg = (e) => {
    const reader = new FileReader();
    setUploadImg(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setpreImg(reader.result);
    };
  };
  console.log(uploadImg);
  const handleSendImg = () => {
    businessImageApi(uploadImg)
      .then((res) => {
        alert('이미지 전송이 완료되었습니다.');
      })
      .catch((err) => {
        console.log('이미지 전송에 실패하였습니다.');
      });
  };
  return (
    <div>
      <img src={preImg}></img>
      <input type="file" onChange={handleImg}></input>
      <button onClick={handleSendImg}>이미지 전송</button>
    </div>
  );
}
export default BusinessHome;
