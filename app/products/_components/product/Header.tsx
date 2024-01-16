

const ProductHeader = ({ header }: { header: string }) => {
    return (
        <h1 className='text-3xl font-extrabold'>
            { header }
        </h1>
    );
};


export default ProductHeader;