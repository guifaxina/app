import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("authorization");
  if (!token) res.status(401).send("Access Denied.");

  try {
    const isUserVerified = jwt.verify(token!, process.env.TOKEN_SECRET) as JwtPayload;
    req.user = isUserVerified;
    next();
  } catch (error) {
    res.status(401).send("Access Denied.");
  }
}

export default auth;
