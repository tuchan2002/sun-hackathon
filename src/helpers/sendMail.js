const nodemailer = require("nodemailer");
const googleapis = require("googleapis");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFESH_TOKEN = process.env.GOOGLE_REFESH_TOKEN;
const MAIL = process.env.MAIL_SENT_ADDRESS;

const oAuth2Client = new googleapis.Auth.OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFESH_TOKEN });

const sendMail = async (mailOption) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        type: "OAuth2",
        user: MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const info = await transporter.sendMail(mailOption);
    return info;
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
