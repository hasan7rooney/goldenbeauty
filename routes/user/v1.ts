import * as express from "express";
import UserController from "../../controllers/app/userController";
import UserMiddleware from "../../middleware/UserMiddleware";
const router = express.Router();



router.post("/register", UserController.register);
router.post("/otp", UserController.OTP);
router.post("/login", UserController.login);
router.get("/categories", UserController.getCategories);
router.get("/products/:category", UserController.getProducts);
router.get("/products", UserController.getAllProducts);
router.get("/userinvoices", UserMiddleware ,UserController.userInvoices);
router.post("/makeinvoice", UserMiddleware ,UserController.makeInvoice);










export default router