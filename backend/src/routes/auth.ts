import { Hono } from "hono";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const auth = new Hono();

auth.post("/signup", async (c) => {
  const { name, email, password } = await c.req.json();

  const existingUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  if (existingUser.rows.length > 0) {
    return c.json({ message: "Email already registered" }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, hashedPassword]
  );

  return c.json({ message: "User created successfully" });
});

auth.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) return c.json({ message: "User not found" }, 404);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return c.json({ message: "Invalid password" }, 401);

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
  return c.json({ token });
});

export default auth;
