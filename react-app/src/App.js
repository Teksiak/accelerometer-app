import "./App.css";
import Canvas from "./components/Canvas";
import React, { useState, useEffect } from "react";

function App() {
    return (
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 20}}>
            <h1>Canvas</h1>
            <Canvas/>
        </div>
    );
}

export default App;
