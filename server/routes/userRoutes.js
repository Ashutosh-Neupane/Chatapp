import express from "express";
import { signup, login, updateProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const UserRouter = express.Router();

UserRouter.post("/signup", signup);
UserRouter.post("/login", login);

UserRouter.get("/checkauth", isAuthenticated, (req, res) => {
  res.json({ success: true, user: req.user });
});

UserRouter.put("/updateProfile", isAuthenticated, updateProfile);


export default UserRouter;
