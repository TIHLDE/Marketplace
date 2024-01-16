

interface HeaderProps {
    title: string;
    description: string;

};

const Header = ({ title, description }: HeaderProps) => {
    return (
        <div className="max-w-md w-full space-y-3">
            <h1 className="font-extrabold text-4xl">
                { title }
            </h1>
            <p className="text-gray-500">
                { description }
            </p>
        </div>
    );
};


export default Header;