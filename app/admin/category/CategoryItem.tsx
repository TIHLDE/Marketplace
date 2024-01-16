import EditButton from "@/app/components/buttons/Edit";


interface CategoryItemProps {
    id: string,
    name: string,
    description: string
};

const CategoryItem = ({id, name, description}: CategoryItemProps) => {
    return (
        <div className='max-w-sm w-full bg-white border border-gray-200 rounded-md px-3 py-2'>
            <div className='flex justify-between pb-4'>
                <div>
                    <h1 className='font-bold text-xl'>
                        { name }
                    </h1>
                </div>
                <EditButton 
                    name='Rediger'
                    href={`/admin/category/${id}`}
                />
            </div>
            <div>
                <p>
                    { description }
                </p>
            </div>
        </div>
    );
};


export default CategoryItem;