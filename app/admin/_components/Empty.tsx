import { cn } from "@/lib/utils";


interface EmptyProps {
    text: string;
    className?: string;
};

const Empty = ({ text, className }: EmptyProps) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='space-y-6'>
                <div>
                    <img
                        className={cn(`w-60`, className)} 
                        src='/empty.svg' 
                        alt='Tomt' 
                    />
                </div>
                <div>
                    <h1 className='text-center text-xl'>
                        { text }
                    </h1>
                </div>
            </div>
        </div>
    );
};


export default Empty;