import React, { useState, useEffect, useRef } from 'react';
import { elapsedTimeState, isRunningState } from '../recoil/Atom';
import { useRecoilState, useResetRecoilState } from 'recoil';

const Timer = () => {
    const [elapsedTime, setElapsedTime] = useRecoilState(elapsedTimeState);
    const intervalRef = useRef(0);
    useEffect(() => {
        clearInterval(intervalRef.current)
        intervalRef.current = window.setInterval(() => {
            const nextElapsedTime = elapsedTime + 10;
            setElapsedTime(nextElapsedTime);
        }, 10)
    }, [elapsedTime]);
    return (
        <p>{Math.floor(elapsedTime / (1000 * 60 * 60))}:{Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((elapsedTime % (1000 * 60)) / 1000)}:{elapsedTime % 1000}</p>
    )
}

export default Timer;