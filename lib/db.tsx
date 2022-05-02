// @ts-ignore
import { MongoClient } from "mongodb";

export async function connectToDataBase() {
  const isDev = process.env.NODE_ENV === "development";
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@cluster0.lkcdg.mongodb.net/${
    isDev ? process.env.DB_NAME : process.env.DB_PROD_NAME
  }?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
}
