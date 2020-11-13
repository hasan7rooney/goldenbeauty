import UserController from "../../controllers/dash/adminController";
import router from "../user/v1";





router.post("/makecategory", UserController.makeCategory);//
router.post("/makeproduct", UserController.makeProduct);//
router.get("/allinvoices", UserController.allInvoices);//
export default router
