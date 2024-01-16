import { Image } from '@prisma/client';
import * as Form from '@radix-ui/react-form';
import { CircleBackslashIcon, UploadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';


interface FileInputProps {
    name: string;
    setImages: Dispatch<SetStateAction<Image[]>>
    images: Image[];
};


const FileInput = ({
    name,
    setImages,
    images
}: FileInputProps) => {
    const [isLoading, setLoading] = useState<boolean>(false);

    const upload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (images.length >= 4) return;

        setLoading(true);
        
        try {
            const file = e.target.files?.[0];

            if (!file) return;
    
            const formData = new FormData();
            formData.append('file', file);
    
            const promise = axios.post('/api/files', formData);
            
            const res = await toast.promise(promise, {
                pending: 'Laster opp bilde...',
                success: 'Bilde lastet opp',
                error: 'Kunne ikke laste opp bilde'
            });

            setImages(prev => [...prev, res.data]);
        } catch (e) {
            toast.error('Kunne ikke laste opp bilde');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form.Field
            name={name}
        >
            <label
                htmlFor='dropzone-file'
                className={`${isLoading || images.length >= 4 ? 'cursor-auto' : 'cursor-pointer hover:bg-gray-100'} flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50`}
            >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    { !isLoading && images.length < 4 && (
                        <>
                            <UploadIcon 
                                className='w-8 h-8 text-gray-500 mb-2'
                            />
                            <p className='mb-2 text-sm text-gray-500'>
                                <span className='font-semibold'>Klikk for å laste opp</span> eller dra og slipp
                            </p>
                            <p className='text-xs text-gray-500'>
                                SVG, PNG, JPG eller GIF (MAX. 800x400px)
                            </p>
                        </>
                    )}

                    { !isLoading && images.length >= 4 && (
                        <>
                            <CircleBackslashIcon 
                                className='w-8 h-8 mb-2 text-red-500'
                            />
                            <p className='mb-2 text-sm text-gray-500'>
                                Du kan kun laste opp 4 bilder
                            </p>
                        </>
                      
                    ) }

                    { isLoading && (
                        <>
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-tihlde" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <p className='mt-2 text-sm text-gray-500'>
                                Laster opp bilde...
                            </p>
                        </>
                    ) }
                </div>
                <input
                    onChange={upload}
                    id='dropzone-file' 
                    type='file' 
                    className='hidden'
                    disabled={isLoading || images.length >= 4}
                />
            </label>
        </Form.Field>
    );
};


export default FileInput;