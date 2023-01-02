import twilio from "twilio";

const ACCOUNT_SID = process.env.ACCOUNT_SID_TWILIO;
const AUTH_TOKEN = process.env.AUTH_TOKEN_TWILIO;
const PHONE_NUMBER = process.env.FROMWSP;
const TOWHATSAPP = process.env.TOWSP;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const enviarWhatsapp = async (body) => {
  try {
    await client.messages
      .create({
        body,
        from: PHONE_NUMBER,
        to: TOWHATSAPP,
      })
      .then((message) => console.log(message.sid))
      .done();
  } catch (e) {
    console.log(e);
  }
};

export { enviarWhatsapp };