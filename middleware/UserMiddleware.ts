import  config  from "../config"
import { errRes } from "../helpers/tools";
import { User } from "../src/entity/User";
import * as jwt from "jsonwebtoken";


let userAuth: any;

/**
 *
 */
export default userAuth = async (req, res, next): Promise<object> => {
  const token = req.headers.token;
  if (!token) return errRes(res, "Token is required ", "token");

  let payload: any;
  try {
    payload = jwt.verify(token, config.userJwtSecret);
  } catch (error) {
    return errRes(res, "Invalid token");
  }

  let user = await User.findOne({
    where: { id: payload.id, active: true, complete: true },
  });
  if (!user) return errRes(res, "Please complete the registration process");

  req.user = user;

  return next();
};