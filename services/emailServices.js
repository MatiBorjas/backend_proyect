import { createTransport } from "nodemailer";
// import { logger } from "../src/utils/loggers";

const transporter = createTransport({
  service: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.TEST_MAIL,
    pass: process.env.TEST_MAIL_PASS,
  },
});

const emailRegistro = async ({ username, name, age, address, phone }) => {
  try {
    const mailOptions = {
      from: process.env.TEST_MAIL,
      to: process.env.TEST_MAIL,
      subject: `Ud. se ha registrado correctamete`,
      html: `
      <h1>SU USUARIO HA SIDO REGISTRADO</h1>
      <h2>${name} se ha registrado exitosamente con su usuario: ${username}</h2>
      <p>Edad: ${age}</p>
      <p>Direccion: ${address}</p>
      <p>Telefono Celular: ${phone}</p>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info({ message: "Correo enviado", info });
  } catch (err) {
    console.log(err)
    // errorLogger.error(err);
  }
};

const emailDeCompra = async (formattedProducts, user) => {
  try {
    const { username, name, age, address, phone, image } = user;

    const mailOptions = {
      from: process.env.TEST_MAIL,
      to: process.env.TEST_MAIL,
      subject: `Nuevo pedido de: ${name}, ${username}`,
      html: `
      <h1>SU PEDIDO</h1>
        
      <div>La compra fue la siguiente:</div>
      <div><p>${formattedProducts.join("</p><p>")}</p></div>
      </div>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    logger.info({ message: "Correo enviado", info });
  } catch (err) {
    console.log(err)
    // errorLogger.error(err);
  }
};

export { emailRegistro, emailDeCompra };