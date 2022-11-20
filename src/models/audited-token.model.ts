export interface OtherCompanyAudit {
    auditLink: string;
    companyName: string;
}

export interface Currency {
    symbol: string;
    name: string;
    decimals: number;
    tokenType: string;
}

export interface PresaleInfo {
    presaleLink: string;
    presaleDate: string;
    softcap: string;
    isWhiteListed: boolean;
    hardcap: string;
}

export interface Socials {
    telegram: string;
    twitter: string;
    website: string;
    discord: string;
}

export interface RoyalProofAudit {
    certificateOfTrustURL: string;
    certificateOfTrustGif: string;
}

export interface AuditedTokenItemModel {
    currency: Currency;
    socialsLinks: Socials ;
    status: string;
    address: string;
    logo: string;
    votes: number;
    releaseDate: string;
    OtherCompanyAudit: OtherCompanyAudit;
    RoyalProofAudit: RoyalProofAudit;
    tag: string;
    description: string;
    presaleInfo: PresaleInfo;
}

export interface Content {
    Items: AuditedTokenItemModel[];
    Count: number;
    ScannedCount: number;
}

export interface AuditedTokenResponseModel {
    statusCode: string;
    content: Content;
}


export class AuditedToken{
    address: string;
    logoPicture: string;
    name: string;
    symbol: string;
    tag: string;
    tooltipText: string;

    constructor( incomingToken: AuditedTokenItemModel ){
        this.address = incomingToken.address;
        this.logoPicture = incomingToken.logo;
        this.name = incomingToken.currency.name;
        this.symbol = incomingToken.currency.symbol;
        this.tag = incomingToken.tag;

        this.tooltipText = 'Want to be a trusted project? Contact SpyWolf for an audit!'
    }
}