

interface Products {
    name: string;
    price: number;
    count: number;
};

export const getVippsToken = async () => {
    const tokenURL = process.env.VIPPS_TOKEN_URL

    const tokenHeaders = new Headers();
    tokenHeaders.append('client_id', process.env.VIPPS_CLIENT_ID || '');
    tokenHeaders.append('client_secret', process.env.VIPPS_CLIENT_SECRET || '');
    tokenHeaders.append('Ocp-Apim-Subscription-Key', process.env.VIPPS_SUBSCRIPTION_KEY || '');
    tokenHeaders.append('Merchant-Serial-Number', process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '');
    
    const res = await fetch(tokenURL!, {
        method: 'POST',
        headers: tokenHeaders
    });

    const data = await res.json();

    return {
        accessToken: data.access_token,
        expiresAt: data.expires_on
    };
};

export const isValidVippsToken = (expiresAt: string) => {
    if (!expiresAt) return false;
    const now = new Date().getTime();
    const expiresAtTime = new Date(expiresAt).getTime();
    if (expiresAtTime <= now) {
        return false;
    }
    return true;
};

export const convertToVippsPrice = (products: Products[]): number => {  
    let price = 0;
    products.forEach(product => {
        price += product.price * 100 * product.count;
    });
    return price;
};

export const getVippsPaymentData = async (orderId: string, paymentPrice: number, accessToken: string) => {
    const orderURL = process.env.VIPPS_ORDER_URL;
    const bodyData = {
        'merchantInfo': {
            'callbackPrefix': process.env.VIPPS_CALLBACK_PREFIX,
            'fallBack': `${process.env.VIPPS_FALLBACK_URL}/orders/${orderId}?vipps=true`,
            'merchantSerialNumber': process.env.VIPPS_MERCHANT_SERIAL_NUMBER
        },
        'transaction': {
            'amount': paymentPrice,
            'orderId': orderId,
            'transactionText': 'TIHLDE Marketplace',
            'skipLandingPage': false,
            'scope': 'name phoneNumber'
        }
    };

    const orderHeaders = new Headers();
    orderHeaders.append('Content-Type', 'application/json');
    orderHeaders.append('Ocp-Apim-Subscription-Key', process.env.VIPPS_SUBSCRIPTION_KEY || '');
    orderHeaders.append('Authorization', 'Bearer ' + accessToken);
    orderHeaders.append('Merchant-Serial-Number', process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '');

    const res = await fetch(orderURL!, {
        method: 'POST',
        headers: orderHeaders,
        body: JSON.stringify(bodyData)
    });

    const data = await res.json();

    return data;
};

export const getVippsPaymentStatus = async (orderId: string, accessToken: string): Promise<string> => {
    const orderUrl = process.env.VIPPS_ORDER_URL + orderId + '/details';
    const orderHeaders = new Headers();
    orderHeaders.append('Content-Type', 'application/json');
    orderHeaders.append('Ocp-Apim-Subscription-Key', process.env.VIPPS_SUBSCRIPTION_KEY || '');
    orderHeaders.append('Authorization', `Bearer ${accessToken}`);
    orderHeaders.append('Merchant-Serial-Number', process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '');

    const res = await fetch(orderUrl, {
        method: 'GET',
        headers: orderHeaders
    });

    const data = await res.json();

    const transactionLogHistory = data.transactionLogHistory;

    const paymentStatus = transactionLogHistory[0].operation;

    return paymentStatus;
};

export const getVippsPaymentTransactionLog = async (orderId: string, accessToken: string) => {
    const orderUrl = process.env.VIPPS_ORDER_URL + orderId + '/details';
    const orderHeaders = new Headers();
    orderHeaders.append('Content-Type', 'application/json');
    orderHeaders.append('Ocp-Apim-Subscription-Key', process.env.VIPPS_SUBSCRIPTION_KEY || '');
    orderHeaders.append('Authorization', `Bearer ${accessToken}`);
    orderHeaders.append('Merchant-Serial-Number', process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '');

    const res = await fetch(orderUrl, {
        method: 'GET',
        headers: orderHeaders
    });

    const data = await res.json();

    const transactionLogHistory = data.transactionLogHistory;
    return transactionLogHistory;  
};

export const refundVippsPayment = async (orderId: string, accessToken: string, amount: number) => {
    const refundUrl = process.env.VIPPS_ORDER_URL + orderId + '/refund';

    const orderHeaders = new Headers();
    orderHeaders.append('Content-Type', 'application/json');
    orderHeaders.append('Ocp-Apim-Subscription-Key', process.env.VIPPS_SUBSCRIPTION_KEY || '');
    orderHeaders.append('Authorization', 'Bearer ' + accessToken);
    orderHeaders.append('Merchant-Serial-Number', process.env.VIPPS_MERCHANT_SERIAL_NUMBER || '');
    orderHeaders.append('X-Request-Id', orderId);

    const vippsAmount = amount * 100;

    const bodyData = {
        'merchantInfo': {
            'merchantSerialNumber': process.env.VIPPS_MERCHANT_SERIAL_NUMBER
        },
        'transaction': {
            'amount': vippsAmount,
            'transactionText': 'Refund for TIHLDE Marketplace'
        }
    };

    await fetch(refundUrl, {
        method: 'POST',
        headers: orderHeaders,
        body: JSON.stringify(bodyData)
    });
};