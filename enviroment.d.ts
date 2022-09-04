declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_CONNECTION_URI: string;
    }
  }
}

export {};
