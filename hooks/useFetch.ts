import { useState, useEffect, useCallback } from "react";
import { axiosWrapper } from "@/services/axiosWrapper";


export const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axiosWrapper(url);
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.error || 'Something went wrong');
            }
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, loading, refetch: fetchData };
}

