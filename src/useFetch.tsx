import { useState, useEffect } from 'react';

interface UseFetchResult {
    data: any | null;
    isPending: boolean;
    error: any | null;
}

/**
 * За счёт этой фунции мы просто получаем данные
 */
const useFetch = (url: any): UseFetchResult => {
    const [data, setData] = useState<any | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);


    useEffect(() => {
        setTimeout(() => {
            // Запрашиваем файл
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Error fetching users data');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                });
        }, 1000);
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;