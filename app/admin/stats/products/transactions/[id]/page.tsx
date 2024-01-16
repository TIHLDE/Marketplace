import Header from "@/app/admin/_components/Header";
import Template from "@/app/admin/_components/Template";
import HeaderWrapper from "@/app/admin/_components/wrapper/Header";
import PathNavigation from "@/app/components/links/PathNavigation";
import { ProductFromPaymentOrder, getPaymentOrder } from "@/app/db/paymentOrder";
import { getProductTransactionEditPagePaths } from "@/app/utils/paths";
import { notFound } from "next/navigation";
import RevalidateOrderStatus from "./Revalidate";
import OrderStatus from "@/app/orders/products/_components/OrderStatus";
import Empty from "@/app/admin/_components/Empty";
import { OrderStatus as OrderStatusEnum } from "@/app/utils/enums";
import ProductImage from "@/app/components/product/Image";
import ProductPrice from "@/app/components/product/Price";
import TransactionHistory from "./History";
import { Size } from "@prisma/client";
import RefundPaymentOrder from "./Refund";
import CopyToClipboardButton from "@/app/components/buttons/Copy";


interface ProductTransactionPageProps {
    params: { id: string };
};

const ProductTransactionPage = async ({ params }: ProductTransactionPageProps) => {
    const transaction = await getPaymentOrder(params.id);

    if (!transaction) notFound();

    return (
        <Template>
            <HeaderWrapper>
                <div className='space-y-2'>
                    <PathNavigation paths={getProductTransactionEditPagePaths(transaction.id)} />
                    <Header 
                        title={`Transaksjon`}
                        description={`id: ${transaction.id}`}
                    />
                    <CopyToClipboardButton 
                        text='Kopier id'
                        copyText={transaction.id}
                        successText='Ordre id kopiert til utklippstavlen'
                        className='px-3 py-2 text-sm'
                    />
                </div>

                <div className='flex items-center space-x-2'>
                    { transaction.status ===  OrderStatusEnum.SALE && <RefundPaymentOrder id={transaction.id} /> }
                    <RevalidateOrderStatus id={transaction.id} />
                </div>
            </HeaderWrapper>

            <div className='flex space-x-12 items-baseline'>
                <div className='max-w-xl w-full space-y-6'>
                    <div className='flex items-center justify-between border-b border-b-gray-300 pb-4'>
                        <OrderStatus 
                            status={transaction.status}
                            className='text-md px-3 py-1' 
                        />

                        <div>
                            <h1>
                                <span className='font-semibold'>Beløp:</span> {transaction.total_price} NOK
                            </h1>
                        </div>
                    </div>

                    { transaction.products.length < 0 && <Empty text='Fant ingen produkter' /> }

                    <div className='space-y-4'>
                        { transaction.products.map((product, index) => (
                            <ProductItem 
                                key={index}
                                product={product.product.product}
                                count={product.product_count}
                                size={product.product.size}
                                border={index !== transaction.products.length - 1}
                            />
                        )) }
                    </div>
                </div>

                <TransactionHistory 
                    id={transaction.id} 
                    className='max-w-md'
                />
            </div>
        </Template>
    );
};

const ProductItem = ({ product, count, size, border }: { product: ProductFromPaymentOrder, count: number, size: Size, border: boolean }) => {    
    return (
        <div className={`w-full flex justify-between items-center ${border ? 'border-b border-b-gray-300 pb-4' : ''}`}>
            <div className='flex space-x-4 items-center'>
                <div className='w-28 h-20'>
                    <ProductImage image={product.images?.[0]?.image} />
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>
                        { product.name }
                    </h1>
                    <h1 className='text-sm'>
                        { product.category.name }
                    </h1>
                    <h1 className='text-sm'>
                        { size.name }
                    </h1>
                </div>
            </div>

            <div className='flex items-center space-x-2'>
                <h1>
                    { count } x
                </h1>
                <ProductPrice 
                    price={product.price}
                    discount_percent={product.discount?.discount_percent!}
                />
            </div>
        </div>
    );
};


export default ProductTransactionPage;