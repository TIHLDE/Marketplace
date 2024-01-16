import { getProductWithFullInfo } from "@/app/db/product";
import { notFound } from "next/navigation";
import ProductImageDisplay from "../_components/product/Image";
import PathNavigation from "@/app/components/links/PathNavigation";
import { PRODUCT_VIEW_PAGE_PATHS } from "@/app/utils/paths";
import ProductHeader from "../_components/product/Header";
import ProductInfo from "../_components/product/Info";
import ProductPreOrder from "../_components/product/PreOrder";
import ProductDescription from "../_components/product/Description";
import AddToCart from "../_components/product/AddToCart";
import ImageSlider from "@/app/components/ImageSlider";
import MarkdownRenderer from "@/app/components/markdown/MarkdownRenderer";
import SELLER from "@/app/utils/seller";


interface ProductPageProps {
    params: { id: string }
};

const ProductPage = async ({ params }: ProductPageProps) => {
    const product = await getProductWithFullInfo(params.id);

    if (!product) notFound();

    return (
        <div className='py-20 px-12'>
            <div className='pb-12 border-b border-b-gray-300'>
                <div className='max-w-6xl w-full mx-auto flex justify-center space-x-32'>
                    <div className='max-w-xl w-full'>
                        <div className='space-y-4 pb-4'>
                            <PathNavigation paths={PRODUCT_VIEW_PAGE_PATHS} />
                            <ProductHeader header={product.name} />
                            <ProductInfo 
                                category={product.category!.name}
                                price={product.price}
                                preOrder={product.preOrder}
                                discount={product.discount?.discount_percent}
                            />
                            <ProductPreOrder preOrder={product.preOrder} />
                        </div>

                        <div className='pb-10'>
                            <MarkdownRenderer value={product.description} />
                        </div>             

                        <AddToCart product={product} />
                    </div>

                    <div className='max-w-lg w-full'>
                        <ImageSlider
                            className='h-96' 
                            images={product.images?.map(i => i.image)} 
                        />
                    </div>
                </div>
            </div>

            <div className='py-12 max-w-6xl w-full mx-auto'>
                <div className='flex items-baseline space-x-12'>
                    <div className='w-full border-r border-r-gray-300'>
                        { product.information && (
                            <MarkdownRenderer value={product.information} />
                        ) }

                        { !product.information && (
                            <h1 className='text-center text-lg'>
                                Dette produktet har ingen informasjon
                            </h1>
                        ) }
                    </div>

                    <div className='space-y-4 max-w-md w-full'>
                        <h1>
                            Ansvarlig selger: { SELLER.get(product.seller.toLowerCase()).name }
                        </h1>
                        <h1>
                            Kontaktinformasjon: { SELLER.get(product.seller.toLowerCase()).email }
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductPage;