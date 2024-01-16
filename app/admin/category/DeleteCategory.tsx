'use client';

import deleteCategory from "@/app/actions/delete-category";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import DeleteButton from "@/app/components/buttons/Delete";


const initialState = {
    status: '',
    errors: undefined
};

const DeleteCategory = ({ id }: { id: string }) => {
    const router = useRouter();
    const [state, formAction] = useFormState(deleteCategory.bind(null, id), initialState);

    useEffect(() => {
        if (state.status === 'success') {
            router.push('/admin/category/new');
            router.refresh();
        } else if (state.status === 'error') {
            console.log(state.errors);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <DeleteButton 
                idleText='Slett kategori'
                submittingText='Sletter...'
            />
        </form>
        // <AlertDialog.Root>
        //     <AlertDialog.Trigger>
        //         <DeleteButton />
        //     </AlertDialog.Trigger>

        //     <AlertDialog.Portal container={document.body}>
        //         <AlertDialog.Overlay className='fixed inset-0 bg-black opacity-30' />

        //         <AlertDialog.Content className='max-w-lg w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md px-8 py-4 border border-gray-200 shadow-md'>
        //             <AlertDialog.Title className='font-bold text-xl pb-4'>
        //                 Er du helt sikker?
        //             </AlertDialog.Title>

        //             <div className='flex items-center justify-end space-x-4'>
        //                 <AlertDialog.Cancel>
        //                     <button>
        //                         Avbryt
        //                     </button>
        //                 </AlertDialog.Cancel>
        //                 <AlertDialog.Action>
        //                     <form action={formAction}>
        //                         <DeleteButton />
        //                     </form>
        //                 </AlertDialog.Action>
        //             </div>
        //         </AlertDialog.Content>
        //     </AlertDialog.Portal>
        // </AlertDialog.Root>
    );
};


export default DeleteCategory;