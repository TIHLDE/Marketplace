import Avatar from "@/app/components/header/Avatar";
import cn from "@/app/utils/cn";
import { ClassValue } from "clsx";


interface TableAvatarProps {
    name: string;
    url: string | null;
    className?: ClassValue;
};

const TableAvatar = ({ name, url, className }: TableAvatarProps) => {
    return (
        <th className={cn(`px-6 py-3`, className)}>
            <Avatar 
                name={name}
                url={url}
            />
        </th>
    );
};


export default TableAvatar;