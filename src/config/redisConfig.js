import { redis } from "redis";
import { session } from "express-session";
import { connectRedis } from "connect-redis";
import { REDIS_HOST } from "./config";


const client = redis.createClient({ legacyMode: true });
client.connect();

const RedisStore = connectRedis(session);

const redisSession = (app) => {
  app.use(
    session({
      store: new RedisStore({ 
        host: REDIS_HOST, 
        port: 6379, 
        client, 
        ttl: 300
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

export { redisSession };