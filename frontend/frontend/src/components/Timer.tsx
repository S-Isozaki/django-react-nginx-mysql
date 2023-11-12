import React, { useState, useEffect, useRef } from 'react';
import { elapsedTimeState, isRunningState } from '../recoil/Atom';
import { useRecoilState } from 'recoil';

interface TimerProps {
    onTimeChange: (time: number) => void;
}
const Timer: React.FC<TimerProps> = ({ onTimeChange }) => {
    const [elapsedTime, setElapsedTime] = useRecoilState(elapsedTimeState);
    const [isRunning, setIsRunning] = useRecoilState(isRunningState);
    const intervalRef = useRef(0);
    useEffect(() => {
        onTimeChange(elapsedTime);
    }, [elapsedTime])
    clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(() => {
        const nextElapsedTime = elapsedTime + 10;
        setElapsedTime(nextElapsedTime);
    }, 10)
    if(!isRunning) clearInterval(intervalRef.current);
    return (
        <p>{Math.floor(elapsedTime / (1000 * 60 * 60))}:{Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((elapsedTime % (1000 * 60)) / 1000)}:{elapsedTime % 1000}</p>
    )
}

export default Timer;