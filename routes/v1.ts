import * as express from "express";
import UserController from "../controllers/userController";
const router = express.Router();



router.post("/register", UserController.register);
router.post("/otp", UserController.OTP);
router.post("/login", UserController.login);
router.get("/getCategories", UserController.getCategories);
router.get("/getProducts", UserController.getProducts);
router.post("/makeCategory", UserController.makeCategory);//
router.post("/makeProduct/:category", UserController.makeProduct);//











export default router