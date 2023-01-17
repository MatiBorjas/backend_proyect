import { createTransport } from "nodemailer";
import { TEST_MAIL, TEST_MAIL_PASS, TEST_MAIL_TO } from '../src/config/config.js'

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: TEST_MAIL,
    pass: TEST_MAIL_PASS,
  },
  secureConnection: 'false',
  tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
  }
});

const emailRegistro = async ( username, name, age, address, phone ) => {
  try {
    const mailOptions = {
      from: TEST_MAIL,
      to: TEST_MAIL_TO,
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
    console.info({ message: "Correo enviado", info });
  } catch (err) {
    console.log(err)
  }
};

const emailDeCompra = async (formattedProducts, user) => {
  try {
    const { username, name } = user;

    const mailOptions = {
      from: process.env.TEST_MAIL,
      to: process.env.TEST_MAIL_TO,
      subject: `Nuevo pedido de: ${name}, ${username}`,
      html: `
      <h1>SU PEDIDO</h1>
        
      <div>La compra fue la siguiente:</div>
      <div><p>${formattedProducts.join("</p><p>")}</p></div>
      </div>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.info({ message: "Correo enviado", info });
  } catch (err) {
    console.log(err)
  }
};

export { emailRegistro, emailDeCompra };