
import {Request, Response} from "express";
import * as validate from "validate.js"
import PhoneFormat from "../../helpers/phone";
import { comparePassword, errRes, getOTP, hashMyPassword, okRes, paginate, sendSMS } from "../../helpers/tools";
import Validate from "../../helpers/validation"
import * as bcrypt from "bcrypt";
import { User } from "../../src/entity/User";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import { Like, Raw } from "typeorm";
import { Category } from "../../src/entity/Category";
import { Product } from "../../src/entity/Products";
import { Invoice } from "../../src/entity/Invoice";
import { InvoiceItem } from "../../src/entity/InvoiceItem";

export default class UserController{

//------------------------------------------------------------------------------------------------//



static async register(req:Request, res:Response){
    let notValid = validate(req.body, Validate.register());
    if (notValid) return errRes(res, notValid);
    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber) return errRes(res, `Phone ${req.body.phone} is not a valid`, "phone");
  let phone = phoneObj.globalP;
let user :any 
  const password = await hashMyPassword(req.body.password);
user = await User.create({
    ...req.body,
    active: true,
    complete: false,
    otp:getOTP(),
    password,
    phone
})
await user.save()

// sendSMS(` Your OTP: ${user.otp}`, user.phone);
const token = jwt.sign({ id: user.id }, config.userJwtSecret);
return okRes(res,  token  );
}



//------------------------------------------------------------------------------------------------//



static OTP = async (req, res): Promise<object> => {
   
    let notValid = validate(req.body, Validate.otp());
    if (notValid) return errRes(res, notValid);

   
    const token = req.headers.token;
    let payload: any;
    try {
      payload = jwt.verify(token, config.userJwtSecret);
    } catch (error) {
      return errRes(res, "Invalid Token");
    }
  
    let user = await User.findOne(payload.id);
    if (!user) return errRes(res, "User does not exist");
   
    if (user.complete) return errRes(res, "User already complete");

    if (user.otp != req.body.otp) {
      user.otp = null;
      await user.save();
      return errRes(res, `The OTP ${req.body.otp} is not correct`);
    }
  
    user.complete = true;
    await user.save();
    user.password = null;
    

    return okRes(res,"goodjob" );
  };



//------------------------------------------------------------------------------------------------//



static async login(req:Request, res:Response) {
      let notValid = validate(req.body, Validate.login());
      if (notValid) return errRes(res, notValid);

     let email:any
     email = req.body.email
      let user = await User.findOne({ where: {email} });
      if (!user) return errRes(res, `Your email ${req.body.email} is not registered`);




      let validPassword = await comparePassword(req.body.password, user.password);
      if (!validPassword) return errRes(res, `Please check your data`);

      const token = jwt.sign({ id: user.id }, config.userJwtSecret);

      return okRes(res,{data:{token} }  );
    }

 //----------------------------------------------------------------------//




    

    static async getCategories(req, res): Promise<object> {
      let { p, s, q } = req.query;
      let { skip, take } = paginate(p, s);
  
      let whereObj: object;
  
      if (q) {
        whereObj = {
          active: true,
          title: Raw((alias) => `${alias} ILIKE '%${q}%'`),
        };
      } else whereObj = { active: true };
  
      try {
        let data = await Category.findAndCount({
          where: whereObj,
          relations: ["products"],
          take,
          skip,
          order: { id: "ASC" },
        });
        return okRes(res,  data );
      } catch (error) {
        return errRes(res, error);
      }
    }
  
  
  //-----------------------------------------------------------------------//


  static async getProducts(req, res): Promise<object> {
    let { p, s, q } = req.query;
    let { skip, take } = paginate(p, s);
    let category = req.params.category;
    const active = true;

    let whereObj: any;
    if (q)
      whereObj = [
        {
          active,
          category,
          title: Raw((alias) => `${alias} ILIKE '%${q}%'`),
        },
        {
          active,
          category,
          description: Raw((alias) => `${alias} ILIKE '%${q}%'`),
        },
      ];
    else whereObj = { active,category };
    try {
      let data = await Product.find({
        where: whereObj,
        relations: ["category"],
        take,
        skip,
      });
      return okRes( res, data );
    } catch (error) {
      return errRes(res, error);
    }
  }

    //-----------------------------------------------------------------------//



    static async getAllProducts(req, res): Promise<object> {
      let { p, s, q } = req.query;
      let { skip, take } = paginate(p, s);
      
      const active = true;
  
      let whereObj: any;
      if (q)
        whereObj = [
          {
            active,
            
            title: Raw((alias) => `${alias} ILIKE '%${q}%'`),
          },
          {
            active,
            
            description: Raw((alias) => `${alias} ILIKE '%${q}%'`),
          },
        ];
      else whereObj = { active };
      try {
        let data = await Product.find({
          where: whereObj,
          relations: ["category"],
          take,
          skip,
        });
        return okRes( res, data );
      } catch (error) {
        return errRes(res, error);
      }
    }
  
      //-----------------------------------------------------------------------//

    static async makeInvoice(req, res): Promise<object> {

      let notValid = validate(req.body, Validate.makeInvoice());
      if (notValid) return errRes(res, notValid);


      let ids = [];
      for (const product of req.body.products) {
        let notValid = validate(product, Validate.oneProduct());
        if (notValid) return errRes(res, notValid);
        ids.push(product.id);
      }
  
     
      let user = req.user;
  
      let products = await Product.findByIds(ids, { where: { active: true } });
  
      [{ id: 1, quantity: 1 }];
  
      let total = 0;
     
      for (const product of products) {
        total =
          total +
          product.price *
            req.body.products.filter((e) => e.id == product.id)[0].quantity;
      }
  
     
      let invoice: any;
      invoice = await Invoice.create({
        ...req.body,
        total,
        status: "pending",
        user,
      });
      await invoice.save();
      
      
      


      for (const product of products) {
        let invoiceItem = await InvoiceItem.create({ 
          quantity: req.body.products.filter((e) => e.id == product.id)[0]
            .quantity,
          invoice,
          subtotal:
            req.body.products.filter((e) => e.id == product.id)[0].quantity *
            product.price,
          product,
        });
        await invoiceItem.save();
      }
  
      return okRes(res, { data: { invoice } });
    }




//-----------------------------------------------------------------------//

static async userInvoices(req, res): Promise<object> {

let user: any
user=req.user
console.log(user)
let invoices = await Invoice.find( { where: {user }});






return okRes(res, { data: { invoices } });






}






    }


  
  

