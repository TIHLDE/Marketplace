'use client';

import * as RadixSeparator from '@radix-ui/react-separator';


interface SeparatorProps {
    orientation: 'horizontal' | 'vertical';
};

const Separator = ({ orientation }: SeparatorProps) => {

    if (orientation === 'vertical') {
        return (
            <RadixSeparator.Root 
                orientation={orientation}
                className='w-[1px] h-full bg-gray-300'
            />
        
        );
    }

    return (
        <RadixSeparator.Root 
            orientation={orientation}
            className='w-full h-[1px] bg-gray-300'
        />
    );
};


export default Separator;