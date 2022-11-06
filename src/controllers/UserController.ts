import { Request, Response } from "express";
import User from "../model/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


class UserController {
  async register(req: Request, res: Response) {
    const newUser = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      cep: req.body.cep,
      address: req.body.address,
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
      id: uuidv4(),
    });
    
    const userRegisterEmail = await User.findOne({ email: req.body.email })
    if (userRegisterEmail)
      res.status(400).json({ status: 'failed', message: 'Email already in use.' });
    
    if (req.body.cep.length != 8) {
      res.status(400).json({ status: 'failed', message: 'Cep must be eight numbers.' });
    }
    
    newUser.save((error) => {
      if (!error) {
        const token = jwt.sign({id: newUser?.id, admin: newUser!.admin, name: newUser!.name },process.env.TOKEN_SECRET)
        
        res.header('authorization', token)
        res.status(201).json({ status: 'success', message: 'User registered.' });;
      }
      else {
        console.log(error);
        res.status(400).json({ status: 'failed', message: 'Failed to register.' });
      }
    });
  }

  async login(req: Request, res: Response) {
    let retrievedUser = await User.findOne({ email: req.body.email })

    if(retrievedUser){
      if(await bcrypt.compare(req.body.password, retrievedUser!.password)) {
        const token = jwt.sign({id: retrievedUser?.id, admin: retrievedUser.admin, name: retrievedUser.name }, process.env.TOKEN_SECRET)
      
        res.header('authorization', token)   
        res.status(200).json({ status: 'success', message: 'User Validated' })
      
      } else res.status(401).json({ status: 'failed', message: 'Email or password incorrect.'})
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' })
    }
  }

  async returnUserData(req: Request, res: Response) {
    const token = req.header("authorization")
    const userChecked = await jwt.verify(token!, process.env.TOKEN_SECRET);    
    res.json(userChecked)
  }
}

export default new UserController();
