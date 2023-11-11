import React, { useState, useEffect } from 'react';
import { elapsedTimeState, isRunningState } from '../recoil/Atom';
import { useRecoilState } from 'recoil';

interface TimerProps {
    onTimeChange: (time: number) => void;
}
const Timer: React.FC<TimerProps> = ({ onTimeChange }) => {
    const [elapsedTime, setElapsedTime] = useRecoilState(elapsedTimeState);
    useEffect(() => {
        onTimeChange(elapsedTime);
    }, [elapsedTime])
    useEffect(() => {
        const interval = setInterval(() => {
            const nextElapsedTime = elapsedTime + 10;
            setElapsedTime(nextElapsedTime);
        }, 10);
        return () => clearInterval(interval);
    }, [elapsedTime])
    return (
        <p>{Math.floor(elapsedTime / (1000 * 60 * 60))}:{Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((elapsedTime % (1000 * 60)) / 1000)}:{elapsedTime % 1000}</p>
    )
}

export default Timer;