import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function validateAuthorizationCanciones(req:Request, res:Response, next:NextFunction){
    const {authorization} = req.headers;
    res.locals.autorizado=false
    if (!authorization) return next();
    if (!authorization.startsWith("Bearer ")) return res.status(401).json({message:"Token format wrong"});

    const token = authorization.replace("Bearer ", "")

    verify(token, process.env.SECRET_KEY || 'llave_secreta', (err, decoded)=>{
        res.locals.autorizado = true
        if (err) {res.locals.autorizado=false}        
        next()
    })
    
}


export function validateAuthorization(req:Request, res:Response, next:NextFunction){
    const {authorization} = req.headers;
    
    if (!authorization) return res.status(401).json({message:"Unauthorizated"});
    if (!authorization.startsWith("Bearer ")) return res.status(401).json({message:"Token format wrong"});

    const token = authorization.replace("Bearer ", "")

    verify(token, process.env.SECRET_KEY || 'llave_secreta', (err, decoded)=>{        
        if (err) return res.status(401).json({message:'Invalid Token'})
        next()
    })
    
}


