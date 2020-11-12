import * as bcrypt from "bcrypt";
import * as twilio from "twilio";
import config from "../config";
const client = twilio(config.accountSid, config.authToken);


const errRes = (res, err, key = "err", statusCode = 400) => {
    let response = { status: false, err: null };
    if (typeof err === "string") {
      let obj = {};
      obj[key] = [err];
      response.err = obj;
    } else {
      response.err = err;
    }
  
    res.statusCode = statusCode;
    return res.json(response);
  };



const okRes = (res, data, statusCode = 200) => {
    let response = { status: true, data };
    res.statusCode = statusCode;
    return res.json(response);
  };




  const hashMyPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(plainPassword, salt);
    return password;
  };

  const comparePassword = async (plainPassword, hash) =>
  await bcrypt.compare(plainPassword, hash);

  const getOTP = () => Math.floor(1000 + Math.random() * 9000);



  const sendSMS = (body: string, to: string) => {
    client.messages
      .create({  from: "+12563718877", to ,body })
      .then((message) => console.log(message.sid));
  };



  const paginate = (p = 1, s = 10) => {
    let take = s;
    let skip = (p - 1) * take;
    return { take, skip };
  };


  export { errRes, okRes, hashMyPassword,getOTP,sendSMS,comparePassword,paginate}