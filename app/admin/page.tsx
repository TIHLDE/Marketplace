import { LightningBoltIcon, ReaderIcon, RocketIcon } from "@radix-ui/react-icons";
import Template from "./_components/Template";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const Admin = () => {
    const stats = [
        // {
        //     title: 'Produkter',
        //     description: 'Oversikt over alle solgte produkter',
        //     icon: <RocketIcon className='w-6 h-6 text-tihlde-500' />,
        //     href: '/admin/stats/products'
        // },
        {
            title: 'Arrangementer',
            description: 'Oversikt over alle betalte arrangementer',
            icon: <LightningBoltIcon className='w-6 h-6 text-tihlde-500' />,
            href: '/admin/stats/events'
        },
        // {
        //     title: 'Produkttransaksjoner',
        //     description: 'Oversikt over alle transaksjoner for produkter',
        //     icon: <ReaderIcon className='w-6 h-6 text-tihlde-500' />,
        //     href: '/admin/stats/products/transactions'
        // }
    ];


    return (
        <Template>
            <div className='grid grid-cols-2 gap-8'>
                {stats.map((stat, index) => (
                    <StatNavigation
                        key={index}
                        title={stat.title}
                        description={stat.description}
                        icon={stat.icon}
                        href={stat.href}
                    />
                ))}
            </div>
        </Template>
    );
};

interface StatNavigationProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
};

const StatNavigation = ({
    title,
    description,
    icon,
    href
}: StatNavigationProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    { title }
                </CardTitle>
                <CardDescription>
                    { description }
                </CardDescription>
                <CardContent className='p-0 pt-4'>
                    <Link
                        href={href}
                        legacyBehavior
                        passHref
                    >
                        <Button>
                            Se mer
                        </Button>
                    </Link>
                </CardContent>
            </CardHeader>
        </Card>
    );
    // return (
    //     <div className='p-4 rounded-md border border-gray-300 bg-white'>
    //         <div className='flex items-center space-x-4 pb-6'>
    //             { icon }
    //             <h1 className='text-2xl font-bold'>
    //                 { title }
    //             </h1>
    //         </div>
    //         <p className='text-gray-500 pb-6'>
    //             { description }
    //         </p>
    //         <Link
    //             href={href}
    //             className='inline-block w-44 bg-gradient-to-br from-tihlde-500 to-tihlde-700 text-white hover:from-tihlde-600 hover:to-tihlde-700 transition duration-150 ease-in-out rounded-md py-2'
    //         >
    //             <h1
    //                 className='text-center font-semibold'
    //             >
    //                 Se mer
    //             </h1>
    //         </Link>
    //     </div>
    // );
};

export default Admin;