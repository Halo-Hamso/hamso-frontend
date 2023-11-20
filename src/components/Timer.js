import { useState, useEffect } from 'react';


function Timer(props){
    const [time, setTime] = useState(props.limitTime);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time === 0) {
            setIsTimeUp(true);
        }
    }, [time]);

    useEffect(() => {
        if (isTimeUp) {
            alert('인증번호 입력시간이 종료되었습니다.');
            props.setTimer(false);
        }
    }, [isTimeUp]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    return(
        <p className={props.className}>{formatTime(time)}</p>
    )
}

export default Timer;
