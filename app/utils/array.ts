

const getRandomElement = (array: any[]): any => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};


export default getRandomElement;