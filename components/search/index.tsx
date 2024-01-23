'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";


const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState<string>('');

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        params.set('search', query);
        router.push(`?${params.toString()}`);
    };

    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('search');
        params.set('page', '1');
        router.push(`?${params.toString()}`);
        setQuery('');
    };

    return (
        <div className='flex items-center space-x-2'>
            <form
                onSubmit={handleSearch}
                className='flex items-center space-x-2'
            >
                <Input 
                    required
                    type='text'
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Søk...'
                />
                <Button
                    className='w-28'
                >
                    Søk
                </Button>
            </form>
            <Button
                variant='ghost'
                onClick={handleReset}
                className='flex items-center space-x-2'
            >
                <p>
                    Nullstill
                </p>
                <XIcon className='w-4 h-4' />
            </Button>
        </div>
    );
};


export {
    SearchBar
}