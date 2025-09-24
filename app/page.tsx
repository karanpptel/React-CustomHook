"use client";

import React, { use, useCallback, useState } from "react"
import UserList from "@/components/UserList"
import Counter from "@/components/Counter"
import { useFetch } from "@/hooks/useFetch"

export default function Home() {

  const {data, error, loading, refetch} = useFetch('https://api.github.com/users')

  const [count, setCount] = useState (0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

 return (
  <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100 gap-6"> 
      <h1 className="text-3xl font-bold text-purple-950 mb-6">GitHub Users with useFetch Hook</h1>

      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      {loading && <p className="mb-4">Loading...</p>}

     
      {data && (
        <UserList users={data} loading={loading} onRefetch={refetch} />
      )}

       <Counter count={count} onIncrement={increment}  />
  </main>
 )
}
