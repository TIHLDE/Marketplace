'use client';

import FileInput from '@/app/components/inputs/FileInput';
import NumberInput from '@/app/components/inputs/NumberInput';
import Select from '@/app/components/inputs/Select';
import Switch from '@/app/components/inputs/Switch';
import TextBoxInput from '@/app/components/inputs/TextBoxInput';
import TextInput from '@/app/components/inputs/TextInput';
import * as Form from '@radix-ui/react-form';

import { useEffect, useRef, useState } from "react";

import ProductShowcase, { ProductShowcaseInterface } from './ProductShowcase';
import { useFormState } from 'react-dom';
import TextSeparator from '@/app/components/ui/TextSeparator';
import { Discount, Image, ProductCategory, Size } from '@prisma/client';
import ShowGallery from './_gallery/Show';
import ImageListing from './_gallery/Images';
import addProduct from '@/app/actions/create-product';
import SubmitButton from '@/app/components/buttons/Submit';
import { ProductWithImages } from '@/app/db/product';
import editProduct from '@/app/actions/update-product';
import { toast } from 'react-toastify';
import { PlusIcon } from '@radix-ui/react-icons';
import SizeListing, { SizeListItem } from './_components/Sizes';
import MarkdownGuide from '@/app/components/markdown/MarkdownGuide';
import { allSellers } from '@/app/utils/seller';


interface ProductFormProps {
    sizes: Size[];
    categories: ProductCategory[];
    discounts: Discount[];
    product?: ProductWithImages;
};

const initialShowcaseState = {
    name: '',
    description: '',
    price: 0,
    total_stock: 0,
    category: undefined,
    sizes: [],
    discount: undefined,
    preOrder: false,
    images: []
};

const initialState = {
    status: '',
    errors: undefined,
    form: {
        featured: false,
        preOrder: false,
        name: '',
        description: '',
        price: 0,
        total_stock: 0,
        seller: '',
        information: '',
        categoryId: '',
        sizes: [],
        discountId: '',
        images: []
    }

};

const ProductForm = ({ sizes, categories, product, discounts }: ProductFormProps) => {
    const [state, formAction] = useFormState(
        product ?  editProduct.bind(null, product.id) : addProduct,
        initialState
    );
    const [newSizes, setSizes] = useState<SizeListItem[]>([]);
    const [currentSize, setCurrentSize] = useState<{ size: string, stock: number }>({ size: sizes[0].id, stock: 0 });
    const [images, setImages] = useState<Image[]>([]);
    const [showCaseProduct, setShowCaseProduct] = useState<ProductShowcaseInterface>(
        product ? {
            name: product.name,
            description: product.description,
            price: product.price,
            total_stock: product.total_stock,
            category: categories.find(c => c.id === product.categoryId),
            information: product.information ? product.information : '',
            sizes: [],
            discount: discounts.find(d => d.id === product.discountId),
            preOrder: product.preOrder,
            images: product.images.map(i => i.image)
        } : initialShowcaseState
    );
    const formRef = useRef<HTMLFormElement>(null);

    const addSize = () => {
        const size = sizes.find(s => s.id === currentSize?.size);

        if (newSizes.length) {
            const currentSize = newSizes.find(s => s.size === size?.name);
            if (currentSize) return toast.error('Størrelsen er allerede lagt til');
        }

        if (!size) return;

        if (currentSize?.stock <= 0) return toast.error('Lagerbeholdning må være større enn 0');

        setSizes(prev => [...prev, { id: size.id, size: size.name, stock: currentSize?.stock }]);
    };

    useEffect(() => {
        const sizeInput = document.getElementById('sizeInput') as HTMLInputElement;

        if (!sizeInput) return;

        const sizeValues = newSizes.map(s => ({ sizeId: s.id, stock: s.stock }));
        sizeInput.value = JSON.stringify(sizeValues);
    }, [newSizes]);

    useEffect(() => { if (product?.images) setImages(product.images.map(i => i.image)); }, []);

    useEffect(() => {
        const imagesInput = document.getElementById('imagesInput') as HTMLInputElement;

        if (!imagesInput) return;

        const imageValues = images.map(image => image.id);
        imagesInput.value = JSON.stringify(imageValues);
        setShowCaseProduct(prev => ({ ...prev, images: [...images] }));
    }, [images]);

    useEffect(() => {
        if (state.status === 'success') {
            formRef.current?.reset();
            if (!product) setImages([]);
            toast.success('Produktet ble lagret');
        } else if (state.status === 'field-error') {
            toast.error('Fyll inn alle feltene');
        } else if (state.status === 'error') {
            toast.error('Noe gikk galt. Prøv igjen senere');
        }
    }, [state]);

    return (
        <Form.Root
            ref={formRef}
            action={formAction}
            className='w-full mx-auto'
        >  
        <div className='pb-12'>
            <div className='flex space-x-12 pb-12'>
                <div className='w-full space-y-6'>
                    <div className='flex items-center space-x-12'>
                        <Switch 
                            name='featured'
                            label='Fremhevet'
                            checked={product ? product.featured : false}
                        />

                        <Switch 
                            name='preOrder'
                            label='Forhåndsbestilling'
                            checked={product ? product.preOrder : false}
                            onChange={e => setShowCaseProduct(prev => ({ ...prev, preOrder: e.target.checked }))}
                        />
                    </div>

                    <TextInput 
                        name='name'
                        label='Navn'
                        required={true}
                        valueMissing='Skriv inn et navn'
                        defaultValue={product?.name}
                        onChange={e => setShowCaseProduct(prev => ({ ...prev, name: e.target.value }))}
                    />

                    <div className='space-y-1'>
                        <TextBoxInput 
                            name='description'
                            label='Beskrivelse'
                            required={true}
                            valueMissing='Skriv inn en beskrivelse'
                            defaultValue={product?.description}
                            onChange={e => setShowCaseProduct(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <MarkdownGuide />
                    </div>

                    <div className='flex items-center justify-between space-x-8'>
                        <NumberInput 
                            name='price'
                            label='Pris'
                            required={true}
                            valueMissing='Skriv inn en pris'
                            defaultValue={Number(product?.price)}
                            min={0}
                            onChange={e => setShowCaseProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                        />

                        <Select 
                            name='discountId'
                            label='Rabatt'
                            defaultValue={product?.discountId}
                            options={discounts.map(d => ({ key: d.id, value: `${d.name} - ${d.discount_percent}%` }))}
                            required={false}
                            onChange={e => setShowCaseProduct(prev => ({ ...prev, discount: discounts.find(d => d.id === e.target.value) }))}
                        />
                    </div>
                    
                    <div className='flex items-center justify-between space-x-8'>
                        <Select
                            name='categoryId'
                            label='Kategori'
                            defaultValue={product?.categoryId}
                            options={categories.map(c => ({ key: c.id, value: c.name }))}
                            onChange={e => setShowCaseProduct(prev => ({ ...prev, category: categories.find(c => c.id === e.target.value) }))}
                        />

                        <Select 
                            name='seller'
                            label='Ansvarlig selger'
                            defaultValue={product?.seller}
                            options={allSellers}
                            onChange={e => setShowCaseProduct(prev => ({ ...prev, seller: e.target.value }))}
                        />
                    </div>

                    <div>
                        <div className='pb-3 flex items-center justify-between'>
                            <h1 className='font-semibold'>
                                Størrelser (oppgi lagerbeholdning)
                            </h1>

                            <button 
                                onClick={addSize}
                                type='button'
                                className='flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-800'
                            >
                                <PlusIcon className='w-4 h-4' />
                                <span>
                                    Legg til
                                </span>
                            </button>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex items-center justify-between space-x-8'>
                                <select
                                    onChange={e => setCurrentSize(prev => ({ size: e.target.value, stock: prev?.stock || 0 }))}
                                    className='outline-none w-full border border-gray-300 bg-white rounded-md px-3 py-2'
                                >
                                    {sizes.map((size, index) => (
                                        <option key={index} value={size.id}>
                                            {size.name}
                                        </option>
                                    )
                                    )}
                                </select>

                                <input 
                                    className='outline-none w-full border border-gray-300 bg-white rounded-md px-3 py-2'
                                    type='number'
                                    required
                                    placeholder='100'
                                    onChange={e => setCurrentSize(prev => ({ size: prev?.size || '', stock: Number(e.target.value) }))}
                                />

                                <input 
                                    id='sizeInput'
                                    type='hidden' 
                                    name='sizes'
                                />
                            </div>

                            <SizeListing
                                sizes={newSizes}
                                setSizes={setSizes}
                            />
                        </div>
                    </div>
                </div>

                <div className='max-w-md w-full'>
                    <div className='space-y-4 pb-8'> 
                        <FileInput 
                            name='images'
                            setImages={setImages}
                            images={images}
                        />

                        <TextSeparator text='eller' />

                        <ShowGallery
                            images={images}
                            setImages={setImages}
                        />
                    </div>

                    {  images.length > 0 && (
                        <div className='space-y-2'>
                            <h1 className='font-semibold'>
                                Valgte bilder - dra for å endre rekkefølge
                            </h1>
                            <ImageListing images={images} setImages={setImages} />
                        </div>
                    )
                    }

                    <input 
                        id='imagesInput'
                        type="hidden"
                        name='images' 
                    />
                </div>
            </div>
            
            <div className='space-y-1'>
                <TextBoxInput 
                    name='information'
                    label='Ekstra informasjon'
                    description='Informasjon som vises på produktets side, som for eksempel hentedato og -sted, eller annen informasjon som er relevant for produktet.'
                    required={false}
                    valueMissing=''
                    defaultValue={product?.information ? product.information : ''}
                    onChange={e => setShowCaseProduct(prev => ({ ...prev, information: e.target.value }))}
                />
                <MarkdownGuide />
            </div>
        </div>
            <div className='space-x-4'>
                <SubmitButton 
                    idleText={product ? 'Oppdater produkt' : 'Opprett produkt'}
                    submittingText={product ? 'Lagrer...' : 'Oppretter...'}
                />
                <ProductShowcase 
                    product={showCaseProduct}
                />
            </div>
        </Form.Root>
    );
};


export default ProductForm;