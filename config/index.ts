require("dotenv").config();
let config: any

export default config ={
    jwtSecret: process.env.JWT_SECRET || "lale",
    accountSid: process.env.ACCOUNTSID_SECRET  , 
    authToken: process.env.AUTHTOKEN_SECRET
}