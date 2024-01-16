import Separator from "./Separator";


interface TextSeparatorProps {
    text: string;
};

const TextSeparator = ({ text }: TextSeparatorProps) => {
    return (
        <div className='flex items-center justify-between space-x-4'>
            <Separator orientation='horizontal' />
            <h1>
                { text }
            </h1>
            <Separator orientation='horizontal' />
        </div>
    );
};


export default TextSeparator;