import { Router } from "express"
import asynceHandler from "express-async-handler";
import {  Project } from "../models/project-model";
import fs from "fs";

const submitRoutes = Router()

submitRoutes.post('/kyc',asynceHandler(
   async (req,res) => {

      const newProject:Project = {
         contractAddress:req.body.contractAddress,
         tokenName:req.body.tokenName,
         tokenSymbol:req.body.tokenSymbol,
         email:req.body.email,
         logoLink:req.body.logoLink,
         websiteLink:req.body.websiteLink,
         telegram:req.body.telegram,
         userNameTelegram:req.body.userNameTelegram,
         twitter:req.body.twitter,
         icoLink:req.body.icoLink,
         description:req.body.description,
         scam:req.body.scam,
         trustLevel:3,
         kyc:req.body.kyc,
         category:req.body.category,
         audited:false,
         releaseDate:req.body.releaseDate,
         verified:null,
         votes:0
      };
      fs.readFile('data/projects.data.json','utf-8',(err,data)=>{
         if(err){
            console.log(err);
         }else{
            let dataFile = JSON.parse(data);
            let newPro = true;
            for (let i = 0; i < dataFile.count; i++) {
               if(dataFile.projects[i].contractAddress==req.body.contractAddress){
                  newPro=false;
                  break;
               }
            }
            let projects = dataFile.projects;
            if(newPro){
               dataFile.projects.push(newProject);
               dataFile.count=dataFile.projects.length;
               dataFile = JSON.stringify(dataFile);
               fs.writeFile('data/projects.data.json', dataFile, 'utf8',err=>{
                  if (err){
                     console.log(err);
                  } else{
                     res.send({
                        result:dataFile.projects,
                        new:true
                     });
                  }
               });
            }
            else{
               res.send({
                  result:projects,
                  new:false
               });
            }
         }
      });
   }
))

export default submitRoutes