import { Request, Response } from "express";
import validate = require("validate.js");
import { errRes, okRes } from "../../helpers/tools";
import Validate from "../../helpers/validation";
import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Products";

    
    
    export default class UserController{
    
    static async makeCategory(req:Request, res:Response){
        let notValid = validate(req.body, Validate.makeCategory());
        if (notValid) return errRes(res, notValid);
      
    
     let category: any
    category = await Category.create({
       ...req.body,
       active: true
    })
    await category.save()
   
    
    return okRes(res, { data: { category } });
    }
  
    
   //----------------------------------------------------------------------//
  
  
  
  
  
   static async makeProduct(req:Request, res:Response){
    let notValid = validate(req.body, Validate.makeProduct());
    if (notValid) return errRes(res, notValid);
    let  category = req.params.category;
  
  let product: any
  product = await Product.create({
   ...req.body,
   active: true,
   category
  })
  await product.save()
  
  
  return okRes(res, { data: { product } });
  }
    
  
}