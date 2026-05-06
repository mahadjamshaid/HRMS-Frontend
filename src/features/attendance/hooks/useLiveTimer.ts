import { useState, useEffect } from "react";

export const useLiveTimer = (checkInTime: string | null | undefined) => {
    const [elapsedMinutes, setElapsedMinutes] = useState(0);

    useEffect(() => {
        if (!checkInTime) {
            setElapsedMinutes(0);
            return;
        }

        const calculate = () => {
            const start = new Date(checkInTime).getTime();
            const now = Date.now();
            const diffMs = Math.max(0, now - start);
            setElapsedMinutes(Math.floor(diffMs / 60000));
        };

        calculate();
        const interval = setInterval(calculate, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [checkInTime]);

    const formatElapsed = () => {
        const h = Math.floor(elapsedMinutes / 60);
        const m = elapsedMinutes % 60;
        return `${h}h ${m}m`;
    };

    return { elapsedMinutes, formatElapsed };
};
