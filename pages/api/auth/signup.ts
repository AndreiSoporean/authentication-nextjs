import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from "../../../lib/auth";
import { connectToDataBase } from "../../../lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { email, username, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 5) {
    res.status(422).json({ message: "Invalid input!" })
    return;
  }

  const client = await connectToDataBase();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User already exists!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password)

  const result = await db.collection('users').insertOne({
    email,
    password: hashedPassword,
    username
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;