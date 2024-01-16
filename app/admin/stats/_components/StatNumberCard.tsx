

interface StatNumberCardProps {
    title: string;
    number: number;
    isAmount?: boolean;
};

const StatNumberCard = ({ title, number, isAmount }: StatNumberCardProps) => {
    return (
        <div className='border border-gray-300 rounded-md px-6 py-4'>
            <h1 className='pb-4'>
                { title }
            </h1>
            <h1 className='text-2xl font-bold'>
                { isAmount ? `kr ${number}` : number }
            </h1>
        </div>
    );
};


export default StatNumberCard;