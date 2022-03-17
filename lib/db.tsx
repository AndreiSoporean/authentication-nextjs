// @ts-ignore
import { MongoClient } from "mongodb";

export async function connectToDataBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://andreisop:c4PaPY5BgKhpw6v@cluster0.lkcdg.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
}
