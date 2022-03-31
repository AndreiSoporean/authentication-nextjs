// @ts-ignore
import { MongoClient } from "mongodb";

export async function connectToDataBase() {
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lkcdg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
}
