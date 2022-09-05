import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECTION_URI: string;
      TOKEN_SECRET: Secret;
    }
  }
}

export {};
