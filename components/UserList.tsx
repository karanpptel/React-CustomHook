"use client";

import React from "react";

interface User {
    users: any[];
    loading: boolean;
    // error: string | null;
    onRefetch: () => void;
}

 const UserList: React.FC<User> = ({ users, loading, onRefetch }) => { 
    console.log("Child (UserList) re-rendered");

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl text-black font-bold mb-4">Github Users List</h2>
            <button
                onClick={onRefetch}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                {loading ? 'Loading...' : 'Refetch Users'}
            </button>

            <ul>
                {users.map((user: any) => (
                    <li key={user.id} className="py-1 border-b">
                        <a 
                            href={user.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {user.login}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
    
}

export default React.memo(UserList); // 👈 prevents unnecessary re-renders