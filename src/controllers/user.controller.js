import { db } from "../models/user.model";
import userService from "../service/user.service";



var multer = require("multer");

export default class UserController {

  static async getUsers(req, res) {
    const result = await userService.getAllUser();
    res.send(result);
  }
  static async addUsers(req, res) {
    const result = await userService.addNewUser(
      req.body.name,
      req.body.password,
      req.body.email
    );

    res.send(result);
  }

  static async loginUsers(req,res){
    const result = await userService.loginUser(

      req.body.password,
      req.body.email
    );

    res.send(result);

  }
  static async bulkUpload(req,res){
    {
      const result = await userService.bulkUploadUser(
        req.file.path
      );
      res.send(result.message);
    }}

    static async deleteUser(req,res){
      const result= await userService.deleteUser(req.body.email)
      res.send(result)
    }
    
    static async updateUser(req,res){
      const result= await userService.updateUser(req.body.oldEmail, req.body.newEmail)
      res.send(result)
    }}
