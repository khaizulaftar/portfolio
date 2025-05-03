import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function CursorFollower() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 80, damping: 40 })
    const springY = useSpring(y, { stiffness: 80, damping: 40 })

    useEffect(() => {
        const move = (e) => {
            x.set(e.clientX - 25)
            y.set(e.clientY - 25)
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-10 h-10 bg-white/20 rounded-full z-50 pointer-events-none backdrop-hue-rotate-90"
            style={{
                translateX: springX,
                translateY: springY,

            }}
        />

    )
}