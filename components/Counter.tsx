"use client";

import React from "react";

interface Props{
    count: number;
    onIncrement: () => void;
    //onDecrement: () => void;
}

const Counter: React.FC<Props> = ({count, onIncrement}) => {
    console.log("Child (Counter) re-rendered");

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-bold mb-4">
                 Counter Component
            </h2>
            <p className="mb-4">Count: {count}</p>
            <button onClick={onIncrement} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Increment
            </button>

        </div>
    )
    
}

export default React.memo(Counter); // 👈 prevents unnecessary re-renders