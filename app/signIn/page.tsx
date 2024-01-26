import { getServerSession } from "next-auth";
import SignInForm from "./_components/SignInForm";
import authOptions from "../auth/authOptions";
import { redirect } from "next/navigation";


export interface SignInPageProps {
    searchParams: { 
        error?: string;
        callbackUrl?: string; 
    }
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
    const session = await getServerSession(authOptions);

    if (session) redirect(searchParams.callbackUrl || '/');

    return (
        <div className='max-w-lg w-full mx-auto py-20'>
            <SignInForm searchParams={searchParams} />
        </div>
    );
};


export default SignInPage;