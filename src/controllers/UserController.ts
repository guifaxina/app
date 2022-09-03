import { Request, Response } from 'express'
import User from "../model/User";
import { v4 as uuidv4 } from 'uuid'

class UserController {
  
  async register(req: Request, res: Response) {

    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      admin: req.body.admin,
      id: uuidv4(),
    })
    
    await newUser.save((error) => {
      if (!error) res.status(200).send('User registered')
      else res.status(400).send('Failed to register')
    })
  }

  
}

export default new UserController()