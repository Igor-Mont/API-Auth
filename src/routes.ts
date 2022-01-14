import { Router } from "express";
import { ensureAuthenticate } from "./app/middlewares/ensureAuthenticate";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";

const router = Router();

router.post("/users", UserController.handle);
router.post("/auth", AuthController.handle);
router.get("/users", ensureAuthenticate, UserController.verify);

export { router };