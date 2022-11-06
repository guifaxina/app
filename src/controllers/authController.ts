import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, json } from "express";


function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("authorization");
  if (!token) return res.status(401)

  const isUserVerified = jwt.verify(token!, process.env.TOKEN_SECRET) as JwtPayload;
  const isAdmin = isUserVerified.admin
  if (isAdmin) {
    next()
  } else {
    res.sendStatus(400)
  }
}

export default auth;
