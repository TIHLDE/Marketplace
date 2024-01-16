import Link from "next/link";
import Header from "./components/header/Index";
import { RocketIcon } from "@radix-ui/react-icons";


const NavBar = () => {
    return (
        <nav className='max-w-screen-2xl w-full mx-auto flex items-center justify-between px-12 py-4 border-b border-b-gray-300 bg-white'>
            <div className='flex items-center space-x-8'>
                <Link href='/'>
                    <img
                        className='w-36 hover:cursor-pointer' 
                        src='/logo.png' 
                        alt='Logo' 
                    />
                </Link>
                <Link 
                    href='/products'
                    className='text-tihlde text-sm hover:text-[#ff5050] flex items-center space-x-1'
                >
                    <RocketIcon />
                    <h1>
                        Produkter
                    </h1>
                </Link>
            </div>
            <Header />
        </nav>
    ); 
};


export default NavBar;