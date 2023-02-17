import db from "../models";

const jwt = require("jsonwebtoken");

var csv = require("csvtojson");

export default class userService {

 

  static async getAllUser() {
    const user = await db.user.find({});
    //console.log(user);
    return user;
  }

  static async addNewUser(name, password, email) {
    const duplicateUser = await db.user.findOne({ email: email });
    if (duplicateUser) {
      return "User is duplicate";
    } else {
      const inputUser = {
        email: email,
        name: name,
        password: password,
      };
      
        const newUser = new db.user({
          email: email,
          name: name,
          password: password,
        });
        const result = newUser.save();
        return result.then((response) => response).catch((err) => err);
    }
  }

  static async bulkUploadUser(path) {
    // console.log(path);

    return csv()
      .fromFile(path)

      .then((jsonObj) => {
        var list = [];
        for (var i = 0; i < jsonObj.length; i++) {
          var obj = {};
          obj.name = jsonObj[i]["name"];
          obj.password = jsonObj[i]["password"];
          obj.email = jsonObj[i]["email"];
          list.push(obj);
        }
        console.log(list);

        return db.user.insertMany(list, { ordered: false }).then(function () {
          return{message: "Users uploaded successfully "}
        });
      })
      .catch(function (error) {
        var docs = [];

        for (var x in error.insertedDocs) {
          docs.push(
            error.insertedDocs[x].name + ":" + error.insertedDocs[x].email
          );
        }
        if (error.insertedDocs.length === 0) {
          return {message:"No data has been uploaded"};
        } else {
          return {
            message:
              "Uploading successfully done for only following name and email id " +
              docs +
              " Please check data for other records",
            error,
          };
        }
      });
  }

  static async loginUser(password, email) {
    const user = await db.user.findOne({ email: email });

    if (!user) {
      return "user not found";
    }

    // check if password matches
    else {
      console.log(password);
      console.log(user.password);
      if (password === user.password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "xyz"
        );
        return token;
      } else {
        return "invalid password";
      }
    }
  }
  static async deleteUser(email){
    const result = await db.user.deleteOne({ email: email }, { w: 1, j: true, wtimeout: 30000 });
  if (result.deletedCount === 0) {
    return "User not found"
  }
else{
  // Return a success message
 return"User deleted successfully"}
  }
  static async updateUser(oldEmail, newEmail)
  {
    const user = await db.user.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail },
      { new: true }
    );
  if (!user) {
    const result= "User not found, cannot update email"
    return result
  }
else{
  // Update the user's email in the database
 
   // Return the updated user object
  return "User updated successfully"}}

}

module.exports = userService ;