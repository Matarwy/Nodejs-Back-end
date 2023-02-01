import { Router } from "express"
import asynceHandler from "express-async-handler";
import {  FeaturedTokenDTO, FeaturedTokensResponse } from "../models/featured-token";
import { AuditedTokenItemModel, AuditedTokenResponseModel } from "../models/audited-token.model";
import {Currency , AddressCheckResponseModel} from "../models/address-check.model";
import Moralis from "moralis";
import { EvmChain } from '@moralisweb3/evm-utils';
import fs from "fs";

const networkRoutes = Router();
const fetchForce ={
    statusCode: "",
    customID : ""
};
const chains = [
    {
        "chain": EvmChain.ETHEREUM,
        "tokenType": "ERC20",
    },{
        "chain": EvmChain.BSC,
        "tokenType": "BEP20",
    },{
        "chain": EvmChain.POLYGON,
        "tokenType": "MATIC20",
    },
]
networkRoutes.get('/force_update',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/fetchforce.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    let projects=JSON.parse(data);
                    fetchForce.statusCode = res.statusCode.toString();
                    fetchForce.customID = projects.customID;
                    res.send(fetchForce);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));
networkRoutes.get('/ticker',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/ticker.data.json','utf-8',async (err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    let projects=JSON.parse(data);
                    let ticker: { symbol: string; link: string; logo: string; numberOfDigits: number; price: number}[] = [];
                    for(let i=0;i<projects.length;i++){
                        try{
                            await Moralis.EvmApi.token.getTokenPrice({
                                address: projects[i]?.address,
                                chain: EvmChain.BSC,
                            }).then((response) => {
                                let item = {
                                    symbol: projects[i].symbol,
                                    link: projects[i].link,
                                    logo: projects[i].logo,
                                    numberOfDigits: projects[i].numberOfDigits,
                                    price: response.result.usdPrice,
                                }
                                ticker.push(item);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }catch(err){
                            console.log(err);
                        }
                    }
                    res.send(ticker);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));
networkRoutes.get('/audited',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    
                    let projects=JSON.parse(data);
                    let auditedProjects = <AuditedTokenResponseModel>{
                        statusCode: res.statusCode.toString(),
                        content: {
                            Items:[],
                            Count:0,
                            ScannedCount:0
                        }
                    };
                    for(let i=0;i<projects.length;i++){
                        if(projects[i]?.category?.isAudit){
                            let item = <AuditedTokenItemModel>{
                                currency: projects[i].currency,
                                socialsLinks: projects[i].socialLinks,
                                status: projects[i].status,
                                address: projects[i].address,
                                logo: projects[i].logo,
                                votes: projects[i].votes,
                                description: projects[i].description,
                                releaseDate: projects[i].releaseDate,
                                OtherCompanyAudit: projects[i].OtherCompanyAudit,
                                RoyalProofAudit: projects[i].RoyalProofAudit,
                                tag: projects[i].tag,
                                presaleInfo: projects[i].presaleInfo

                            }
                            auditedProjects.content.Items.push(item);
                        }
                    }
                    auditedProjects.content.Items.reverse();
                    auditedProjects.content.Count = projects.length;
                    auditedProjects.content.ScannedCount = auditedProjects.content.Items.length;
                    res.send(auditedProjects);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));

networkRoutes.get('/trusted',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    
                    let projects=JSON.parse(data);
                    let featuerProjects = <FeaturedTokensResponse>{
                        statusCode: res.statusCode.toString(),
                        content: {
                            Items:[],
                            Count:0,
                            ScannedCount:0
                        }
                    };
                    for(let i=0;i<projects.length;i++){
                        if(projects[i]?.category?.isFeature){
                            let item = <FeaturedTokenDTO>{
                                trustLevel: projects[i].trustLevel,
                                presaleInfo: projects[i].presaleInfo,
                                address: projects[i].address,
                                logo: projects[i].logo,
                                votes: projects[i].votes,
                                description: projects[i].description,
                                scamReason: projects[i].scamReason,
                                deployedDate: projects[i].deployedDate,
                                scamReasonTooltip: projects[i].scamReasonTooltip,
                                tag: projects[i].tag,
                                releaseDate: projects[i].releaseDate,
                                scamDate: projects[i].scamDate,
                                AMADate: projects[i].AMADate,
                                AMALink: projects[i].AMALink,
                                savingTime: projects[i].savingTime,
                                status: projects[i].status,
                                approvalStatus: projects[i].approvalStatus,
                                currency: projects[i].currency,
                                socialLinks: projects[i].socialLinks,
                                isVerified: projects[i].isVerified,
                                royalProofAudit: projects[i].royalProofAudit,
                                OtherCompanyAudit: projects[i].OtherCompanyAudit,
                                kyc: projects[i].kyc,
                            }
                            featuerProjects.content.Items.push(item);
                        }
                    }
                    featuerProjects.content.Items.reverse();
                    featuerProjects.content.Count = projects.length;
                    featuerProjects.content.ScannedCount = featuerProjects.content.Items.length;
                    res.send(featuerProjects);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));

networkRoutes.get('/upcomings',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    
                    let projects=JSON.parse(data);
                    let upcomingsProjects = <FeaturedTokensResponse>{
                        statusCode: res.statusCode.toString(),
                        content: {
                            Items:[],
                            Count:0,
                            ScannedCount:0
                        }
                    };
                    for(let i=0;i<projects.length;i++){
                        if(projects[i]?.category?.isRecentlyAdded){
                            const item = <FeaturedTokenDTO>{
                                trustLevel: projects[i].trustLevel ,
                                presaleInfo: projects[i].presaleInfo,
                                address: projects[i].address,
                                logo: projects[i].logo,
                                votes: projects[i].votes,
                                description: projects[i].description,
                                scamReason: projects[i].scamReason,
                                deployedDate: projects[i].deployedDate,
                                scamReasonTooltip: projects[i].scamReasonTooltip,
                                tag: projects[i].tag,
                                releaseDate: projects[i].releaseDate,
                                scamDate: projects[i].scamDate,
                                AMADate: projects[i].AMADate,
                                AMALink: projects[i].AMALink,
                                savingTime: projects[i].savingTime,
                                status: projects[i].status,
                                approvalStatus: projects[i].approvalStatus,
                                currency: projects[i].currency,
                                socialLinks: projects[i].socialLinks
                            }
                            upcomingsProjects.content.Items.push(item);
                        }
                    }
                    upcomingsProjects.content.Items.reverse();
                    upcomingsProjects.content.Count = projects.length;
                    upcomingsProjects.content.ScannedCount = upcomingsProjects.content.Items.length;
                    res.send(upcomingsProjects);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));

networkRoutes.get('/amas',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    
                    let projects=JSON.parse(data);
                    let amasProjects = <FeaturedTokensResponse>{
                        statusCode: res.statusCode.toString(),
                        content: {
                            Items:[],
                            Count:0,
                            ScannedCount:0
                        }
                    };
                    for(let i=0;i<projects.length;i++){
                        if(projects[i]?.category?.isAma){
                            let item = <FeaturedTokenDTO>{
                                trustLevel: projects[i].trustLevel,
                                presaleInfo: projects[i].presaleInfo,
                                address: projects[i].address,
                                logo: projects[i].logo,
                                votes: projects[i].votes,
                                description: projects[i].description,
                                scamReason: projects[i].scamReason,
                                deployedDate: projects[i].deployedDate,
                                scamReasonTooltip: projects[i].scamReasonTooltip,
                                tag: projects[i].tag,
                                releaseDate: projects[i].releaseDate,
                                scamDate: projects[i].scamDate,
                                AMADate: projects[i].AMADate,
                                AMALink: projects[i].AMALink,
                                savingTime: projects[i].savingTime,
                                status: projects[i].status,
                                approvalStatus: projects[i].approvalStatus,
                                currency: projects[i].currency,
                                socialLinks: projects[i].socialLinks
                            }
                            amasProjects.content.Items.push(item);
                        }
                    }
                    amasProjects.content.Items.reverse();
                    amasProjects.content.Count = projects.length;
                    amasProjects.content.ScannedCount = amasProjects.content.Items.length;
                    res.send(amasProjects);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));

networkRoutes.get('/scam',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    
                    let projects=JSON.parse(data);
                    let scamProjects = <FeaturedTokensResponse>{
                        statusCode: res.statusCode.toString(),
                        content: {
                            Items:[],
                            Count:0,
                            ScannedCount:0
                        }
                    };
                    for(let i=0;i<projects.length;i++){
                        if(projects[i]?.category?.isScam){
                            let item = <FeaturedTokenDTO>{
                                trustLevel: projects[i].trustLevel,
                                presaleInfo: projects[i].presaleInfo,
                                address: projects[i].address,
                                logo: projects[i].logo,
                                votes: projects[i].votes,
                                description: projects[i].description,
                                scamReason: projects[i].scamReason,
                                deployedDate: projects[i].deployedDate,
                                scamReasonTooltip: projects[i].scamReasonTooltip,
                                tag: projects[i].tag,
                                releaseDate: projects[i].releaseDate,
                                scamDate: projects[i].scamDate,
                                AMADate: projects[i].AMADate,
                                AMALink: projects[i].AMALink,
                                savingTime: projects[i].savingTime,
                                status: projects[i].status,
                                approvalStatus: projects[i].approvalStatus,
                                currency: projects[i].currency,
                                socialLinks: projects[i].socialLinks
                            }
                            scamProjects.content.Items.push(item);
                        }
                    }
                    scamProjects.content.Items.reverse();
                    scamProjects.content.Count = projects.length;
                    scamProjects.content.ScannedCount = scamProjects.content.Items.length;
                    res.send(scamProjects);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));

networkRoutes.get('/not_audited',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(!err){
                if(res.statusCode==200){
                    
                    let projects=JSON.parse(data);
                    let not_auditedProjects = <FeaturedTokensResponse>{
                        statusCode: res.statusCode.toString(),
                        content: {
                            Items:[],
                            Count:0,
                            ScannedCount:0
                        }
                    };
                    for(let i=0;i<projects.length;i++){
                        if(projects[i]?.category?.isPotencialScam){
                            let item = <FeaturedTokenDTO>{
                                trustLevel: projects[i].trustLevel,
                                presaleInfo: projects[i].presaleInfo,
                                address: projects[i].address,
                                logo: projects[i].logo,
                                votes: projects[i].votes,
                                description: projects[i].description,
                                scamReason: projects[i].scamReason,
                                deployedDate: projects[i].deployedDate,
                                scamReasonTooltip: projects[i].scamReasonTooltip,
                                tag: projects[i].tag,
                                releaseDate: projects[i].releaseDate,
                                scamDate: projects[i].scamDate,
                                AMADate: projects[i].AMADate,
                                AMALink: projects[i].AMALink,
                                savingTime: projects[i].savingTime,
                                status: projects[i].status,
                                approvalStatus: projects[i].approvalStatus,
                                currency: projects[i].currency,
                                socialLinks: projects[i].socialLinks
                            }
                            not_auditedProjects.content.Items.push(item);
                        }
                    }
                    not_auditedProjects.content.Items.reverse();
                    not_auditedProjects.content.Count = projects.length;
                    not_auditedProjects.content.ScannedCount = not_auditedProjects.content.Items.length;
                    res.send(not_auditedProjects);
                }else{
                    res.send("status code is" + res.statusCode);
                }
            }else{
                res.send(err.message);
                console.log(err);
            }
        })
    }
));

networkRoutes.get('/token/:id',asynceHandler(
    async (req,res)=>{
        fs.readFile('data/tokens.data.json','utf-8',(err,data)=>{
            if(err){
                res.send(err.message);
                console.log(err);
            }
            else{
                let projects=JSON.parse(data);
                let project = projects.find((p:FeaturedTokenDTO)=>p.address.toLowerCase()==req.params.id.toLowerCase());
                if(project){
                    res.send(project);
                }else{
                    res.send("not found");
                }
            }
        })
    }
))

networkRoutes.get('/tokeninfo/:id',asynceHandler(
    async (req,res)=>{
        for(let i=0;i<chains.length;i++){
            const chain = chains[i].chain;
            const addresses = [req.params.id];
            const tokenResponse = await Moralis.EvmApi.token.getTokenMetadata({
                addresses,
                chain,
            });
            let token = tokenResponse.toJSON()
            if(token[0]?.symbol !== undefined && token[0]?.symbol !== ''){
                let tokenInfo = <AddressCheckResponseModel>{
                    contractType: "TOKEN",
                    currency: <Currency>{
                        name: token[0]?.name,
                        symbol: token[0]?.symbol,
                        decimals: token[0]?.decimals,
                        tokenType: chains[i].tokenType,
                    }
                }
                res.send(tokenInfo);
                break;
            }
        }
    }
))






export default networkRoutes