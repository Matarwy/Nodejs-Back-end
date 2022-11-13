import { Router } from "express";
import asynceHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import fs from "fs";

const adminRoutes = Router();


adminRoutes.post('/login/admin',asynceHandler(
    async(req,res) => {
        let realPass="$2a$10$YeU4uF6qUJ628wtFYy9.2e7etIUhVHOBfHiD7RE5xwLvpT5GQGU6.";
        let realName="admin";
        let isMatch = await bcrypt.compare(req.body.password,realPass);
        if(realName!==req.body.userName){
            isMatch=false;
        }
        if(isMatch){
            res.send(true);
        }else{
            res.send(false);
        }
    }
))

adminRoutes.put('/updateProject/:id',asynceHandler(
    async(req,res)=>{
        const id=req.params.id;
        let body=req.body;
        
        fs.readFile('data/projects.data.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            } else {
                let dataFile = JSON.parse(data);
                for(let i = 0 ; i < dataFile.count;i++){
                    if(dataFile.projects[i].contractAddress == id){
                        dataFile.projects[i].contractAddress=body.contractAddress,
                        dataFile.projects[i].tokenName=body.tokenName,
                        dataFile.projects[i].tokenSymbol=body.tokenSymbol,
                        dataFile.projects[i].email=body.email,
                        dataFile.projects[i].logoLink=body.logoLink,
                        dataFile.projects[i].websiteLink=body.websiteLink,
                        dataFile.projects[i].telegram=body.telegram,
                        dataFile.projects[i].userNameTelegram=body.userNameTelegram,
                        dataFile.projects[i].twitter=body.twitter,
                        dataFile.projects[i].icoLink=body.icoLink,
                        dataFile.projects[i].description=body.description,
                        dataFile.projects[i].scam=body.scam,
                        dataFile.projects[i].trustLevel=body.trustLevel,
                        dataFile.projects[i].kyc=body.kyc,
                        dataFile.projects[i].category=body.category,
                        dataFile.projects[i].audited=body.audited,
                        dataFile.projects[i].releaseDate=body.releaseDate,
                        dataFile.projects[i].verified=body.verified,
                        dataFile.projects[i].votes=body.votes
                        break;
                    }
                }
                dataFile = JSON.stringify(dataFile);
                fs.writeFile('data/projects.data.json', dataFile, 'utf8',err=>{
                    if (err){
                        console.log(err);
                    } else 
                        res.send(true);
                });
            }
        });
    }
))

adminRoutes.get('/delete/:id',asynceHandler(
    async(req,res)=>{
        const id=req.params.id;
        fs.readFile('data/projects.data.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            } else {
                let dataFile = JSON.parse(data);
                for(let i = 0 ; i < dataFile.count;i++){
                    if(dataFile.projects[i].contractAddress == id){
                        dataFile.projects.splice(i,1);
                        dataFile.count=dataFile.projects.length;
                        break;
                    }
                }
                dataFile = JSON.stringify(dataFile);
                fs.writeFile('data/projects.data.json', dataFile, 'utf8',err=>{
                    if (err){
                        console.log(err);
                    } else 
                        res.send(true);
                });
            }
        });
    }
))

adminRoutes.post('/submitbanner',asynceHandler(
    async(req,res)=>{
        let dataFile;
        fs.readFile('data/banners.data.json','utf-8',(err,data)=>{

            if (err){
                console.log(err);
            } else {
                dataFile = JSON.parse(data);
                let newBanner={
                    id:dataFile.ids,
                    logoLink:req.body.logoLink,
                    advistorName:req.body.advistorName,
                    product:req.body.product,
                    startDate:req.body.startDate,
                    endDate:req.body.endDate
                };
                dataFile.banner.push(newBanner);
                dataFile.ids++;
                dataFile.count=dataFile.banner.length;
                dataFile = JSON.stringify(dataFile);
                fs.writeFile('data/banners.data.json', dataFile, 'utf8',err=>{
                    if (err){
                        console.log(err);
                    } else 
                        res.send(true);
                });
            }

        });
        
    }
))

adminRoutes.put('/updateBanner/:id',asynceHandler(
    async(req,res)=>{
        const id=req.params.id;
        let body=req.body;
        fs.readFile('data/banners.data.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            } else {
                let dataFile = JSON.parse(data);
                for(let i = 0 ; i < dataFile.count;i++){
                    if(dataFile.banner[i].id == id){
                        dataFile.banner[i].logoLink=body.logoLink,
                        dataFile.banner[i].advistorName=body.advistorName,
                        dataFile.banner[i].product=body.product,
                        dataFile.banner[i].startDate=body.startDate,
                        dataFile.banner[i].endDate=body.endDate
                        break;
                    }
                }
                dataFile = JSON.stringify(dataFile);
                fs.writeFile('data/banners.data.json', dataFile, 'utf8',err=>{
                    if (err){
                        console.log(err);
                    } else 
                        res.send(true);
                });
            }
        });
    }
))

adminRoutes.get('/deletebanner/:id',asynceHandler(
    async(req,res)=>{
        const id=req.params.id;
        fs.readFile('data/banners.data.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            } else {
                let dataFile = JSON.parse(data);
                for(let i = 0 ; i < dataFile.count;i++){
                    if(dataFile.banner[i].id == id){
                        dataFile.banner.splice(i,1);
                        dataFile.count=dataFile.banner.length;
                        break;
                    }
                }
                dataFile = JSON.stringify(dataFile);
                fs.writeFile('data/banners.data.json', dataFile, 'utf8',err=>{
                    if (err){
                        console.log(err);
                    } else 
                        res.send(true);
                });
            }

        });
    }
))

adminRoutes.get('/allbanners',asynceHandler(
    async(req,res)=>{
        let dataFile
        fs.readFile('data/banners.data.json','utf-8',(err,data)=>{
            if (err){
                console.log(err);
            } else {
                dataFile = JSON.parse(data);
                res.send(dataFile);
            }
        });
    }
))

export default adminRoutes