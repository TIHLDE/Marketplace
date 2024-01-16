

const getFallbackName = (name: string) => name?.split(' ')[0][0] + name?.split(' ').at(-1)?.at(0);


export default getFallbackName;