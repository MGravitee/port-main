import { FC, useState, useEffect } from "react";
import { motion } from "framer-motion";

const Cursor: FC = () => {
    const [cursorPosition, setCursorPosition] = useState<{
        x: number;
        y: number;
    }>({
        x: 0,
        y: 0,
    });
    const [haloPosition, setHaloPosition] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const [isHovered, setIsHovered] = useState(false); // Tracking the hover state (hovering links and buttons) to show the cursor halo
    const [isVisible, setIsVisible] = useState(true); // Hide the dot cursor on mobile

    // Set the cursor and halo positions on mouse move
    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setCursorPosition({
                x: e.clientX - 8, // subtract the radius
                y: e.clientY - 8,
            });

            setHaloPosition({
                x: e.clientX - 20, // subtract the radius
                y: e.clientY - 20,
            });

            setIsVisible(true);
        };

        const touchStart = () => {
            // Hide cursor shortly after touch begins. Normally, the dot cursor will linger where the touch was
            setTimeout(() => setIsVisible(false), 200);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("touchstart", touchStart);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("touchstart", touchStart);
        };
    }, []);

    // Add event listeners on links and buttons to set a hover state on mouseover/mouseout
    // This creates the effect where the halo only shows on hover state
    useEffect(() => {
        const handleMouseOver = (e: Event) => {
            if ((e.target as Element).closest("a, button")) {
                setIsHovered(true);
            }
        };

        const handleMouseOut = (e: Event) => {
            if ((e.target as Element).closest("a, button")) {
                setIsHovered(false);
            }
        };

        const handleMouseClick = (e: Event) => {
            if ((e.target as Element).closest("a, button")) {
                setIsHovered(false);
            }
        };

        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("click", handleMouseClick);

        return () => {
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("click", handleMouseClick);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <>
                    <motion.div
                        className="cursor-dot no-motion-2"
                        style={{
                            translateX: cursorPosition.x,
                            translateY: cursorPosition.y,
                        }}
                    />
                    <motion.div
                        className={`circle  ${isHovered ? "hovered" : ""} no-motion-2`}
                        style={{
                            translateX: haloPosition.x,
                            translateY: haloPosition.y,
                        }}
                    />
                </>
            )}
        </>
    );
};

export default Cursor;
