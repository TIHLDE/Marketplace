import { Image } from "@prisma/client";


const ProductImage = ({ image }: { image: Image | undefined }) => {
    if (!image) {
        return (
            <div className='w-full h-full rounded-lg bg-gray-200 flex items-center justify-center'>
                <img 
                    src='/default-image.png'
                    className='w-8'
                />
            </div>
        );
    }

    return (
        <img
            src={image.url}
            className='w-full h-full object-cover rounded-lg'
        />
    );
};


export default ProductImage;