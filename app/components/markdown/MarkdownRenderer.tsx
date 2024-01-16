import ReactMarkdown from 'react-markdown';


interface MarkdownRendererProps {
    value: string;
};

const MarkdownRenderer = ({ value }: MarkdownRendererProps) => {
    return (
        <ReactMarkdown
            className='w-full prose'
        >
            { value }
        </ReactMarkdown>
    );
};


export default MarkdownRenderer;