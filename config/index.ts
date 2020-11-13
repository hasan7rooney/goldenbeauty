require("dotenv").config();
let config: any

export default config ={
    userJwtSecret: process.env.USERJWT_SECRET || "lale",
    adminJwtSecret: process.env.ADMINJWT_SECRET || "bab",
    accountSid: process.env.ACCOUNTSID_SECRET  , 
    authToken: process.env.AUTHTOKEN_SECRET
}