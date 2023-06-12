import React, { useEffect, useState, useRef } from "react";

export default function Canvas() {
    const [position, setPosition] = useState({ x: 250, y: 250 });
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.fillStyle = "#000000";
        context.fillRect(position.x, position.y, 5, 5);
    }, [position]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setPosition({ x: 250, y: 250 })
    }

    useEffect(() => {
        const socket = new WebSocket("ws://192.168.68.134:5000");

        socket.onmessage = (event) => {
            const { x, y, z } = JSON.parse(event.data);
            const SPEED = 10;

            setPosition((prevPosition) => ({
                x: prevPosition.x - x * SPEED,
                y: prevPosition.y + y * SPEED,
            }));
        };

        return () => {
            socket.close(); // Zamknij połączenie przy odmontowaniu komponentu
        };
    }, []);

    return (
        <div style={{height: 500, width: 500}}>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                style={{ border: "2px solid black", borderRadius: 10 }}
            />
            <button onClick={clearCanvas}>Clear canvas</button>
        </div>
    );
}
