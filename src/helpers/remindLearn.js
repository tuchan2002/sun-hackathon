const Users = require("../models/userModel");
const Flashcards = require("../models/flashcardModel");

const getNewUsers = async () => {
  try {
    // console.log(date.toLocaleTimeString());

    // get user created 3 hours ago
    const checkDate = new Date(Date.now() - 3 * 60 * 60 * 1000);
    const newUsers = await Users.find({
      createdAt: { $lt: checkDate },
    });

    return newUsers;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getNewUsers;
