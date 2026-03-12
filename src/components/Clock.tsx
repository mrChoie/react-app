import { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
    // 1. Set up the interval to update state every 1000ms
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 2. IMPORTANT: Clean up the timer when the component unmounts
    // This prevents memory leaks!
    return () => clearInterval(timer);
    }, []);

    // 3. Format the time as HH:MM:SS
    const formattedTime = time.toLocaleTimeString('en-GB', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return <span className="p-2 font-monospace">
        {formattedTime}
    </span>
}

export default Clock;