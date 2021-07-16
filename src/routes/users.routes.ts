import { Router } from "express";
import multer from "multer";

import upload from "../config/upload";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarUserController } from "../modules/accounts/useCases/updateAvatarUser/UpdateAvatarUserController";

const usersRoutes = Router();

const uploadMulter = multer(upload.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateAvatarUserController = new UpdateAvatarUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadMulter.single("avatar"),
  updateAvatarUserController.handle
);

export { usersRoutes };
