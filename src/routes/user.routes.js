//const { authJwt } = require("../middlewares");
// const controller = require("../controllers/user.controller");
//import {authJwt} from "../middleware";
import express from "express";
import userController from "../controllers/user.controller";


var multer = require("multer");
var upload = multer({ dest: "uploads/" });



const router = express.Router();

router.get("/all", userController.getUsers);
router.post("/signup", userController.addUsers);
router.post("/login", userController.loginUsers);
router.post("/bulkupload", upload.single("file"), userController.bulkUpload);
router.put("/updateUser", userController.updateUser);
router.delete("/deleteUser",userController.deleteUser );

export default router;



