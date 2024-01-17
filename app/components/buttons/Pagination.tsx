import { Button } from "@/components/ui/button";


interface PaginationButtonProps {
    icon: React.ReactNode;
    disabled: boolean;
    page: number;
    changePage: (page: number) => void;
};

const PaginationButton = ({
    icon,
    disabled,
    page,
    changePage
}: PaginationButtonProps) => {
    return (
        <Button
            variant='link'
            onClick={() => changePage(page)}
            className='p-1'
        >
            { icon }
        </Button>
    );
    return (
        <button
            className={`${disabled ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'} px-3 py-1 rounded-md border border-gray-300`}
            disabled={disabled}
            onClick={() => changePage(page)}
        >
            { icon }
        </button>
    );
};


export default PaginationButton;