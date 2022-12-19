
export interface Currency {
    symbol: string;
    name: string;
    decimals: string;
    tokenType: string;
}

export interface AddressCheckResponseModel {
    contractType: string;
    currency: Currency;
}