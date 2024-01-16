

const vippsFee = (amount: number, orders: number): number => {
    const fee = 0.0249;
    const constantFee = 1;

    const totalFee = (amount * fee) + (orders * constantFee);

    return Math.floor(totalFee * 100) / 100;;
};


export default vippsFee;