"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}

export default function GitHubUsers() {
    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 1000 * 60 // 1 minute
    });

    if (isLoading) {
        return <div className="text-center text-gray-500 mt-4">Loading...</div>;
    }

    if (error instanceof Error) {
        return <div className="text-red-500 text-center mt-4">Error: {error.message}</div>;
    }

    return (
        <div className="p-4 ">
            {/* <h1 className="text-2xl font-bold mb-2">Github Users</h1> */}
            <h1 className="text-2xl font-bold mb-2">Users List</h1>

            <button 
             onClick={() => refetch()}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
                Refetch Users
            </button>

            <ul className="space-y-2">
                {data.map((user: any) => (
                    <li key={user.id} className="border p-2 rounded">
                        {/* <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full inline-block mr-2" /> */}
                        {/* <span className="text-lg font-medium">{user.login}</span> */}
                        <span className="text-lg font-medium">{user.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}