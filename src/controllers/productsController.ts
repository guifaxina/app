import mongoose from 'mongoose';
import Product from '../model/Product';
import { uuidv4 } from 'uuid';
import { Request, Response } from 'express';

class ProductsController {
  async newProduct(req: Request, res: Response) {  
    const newProduct = new Product({
      id: uuidv4(),
      name: req.body.name,
      price: req.body.price,
      inventory: req.body.inventory
    })
    
  } 
}