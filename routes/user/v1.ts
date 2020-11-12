import * as express from "express";
import UserController from "../../controllers/app/userController";
const router = express.Router();



router.post("/register", UserController.register);
router.post("/otp", UserController.OTP);
router.post("/login", UserController.login);
router.get("/getCategories", UserController.getCategories);
router.get("/getProducts", UserController.getProducts);











export default router