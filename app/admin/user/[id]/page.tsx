import { getUser } from "@/app/db/user";
import { notFound } from "next/navigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import Header from "../../_components/Header";
import { getUserPagePaths } from "@/app/utils/paths";
import UserRole from "./UserRole";
import { LightningBoltIcon, RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";


interface UserProps {
    params: { id: string };
};

const UserPage = async ({ params }: UserProps) => {
    const user = await getUser(params.id);

    if (!user) notFound();

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={getUserPagePaths(user.id)} />
                    <Header
                        title={user.name}
                        description='Administer bruker'
                    />
                </div>
                <UserRole user={user} />
            </HeaderWrapper>

            <div className='grid grid-cols-2 gap-8'>
                <div className='border border-gray-300 rounded-md p-4'>
                    <div className='flex items-center space-x-4 pb-6'>
                        <RocketIcon className='w-6 h-6 text-tihlde-500' />
                        <h1 className='text-2xl font-bold'>
                            Produkter
                        </h1>
                    </div>
                    <p className='text-gray-500 pb-6'>
                        Oversikt over alle transaksjoner relatert til produkter
                    </p>
                    <Link
                        href={`/admin/user/${user.id}/products`}
                        className='inline-block w-44 bg-gradient-to-br from-tihlde-500 to-tihlde-700 text-white hover:from-tihlde-600 hover:to-tihlde-700 transition duration-150 ease-in-out rounded-md py-2'
                    >
                        <h1
                            className='text-center font-semibold'
                        >
                            Se mer
                        </h1>
                    </Link>
                </div>  

                <div className='border border-gray-300 rounded-md p-4'>
                    <div className='flex items-center space-x-4 pb-6'>
                        <LightningBoltIcon className='w-6 h-6 text-tihlde-500' />
                        <h1 className='text-2xl font-bold'>
                            Arrangementer
                        </h1>
                    </div>
                    <p className='text-gray-500 pb-6'>
                        Oversikt over alle transaksjoner relatert til arrangementer
                    </p>
                    <Link
                        href={`/admin/user/${user.id}/events`}
                        className='inline-block w-44 bg-gradient-to-br from-tihlde-500 to-tihlde-700 text-white hover:from-tihlde-600 hover:to-tihlde-700 transition duration-150 ease-in-out rounded-md py-2'
                    >
                        <h1
                            className='text-center font-semibold'
                        >
                            Se mer
                        </h1>
                    </Link>
                </div>         
            </div>
        </Template>
    );
};


export default UserPage;