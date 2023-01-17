import { mongoose } from "mongoose" ;

import { MONGOATLASUSR, MONGOATLASPW } from "../src/config/config.js";

const connectMongoDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${MONGOATLASUSR}:${MONGOATLASPW}@ecommerce.sewmc4q.mongodb.net/?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log({ message: "Conectado a Mongo Atlas" });
    })
    .catch((err) => console.log({ message: err }));
};

const disconnectMongoDB = () => {
  mongoose.connection.close();
  console.log({ message: "Desconectado de Mongo DB" });
};

export { connectMongoDB, disconnectMongoDB };