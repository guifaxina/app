import { Request, Response } from "express";
import User from "../model/User";
import { v4 as uuidv4 } from "uuid";

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

    if (await User.findOne({ email: req.body.email }))
      res.status(400).send("Email already in use.");

    await newUser.save((error) => {
      if (!error) res.status(200).send("User registered");
      else {
        console.log(error);
        res.status(400).send("Failed to register");
      }
    });
  }

  async login() {}
}

export default new UserController();
