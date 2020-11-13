require("dotenv").config();
let config: any

export default config ={
    userJwtSecret: process.env.JWT_SECRET || "lale",
    adminJwtSecret: process.env.JWT_SECRET || "bab",
    accountSid: process.env.ACCOUNTSID_SECRET  , 
    authToken: process.env.AUTHTOKEN_SECRET
}