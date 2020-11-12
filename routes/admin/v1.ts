import UserController from "../../controllers/app/userController";
import router from "../user/v1";





router.post("/makeCategory", UserController.makeCategory);//
router.post("/makeProduct/:category", UserController.makeProduct);//
export default router
