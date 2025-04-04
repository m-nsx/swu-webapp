import React, { useState } from "react";
import "./SusButton.css";

const SusButton = () => {
    const [position, setPosition] = useState({ top: "50%", left: "50%" });
    const [rotation, setRotation] = useState(0);

    const handleMouseEnter = () => {
        const randomTop = Math.random() * 80; // Between 10% and 90%
        const randomLeft = Math.random() * 80; // Between 10% and 90%
        const randomRotation = Math.random() * 360; // Random rotation
        setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
        setRotation(randomRotation);
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <button
                onMouseEnter={handleMouseEnter}
                style={{
                    position: "absolute",
                    top: position.top,
                    left: position.left,
                    transform: "translate(-50%, -50%)",
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        top: "-100px",
                        left: "-100px",
                        width: "calc(100% + 100px)",
                        height: "calc(100% + 100px)",
                        backgroundColor: "transparent",
                        pointerEvents: "none",
                    }}
                />
                SUS BUTTON
            </button>
        </div>
    );
};

export default SusButton;