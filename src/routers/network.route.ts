import { Router } from "express"
import asynceHandler from "express-async-handler";

import fs from "fs";

const networkRoutes = Router();


networkRoutes.get('/projects',asynceHandler(
    async (req,res)=>{    
        fs.readFile('data/projects.data.json','utf-8',(err,data)=>{
            let projects=JSON.parse(data);
            res.send(projects);
        })
    }
));

networkRoutes.get('/:id',asynceHandler(
    async (req,res)=>{
        fs.readFile('data/projects.data.json','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                let projects=JSON.parse(data);
                if(projects.count){
                    for(let i = 0 ; i < projects.count ; i++){
                        if(projects.projects[i].contractAddress == req.params.id){
                            res.send(projects.projects[i]);
                        }
                    }
                }
                else res.send({});
            }
        })
    }
))






export default networkRoutes