import session from "express-session";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import { MONGOATLASUSR, MONGOATLASPW } from "./config.js";

let mongoDBStore = connectMongoDBSession(session);

const mongoSession = (app) => {
  app.use(
    session({
      store: new mongoDBStore({ 
        uri: `mongodb+srv://${MONGOATLASUSR}:${MONGOATLASPW}@ecommerce.sewmc4q.mongodb.net/?retryWrites=true&w=majority`,
      collection: 'session'
      }),
      secret: "keyboard cat",
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 86400000,
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );
}

export { mongoSession };