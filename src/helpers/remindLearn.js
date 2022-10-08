const Users = require("../models/userModel");
const sendMail = require("../helpers/sendMail");

const ONE_HOURS = 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;

const getNewUsers = async () => {
  try {
    const checkDateNewUser = new Date(Date.now() - 5 * ONE_HOURS);
    const checkDateOldFC = new Date(Date.now() - 2 * ONE_MINUTE);

    const newUsers = await Users.find({
      // lay user duoc create cach hien tai 5 gio
      createdAt: { $gt: checkDateNewUser },
    }).populate("flashcardBM.flashcard");

    newUsers.forEach((val) => {
      const oldFlashcard = val.flashcardBM.filter((val) => {
        // lay flashcard k duoc truy cap checkDateOldFC phut
        return val.lastVisited < checkDateOldFC;
      });

      if (oldFlashcard.length > 0) {
        remind(val, oldFlashcard);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const remind = async (user, oldFlashcard) => {
  const titles = oldFlashcard.map((val) => {
    return val.flashcard.title;
  });
  const content = titles.join(",");
  try {
    const sended = await sendMail({
      to: user.email,
      from: process.env.MAIL_SENT_ADDRESS,
      subject: "hoc de",
      html: `<h1>Hoc ${content} de</h1>`,
    });
    console.log(sended);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getNewUsers;
