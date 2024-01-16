'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState<string>('');

    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        params.set('search', query);
        router.push(`?${params.toString()}`);
    };

    const reset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        router.push(`?${params.toString()}`);
    };

    return (
        <div className='flex items-center space-x-2'>
            <form
                onSubmit={search}
                className='flex items-center space-x-2'
            >
                <input
                    required
                    type='text'
                    onChange={(e) => setQuery(e.target.value)}
                    className='focus:outline-none w-full px-2 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md'
                    placeholder='Søk...'
                />
                <button
                    className='rounded-md border border-gray-300 bg-gray-50 px-6 py-2 font-semibold'
                > 
                    Søk
                </button>
            </form>
            <button
                onClick={reset}
                className='rounded-md border border-gray-300 bg-gray-50 px-6 py-2 font-semibold'
            >
                Nullstill
            </button>
        </div>
    );
};


export default Search;