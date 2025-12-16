import { useEffect, useRef } from 'react';
import { useBehavior } from '../context/BehaviorContext';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const { trackMouse } = useBehavior();

    useEffect(() => {
        const handleMouseMove = (e) => {
            trackMouse(e.clientX, e.clientY);

            gsap.to(cursorDotRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });

            gsap.to(cursorRingRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        };

        const handleMouseDown = () => {
            gsap.to([cursorDotRef.current, cursorRingRef.current], {
                scale: 0.8,
                duration: 0.1
            });
        };

        const handleMouseUp = () => {
            gsap.to([cursorDotRef.current, cursorRingRef.current], {
                scale: 1,
                duration: 0.1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [trackMouse]);

    return (
        <div id="cursor-tracker" className="custom-cursor">
            <div ref={cursorDotRef} className="cursor-dot"></div>
            <div ref={cursorRingRef} className="cursor-ring"></div>
        </div>
    );
};

export default CustomCursor;
