import express from "express";
import auth from "../controllers/authController"
import jwt from 'jsonwebtoken'

const router = express.Router();

router.use(express.json());

router.post('/', auth, (req, res) => {
    const isAdmin: jwt.JwtPayload = req.user.admin 
    
    if (isAdmin) {
        res.send("Is admin")
    } else {
        res.status(401).send("Not admin")
    }
});


export default router