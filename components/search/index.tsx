'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";


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

    return (
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
    );
};

const QueryReset = () => {
    const router = useRouter();

    const handleReset = () => {
        const params = new URLSearchParams();
        router.push(`?${params.toString()}`);
    };
    
    return (
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
    );
};


interface QuerySelectProps {
    query: string;
    placeholder: string;
    options: {
        value: string;
        label: string;
    }[];
    className?: string;
};

const QuerySelect = ({
    query,
    placeholder,
    options,
    className
}: QuerySelectProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSelect = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');
        params.set(query, value);
        router.push(`?${params.toString()}`);
    };

    return (
        <Select
            onValueChange={value => handleSelect(value)}
        >
            <SelectTrigger
                className={cn('w-[100px] border-dashed', className)}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                { options.map((option, index) => (
                    <SelectItem
                        key={index}
                        value={option.value}
                    >
                        { option.label }
                    </SelectItem>
                )) }
            </SelectContent>
        </Select>
    );
};


export {
    SearchBar,
    QueryReset,
    QuerySelect
}