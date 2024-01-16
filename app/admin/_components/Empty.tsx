

interface EmptyProps {
    text: string;
    size?: number;
};

const Empty = ({ text, size=60 }: EmptyProps) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='space-y-6'>
                <div>
                    <img
                        className={`w-${size}`} 
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