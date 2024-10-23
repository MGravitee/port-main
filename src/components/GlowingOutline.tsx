import { useState, useEffect } from "react";

import {
    motion,
    animate,
    useMotionTemplate,
    useMotionValue,
} from "framer-motion";

function GlowingOutline() {
    //animation code for glowing outline

    const turn = useMotionValue(0);

    useEffect(() => {
        animate(turn, 1, {
            ease: "linear",
            duration: 5,
            repeat: Infinity,
        });
    }, []);

    const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #c636d900 75%, #c636d9 100%)`;

    //IMPORTANT, don't forget to set position relative on whatever you want this glowing outline to work on
    return (
        <motion.div
            style={{
                backgroundImage,
            }}
            className="mask-with-browser-support absolute -inset-[3px] rounded-bl-lg rounded-tr-lg border border-transparent bg-origin-border"
        />
    );
}

export default GlowingOutline;
