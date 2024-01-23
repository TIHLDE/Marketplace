import { getUser } from "@/app/db/user";
import { notFound } from "next/navigation";
import Template from "../../_components/Template";
import HeaderWrapper from "../../_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import Header from "../../_components/Header";
import { getUserPagePaths } from "@/app/utils/paths";
import UserRole from "./UserRole";
import { convertRole } from "@/lib/utils";
import UserTranscationTable from "./UserTransactionTable";


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
                        description= {`Rolle: ${convertRole(user.role)}`}
                    />
                </div>
                <UserRole user={user} />
            </HeaderWrapper>

            <UserTranscationTable />
        </Template>
    );
};


export default UserPage;