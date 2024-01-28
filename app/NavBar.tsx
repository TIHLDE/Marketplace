import Link from "next/link";
import Header from "./components/header/Index";


const NavBar = () => {
    return (
        <nav className='hidden lg:max-w-screen-2xl w-full mx-auto md:flex items-center justify-between px-12 py-4 border-b border-b-gray-300 bg-white'>
            <div className='flex items-center space-x-8'>
                <Link href='/'>
                    <img
                        className='w-36 hover:cursor-pointer' 
                        src='/logo.png' 
                        alt='Logo' 
                    />
                </Link>
            </div>
            <Header />
        </nav>
    ); 
};


export default NavBar;