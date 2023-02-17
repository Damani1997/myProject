import db from "../models";

const User = db.user;

checkDuplicateUsername = (req, res, next)=>{

  User.findOne({
    username: req.body.username
  }).exec((err,user)=>{
    if(err){
      res.status(500).send({message:err});
      return;
    }

    if(user){
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    next();
  })

};

const verifySignups={
  checkDuplicateUsername
};

export default verifySignups;