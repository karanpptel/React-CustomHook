"use client";

import React, { use, useCallback, useState } from "react"

// this all use example for useFetch custom hook
import UserList from "@/components/UserList"
import Counter from "@/components/Counter"
import { useFetch } from "@/hooks/useFetch"

// this is example for React Query
import GitHubUsers from "@/components/GitHubUsers"
import AddUser from "@/components/AddUser";

export default function Home() {

  // const {data, error, loading, refetch} = useFetch('https://api.github.com/users')

  // const [count, setCount] = useState (0);

  // const increment = useCallback(() => {
  //   setCount((prevState) => prevState   + 1);
  // }, []);

 return (
  <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black gap-6"> 
        {/* <h1 className="text-3xl font-bold text-white mb-6">GitHub Users with useFetch Hook</h1>

        {error && <p className="text-red-500 mb-4">Error: {error}</p>}
        {loading && <p className="mb-4">Loading...</p>}

        <Counter count={count} onIncrement={increment}  />
      
        {data && (
          <UserList users={data} loading={loading} onRefetch={refetch} />
        )} */}

      <h1 className="text-3xl font-bold text-white mb-6 mt-12">GitHub Users with React Query</h1>
      <GitHubUsers />
       <AddUser />

  </main>
 )
}
