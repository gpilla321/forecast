import { useState, useEffect } from 'react';
import { KeyValuePair } from '../type';

interface FetchDataResult<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    fetchData: (encodedParams: string) => Promise<void>;
}

function useFetchData<T>(url: string): FetchDataResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async (encodedParams: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}?${encodedParams}`);
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData: T = await response.json();
            console.log('jsonData', jsonData)
            setData(jsonData);
            setIsLoading(false);
        } catch (err) {
            setError(err as any);
            setIsLoading(false);
        }
    }

    return { data, isLoading, error, fetchData };
}

export default useFetchData;
