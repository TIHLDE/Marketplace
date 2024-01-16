

export const isEmptyObject = (obj: object): boolean => {
    return Object
        .values(obj)
        .filter(x => typeof x !== 'boolean')
        .every(x => 
            (
                x === null || 
                x === '' || 
                x === undefined || 
                x === 0 || 
                !x.length
            )
        );
};