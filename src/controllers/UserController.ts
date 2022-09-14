import { Request, Response } from "express";
import User from "../model/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class UserController {
  async register(req: Request, res: Response) {
    const newUser = new User({
      name:       req.body.name,
      lastName:   req.body.lastName,
      cep:        req.body.cep,
      address:    req.body.address,
      email:      req.body.email,
      password:   req.body.password,
      admin:      req.body.admin,
      id: uuidv4(),
    });

    if (await User.findOne({ email: req.body.email }))
      res.status(400).send("Email already in use.");

    await newUser.save((error) => {
      if (!error) res.status(200).send("User registered.");
      else {
        console.log(error);
        res.status(400).send("Failed to register.");
      }
    });
  }

  async login(req: Request, res: Response) {
    let retrievedUser = await User.findOne({ email: req.body.email })

    if(retrievedUser){
      if(await bcrypt.compare(req.body.password, retrievedUser!.password)) {
       
      const token = jwt.sign({id: retrievedUser?.id, admin: retrievedUser.admin, name: retrievedUser.name }, process.env.TOKEN_SECRET)
      const isAdmin = String(retrievedUser.admin);
    
      res.header('name', retrievedUser.name)
      res.header('isadmin', isAdmin)
      res.header('authorization', token)   
      res.status(200).send("User validated.")
      
      } else res.status(401).send("Email or password incorrect.") 
    } else {
      res.status(404).send("User not found")
    }
  }
}

export default new UserController();
