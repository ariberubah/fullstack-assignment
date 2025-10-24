import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) return c.json({ message: "Unauthorized" }, 401);

  const secret = process.env.JWT_SECRET || "default_secret";

  try {
    const decoded = jwt.verify(token, secret);
    (c as any).set("user", decoded);
    await next();
  } catch {
    return c.json({ message: "Invalid or expired token" }, 401);
  }
};
