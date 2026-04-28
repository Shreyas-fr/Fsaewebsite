import { useEffect, useState } from 'react';

const SpeedLines = () => {
    const [lines, setLines] = useState<{ id: number; top: string; duration: string; delay: string }[]>([]);

    useEffect(() => {
        const newLines = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            duration: `${0.5 + Math.random() * 1}s`,
            delay: `${Math.random() * 2}s`,
        }));
        setLines(newLines);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {lines.map((line) => (
                <div
                    key={line.id}
                    className="speed-line"
                    style={{
                        top: line.top,
                        width: '200px',
                        animationDuration: line.duration,
                        animationDelay: line.delay,
                    }}
                />
            ))}
        </div>
    );
};

export default SpeedLines;
