import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("authorization");
  if (!token) return res.status(401).send("Access Denied.");

  const isUserVerified = jwt.verify(token!, process.env.TOKEN_SECRET) as JwtPayload;
  const isAdmin = isUserVerified.admin
  if (isAdmin) {
    next()
  } else {
    res.send("nao")
  }
   
}

export default auth;
