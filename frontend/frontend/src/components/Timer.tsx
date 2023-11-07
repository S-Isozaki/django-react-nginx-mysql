import { useState, useEffect } from 'react';

const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(c => c + 10);
        }, 10);
        return () => clearInterval(interval);
    })
    return (
        <p>{Math.floor(elapsedTime / (1000 * 60 * 60))}:{Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))}:{Math.floor((elapsedTime % (1000 * 60)) / 1000)}:{elapsedTime % 1000}</p>
    )
}

export default Timer;