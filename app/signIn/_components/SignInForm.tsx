'use client';

import { useEffect, useState } from "react";
import { SignInPageProps } from "../page";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";


const SignInForm = ({ searchParams }: SignInPageProps) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (searchParams.error) toast.error('Feil brukernavn eller passord');
    }, [searchParams.error]);

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        await signIn('credentials', {
            username,
            password,
            callbackUrl: '/'
        });
        setLoading(false);
    };

    return (
        <Card className='shadow-md py-4'>
            <CardHeader>
                <img src='/logo.png' alt='Logo' className='w-[200px] mx-auto' />
            </CardHeader>
            <CardContent className='max-w-md w-full mx-auto mt-6'>
                <form
                    className='space-y-4 pb-8'
                    onSubmit={submit}
                >
                    <div className='space-y-2'>
                        <Label>
                            Brukernavn
                        </Label>
                        <Input 
                            type='text'
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>
                    <div className='pb-4 space-y-2'>
                        <Label>
                            Passord
                        </Label>
                        <Input 
                            type='password'
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className='w-full'
                    >
                        Logg inn
                    </Button>
                </form>
                <Card className='flex items-center px-6'>
                    <InfoIcon className='w-8 h-8' />
                    <CardHeader>
                        <CardTitle className='text-md'>
                            Logg inn med TIHLDE
                        </CardTitle>
                        <CardDescription className='text-sm'>
                            Bruk ditt brukernavn og passord fra TIHLDE for å logge inn
                        </CardDescription>
                    </CardHeader>
                </Card>
            </CardContent>
        </Card>
    );
};


export default SignInForm;