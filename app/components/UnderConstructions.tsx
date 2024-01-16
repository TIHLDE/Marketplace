

const UnderConstruction = () => {
    return (
        <div className='w-full flex items-center justify-center py-20'>
            <div className='space-y-12'>
                <img
                    className='max-w-xl' 
                    src='/construction.svg'
                />
                <h1 className='text-center text-xl font-semibold'>
                    Denne siden er under konstruksjon, og vil være tilgjengelig snart.
                </h1>
            </div>
        </div>
    );
};


export default UnderConstruction;