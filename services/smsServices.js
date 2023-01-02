import twilio from "twilio";

const ACCOUNT_SID = process.env.ACCOUNT_SID_TWILIO;
const AUTH_TOKEN = process.env.AUTH_TOKEN_TWILIO;
const PHONE_NUMBER = process.env.SMSFROM;
const PHONETO = process.env.SMSTO;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const enviarSMS = async (body) => {
  try {
    const message = await client.messages.create({
      body,
      from: PHONE_NUMBER,
      to: PHONETO,
    });
  } catch (e) {
    console.log(e);
  }
};

export { enviarSMS };