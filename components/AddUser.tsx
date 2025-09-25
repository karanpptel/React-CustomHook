"use client";

import { useState } from "react";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

interface AddUserProps {
    id? : number;
    name: string;
}

type MyMutationResult = UseMutationResult<any, Error, AddUserProps, unknown> & { isLoading: boolean };

const addUser = async(newUser: AddUserProps) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
    });
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    console.log("Response:", response);
    
    return response.json();
}

export default function AddUser() {
    const [name, setName] = useState("");
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: addUser,


        // Optimistic Update
        onMutate: async(newUser) => {
            await queryClient.cancelQueries({queryKey: ["users"]});

            const previousUsers = queryClient.getQueryData<AddUserProps[]>(["users"]);

            queryClient.setQueryData<AddUserProps[]>(["users"], (old = []) => [
                ...old,
                { id: Date.now(), name: newUser.name }, // Temporary ID
            ]);

            return { previousUsers };
        },


        // If error, roll back
        onError: (_error, _newUser, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData<AddUserProps[]>(["users"], context.previousUsers);
            }
        },

        // Sync with server after success
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ["users"]});
            // setName("");
        }
           // Invalidate users query to refetch
        // onSuccess: () => {
            
        //     queryClient.invalidateQueries({queryKey: ["users"]});
        //     setName("");
        // },
        
    
    });

    return (
        <div className="p-4 border rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-medium">Add user</h3>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" p-2 mr-2 border rounded-md"
                    placeholder="Enter user name"
                />

                <button
                    onClick={() => mutation.mutate({ name })}
                    disabled={(mutation as MyMutationResult).isLoading || !name.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {(mutation as MyMutationResult).isLoading ? "Adding..." : "Add User"}
                </button>
                {mutation.error instanceof Error && (
                    <p className="text-red-500 mt-2">{mutation.error.message}</p>
                )}
        </div>
    )
}