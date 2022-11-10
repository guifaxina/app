import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("authorization");
  if (!token) return res.status(400).json({ status: "Error", message: "Token not found" })

  const isUserVerified = jwt.verify(token!, process.env.TOKEN_SECRET) as JwtPayload;
  const isAdmin = isUserVerified.admin
  if (isAdmin) {
    next()
  } else {
    res.status(401).json({ status:"Failed", message: "Unauthorized." })
  }
}

export default auth;
