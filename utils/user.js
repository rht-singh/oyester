const { User } = require("../models");

let checkIfUserverified = async (email) => {
  return User.findOne({
    where: {
      email:email,
      verified: "Yes",
    },
  });
};

let checkIfUserExists = async (email) => {
  return User.findOne({
    where: {
      email:email
    },
  });
};
module.exports={
  checkIfUserExists,
  checkIfUserverified
}