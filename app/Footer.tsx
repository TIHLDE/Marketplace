import { RocketIcon, VercelLogoIcon } from "@radix-ui/react-icons";


const Footer = () => {
    return (
        <footer className='lg:max-w-8xl w-full border-t border-gray-300 py-20 bg-white'>
            <div className='max-w-5xl w-full mx-auto md:flex justify-between'>
                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold px-6 pb-2 border-b border-gray-300 text-center text-tihlde'>
                        Kontakt
                    </h1>
                    <div className='space-y-1 text-center'>
                        <h1 className='text-lg font-bold text-tihlde'>
                            E-POST
                        </h1>
                        <h1>
                            hs@tihlde.org
                        </h1>
                    </div>
                </div>

                <div className='flex items-center space-x-2'>
                    <h1
                        className='text-tihlde'>
                        Laget med
                    </h1>
                    <RocketIcon className='text-[#ff5050]' />
                    <h1
                        className='text-tihlde'>
                        av
                    </h1>
                    <a 
                        href=''
                        className='text-[#ff5050] border-b border-[#ff5050] hover:text-tihlde hover:border-tihlde'
                    >
                        Mads Nylund
                    </a>
                </div>

                <div className='space-y-4'>
                    <h1 className='text-3xl font-bold px-6 pb-2 border-b border-gray-300 text-center text-tihlde'>
                        Samarbeid
                    </h1>
                    <div>
                        <a 
                            href="https://vercel.com"
                            className='flex items-center justify-center space-x-1 text-tihlde hover:text-[#ff5050]'
                        >
                            <VercelLogoIcon />
                            <h1 className='text-sm'>
                                Powered by Vercel
                            </h1>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;