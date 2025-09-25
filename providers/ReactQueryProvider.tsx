"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";


//Setup React Query Provider
export default function ReactQueryProvider({ children} : {children: ReactNode}) {

    //Prevents QueryClient from re-creating on every render
    const [queryClient] = useState(() => new QueryClient());


    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}