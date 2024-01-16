import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";


interface ProductsWrapperProps {
    header: string;
    subheader: string;
    href: string;
    children: React.ReactNode;
};

const ProductsWrapper = ({
    header,
    subheader,
    href,
    children
}: ProductsWrapperProps) => {
    return (
        <div className='max-w-6xl w-full mx-auto space-y-6'>
            <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                    <h1 className='text-2xl font-bold'>
                        { header }
                    </h1>
                    <p className='text-gray-500'>
                        { subheader }
                    </p>
                </div>

                <div>
                    <Link
                        href={href}
                        className='flex items-center space-x-2 text-tihlde-600 hover:text-tihlde-900'
                    >
                        <h1>
                            Se alle produkter
                        </h1>
                        <ArrowRightIcon />
                    </Link>
                </div>
            </div>

            <div>
                { children }
            </div>
        </div>
    );
};


export default ProductsWrapper;