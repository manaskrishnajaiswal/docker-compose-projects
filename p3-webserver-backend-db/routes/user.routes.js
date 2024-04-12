import express from "express";
import {
  userAddController,
  userDeleteController,
  userGetController,
  usersGetController,
  userUpdateController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(usersGetController).post(userAddController);
router
  .route("/:id")
  .get(userGetController)
  .put(userUpdateController)
  .delete(userDeleteController);

export default router;
