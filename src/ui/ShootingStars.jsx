"use client";;
import { twMerge } from "tailwind-merge";
import React, { useEffect, useState, useRef } from "react";

const getRandomStartPoint = () => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
        case 0:
            return { x: offset, y: 0, angle: 45 };
        case 1:
            return { x: window.innerWidth, y: offset, angle: 135 };
        case 2:
            return { x: offset, y: window.innerHeight, angle: 225 };
        case 3:
            return { x: 0, y: offset, angle: 315 };
        default:
            return { x: 0, y: 0, angle: 45 };
    }
};
export const ShootingStars = ({
    minSpeed = 10,
    maxSpeed = 30,
    minDelay = 1000,
    maxDelay = 1100,
    starColor = "black",
    trailColor = "#22D3EE",
    starWidth = 10,
    starHeight = 1,
    className,
}) => {
    const [star, setStar] = useState([]);
    const svgRef = useRef(null);

    useEffect(() => {
        const createStar = () => {
            const { x, y, angle } = getRandomStartPoint();
            const newStar = {
                id: Date.now() + Math.random(),
                x,
                y,
                angle,
                scale: 1,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                distance: 0,
            };

            setStar(prev => [...prev, newStar]);

            const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
            setTimeout(createStar, randomDelay);
        };
        createStar();

        return () => { };
    }, [minSpeed, maxSpeed, minDelay, maxDelay]);

    useEffect(() => {
        const moveStars = () => {
            setStar((prevStars) =>
                prevStars
                    .map((star) => {
                        const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
                        const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
                        const newDistance = star.distance + star.speed;
                        const newScale = 1 + newDistance / 100;

                        if (
                            newX < -50 || newX > window.innerWidth + 50 ||
                            newY < -50 || newY > window.innerHeight + 50
                        ) return null;

                        return {
                            ...star,
                            x: newX,
                            y: newY,
                            distance: newDistance,
                            scale: newScale,
                        };
                    })
                    .filter(Boolean) // Remove null (off-screen stars)
            );

            requestAnimationFrame(moveStars);
        };

        const frameId = requestAnimationFrame(moveStars);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <svg ref={svgRef} className={twMerge("w-full h-full absolute inset-0", className)}>
            {star.map((star) => (
                <rect
                    key={star.id}
                    x={star.x}
                    y={star.y}
                    width={starWidth * star.scale}
                    height={starHeight}
                    fill="url(#gradient)"
                    transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
                />
            ))}
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
                    <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
    );
};
