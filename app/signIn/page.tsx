'use client';

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


interface SignInPageProps {
    searchParams: { error?: string }
};

const SignInPage = ({ searchParams }: SignInPageProps) => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (searchParams.error) toast.error('Feil brukernavn eller passord');
    }, [searchParams.error]);
    
    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await signIn('credentials', {
            username,
            password,
            callbackUrl: '/'
        });
    };

    return (
        <div className='max-w-5xl w-full mx-auto py-20'>
            <div className='border border-gray-300 rounded-md p-4 flex bg-white h-96'>
                <div className='h-full w-full bg-gradient-to-br from-tihlde-500 to-tihlde-700 rounded-md py-8 px-6'>
                    <h1 className='text-white font-extrabold text-4xl pb-8'>
                        Velkommen!
                    </h1>
                    <p className='text-white text-lg pb-6'>
                        For å kunne benytte deg av TIHLDE Marketplace sine tjenester må du være et medlem av TIHLDE.
                    </p>
                    <p className='text-white text-lg'>
                        Er du medlem av TIHLDE, men ikke fått bruker, kan du opprette bruker på <a className='underline' href='https://tihlde.org/ny-bruker'>tihlde.org</a>.
                    </p>
                </div>
                <div className='w-full flex items-center'>
                    <div className='px-12 w-full'>
                        <form 
                            onSubmit={submit}
                            className='w-full space-y-6 pb-4'
                        >
                            <div className='space-y-1'>
                                <label className='font-semibold'>
                                    Brukernavn
                                </label>
                                <input
                                    onChange={(event) => setUsername(event.target.value)}
                                    className='focus:outline-none rounded-md p-2 border border-gray-300 w-full' 
                                    type='text'
                                    placeholder='TIHLDE brukernavn' 
                                    required
                                />
                            </div>
                            <div className='space-y-1'>
                                <label className='font-semibold'>
                                    Passord
                                </label>
                                <input 
                                    onChange={(event) => setPassword(event.target.value)}
                                    className='focus:outline-none rounded-md p-2 border border-gray-300 w-full' 
                                    type='password'
                                    placeholder='********'
                                    required
                                />
                            </div>
                            <button className='w-full text-center py-3 rounded-md bg-gradient-to-br from-tihlde-500 to-tihlde-700 text-white hover:from-tihlde-600 hover:to-tihlde-700 font-semibold'>
                                Logg inn
                            </button>
                        </form>
                        <a 
                            className='text-tihlde-500 font-semibold hover:underline'
                            href="https://tihlde.org/glemt-passord"
                        >
                            Glemt passord?
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default SignInPage;