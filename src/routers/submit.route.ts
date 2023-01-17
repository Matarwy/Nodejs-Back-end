import { Router } from "express"
import asynceHandler from "express-async-handler";
import {  FeaturedTokenDTO } from "../models/featured-token";
import fs from "fs";

const submitRoutes = Router()
interface VoteItem{
    ipAddress: String,
    tokenAddress: String
};
interface VotesResponse{
    items: VoteItem[]
}
submitRoutes.post("/voting_data", asynceHandler(async (req, res) => {
    const voteItem = <VoteItem>{
        ipAddress: req.body.ipAddress,
        tokenAddress: req.body.tokenAddress
    }
    fs.readFile('data/voteing.data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let votes = JSON.parse(data); //now it an object
        votes.push(voteItem); //add some data
        let json = JSON.stringify(votes); //convert it back to json
        fs.writeFile('data/voteing.data.json', json, 'utf8', function(err){
            if(err) throw err;
            console.log('complete');
        }); // write it back 
    }});
    fs.readFile('data/tokens.data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let tokens = JSON.parse(data); //now it an object
        tokens.forEach((token: { address: any; votes: number; }) => {
            if(token.address === voteItem.tokenAddress){
                token.votes += 1;
            }
        });
        let json = JSON.stringify(tokens); //convert it back to json
        fs.writeFile('data/tokens.data.json', json, 'utf8', function(err){
            if(err) throw err;
            console.log('complete');
        }); // write it back 
    }});
}));

submitRoutes.post("/voteing_data", asynceHandler(async (req, res) => {
    fs.readFile('data/voteing.data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let votes = JSON.parse(data); //now it an object
        let votesResponse =<VotesResponse>{
            items:[],
        };
        for(let i = 0; i < votes.length; i++){
            if(votes[i].ipAddress === req.body.ipAddress){
                votesResponse.items.push(votes[i]);
            }
        }
        res.send(votesResponse);
    }});
}));    
submitRoutes.post("/", asynceHandler(async (req, res) => {
    const token: FeaturedTokenDTO = <FeaturedTokenDTO>{
        socialLinks: req.body.item.socialLinks,
        currency: req.body.item.currency,
        address: req.body.item.address,
        status: req.body.item.status,
        votes: 0,
        logo: req.body.item.logo,
        releaseDate: req.body.item.releaseDate,
        description: req.body.item.description,
        category: req.body.item.category,
        tag: "UNVERIFIED",
    }
    if(req.body.item.presaleInfo !== undefined){
        token.presaleInfo = req.body.item.presaleInfo;
    }
    if(req.body.item.scamReasonTooltip !== undefined){
        token.scamReasonTooltip = req.body.item.scamReasonTooltip;
    }
    if(req.body.item.scamReason !== undefined){
        token.scamReason = req.body.item.scamReason;
    }
    if(req.body.item.scamDate !== undefined){
        token.scamDate = req.body.item.scamDate;
    }
    fs.readFile('data/tokens.data.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        let tokens = JSON.parse(data); //now it an object
        if(tokens.find((token: { address: any; }) => token.address === req.body.item.address) === undefined){
            tokens.push(token); //add some data
            let json = JSON.stringify(tokens); //convert it back to json
            fs.writeFile('data/tokens.data.json', json, 'utf8', function(err){
                if(err) throw err;
                console.log('complete');
            }); // write it back 
            res.send(token);
        }else{
            res.send("Token already exists");
        }
    }});

}));
export default submitRoutes