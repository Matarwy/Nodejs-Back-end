import { format, isValid, parseISO } from "date-fns";

export interface Currency {
    symbol: string;
    name: string;
    decimals: number;
    tokenType: string;
}

export interface Socials {
    telegram: string;
    twitter: string;
    website: string;
    discord: string;
}

export interface Category {
    isScam: boolean;
    isPotencialScam: boolean;
    isRecentlyAdded: boolean;
    isFeature: boolean;
    isAma: boolean;
    isAudit: boolean;
}

export interface PresaleInfo {
    link?: string;
    releaseDate?: string;
    hardcap?: string;
    presaleDate?: string;
    presaleLink?: string;
    softcap?: string;
}

export interface RoyalProofAudit {
    certificateOfTrustURL: string;
    certificateOfTrustGif: string;
}

export interface OtherCompanyAuditModel {
    auditLink: string;
    companyName: string;
}

export interface FeaturedTokenDTO {
    category: Category;
    socialLinks: Socials;
    trustLevel: string;
    presaleInfo: PresaleInfo;
    address: string;
    logo: string;
    votes: number;
    description: string;
    scamReason: string[];
    deployedDate?: string;
    scamReasonTooltip?: string;
    tag: string;
    releaseDate?: string;
    scamDate?: string;
    AMADate?: any;
    AMALink?: string;
    savingTime?: string;
    status: string;
    approvalStatus: string;
    royalProofAudit: RoyalProofAudit;
    OtherCompanyAudit?: OtherCompanyAuditModel;
    currency: Currency;
    isVerified: boolean;
    kyc: boolean;
}

export interface Content {
    Items: FeaturedTokenDTO[];
    Count: number;
    ScannedCount: number;
}

export interface FeaturedTokensResponse {
    statusCode: string;
    content: Content;
}