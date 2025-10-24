import { Hono } from "hono";
import dotenv from "dotenv";
import path from "path";
import auth from "./routes/auth";
import posts from "./routes/posts";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = new Hono();
app.use("*", async (c, next) => {
  if (c.req.method === "OPTIONS") {
    return new Response("", {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return next();
});

app.route("/api/auth", auth);
app.route("/api/posts", posts);

app.get("/", (c) => c.text("Welcome to IM Pratama API 🚀"));
app.get("/health", (c) => c.json({ status: "ok" }));

app.onError((err, c) => {
  console.error("Unhandled error:", err);
  return c.json({ error: err.message || "Internal Server Error" }, 500);
});

const port = Number(process.env.PORT) || 3000;
console.log(`✅ Server running at http://localhost:${port}`);

Bun.serve({
  fetch: app.fetch,
  port,
});
