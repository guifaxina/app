import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Models
import User from "../model/User";

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
    // This code iterates over the newUser object and returns an array of the input names that were not filled.
    const newUserData = Object.entries(newUser)[1][1] 
    const valuesOfUserData: any = [];
    Object.entries(newUserData).forEach(property => valuesOfUserData.push(property[1]))
    const indexesOfEmptyInputs = valuesOfUserData.reduce(function(accumulator: [number], element: string, index: number) {
      if (element === '') accumulator.push(index);
      return accumulator;
    }, []);
    
    const notFilledUserData = new Array();
    for (const values of indexesOfEmptyInputs) {
      notFilledUserData.push(Object.entries(newUserData)[values][0] + " is required.")
    }

    const isThisEmailRegistered = await User.findOne({ email: req.body.email })
    if (isThisEmailRegistered)
      return res.status(400).json({ status: 'failed', message: 'Email already in use.' });

    if (notFilledUserData.length)
      return res.status(400).json({ status: 'failed', message: 'Some fields are not filled.', data: notFilledUserData })
      
    if (req.body.cep.length != 8) 
      return res.status(400).json({ status: 'failed', message: 'Cep must be eight numbers.' });

    if (req.body.password.length < 6) 
      return res.status(400).json({ status: 'failed', message: "Password can't be less than 6 characters." });
    
    newUser.save((error) => {
      if (!error) {
        const token = jwt.sign({id: newUser!.id, admin: newUser!.admin, name: newUser!.name },process.env.TOKEN_SECRET)
        
        res.header('authorization', token)
        res.status(201).json({ status: 'success', message: 'User registered.' });;
      }
      else {
        console.log(error.name); 
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
        res.status(200).json({ status: 'success', message: 'User validated.' })
      
      } else res.status(401).json({ status: 'failed', message: 'Email or password incorrect.'})
    } else {
      res.status(404).json({ status: 'error', message: 'User not found.' })
    }
  }

  async returnUserData(req: Request, res: Response) {
    const token = req.header("authorization")
    const userChecked = await jwt.verify(token!, process.env.TOKEN_SECRET);    
    res.json(userChecked)
  }
}

export default new UserController();
