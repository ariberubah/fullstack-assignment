import { Hono } from "hono";
import { db } from "../lib/db";
import { authMiddleware } from "../middleware/authMiddleware";

const posts = new Hono();


posts.get("/", async (c) => {
  const result = await db.query(
    "SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.user_id = users.id ORDER BY created_at DESC"
  );
  return c.json(result.rows);
});


posts.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await db.query(
    "SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1",
    [id]
  );
  if (result.rows.length === 0) return c.json({ message: "Post not found" }, 404);
  return c.json(result.rows[0]);
});


posts.post("/", authMiddleware, async (c) => {
  const { title, content } = await c.req.json();
  const user = (c as any).get("user"); 

  const result = await db.query(
    "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
    [user.id, title, content]
  );

  return c.json({ message: "Post created successfully", data: result.rows[0] }, 201);
});


posts.put("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const { title, content } = await c.req.json();
  const user = (c as any).get("user");

  const existing = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  if (existing.rows.length === 0) return c.json({ message: "Post not found" }, 404);
  if (existing.rows[0].user_id !== user.id) return c.json({ message: "Forbidden" }, 403);

  const result = await db.query(
    "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id]
  );

  return c.json({ message: "Post updated successfully", data: result.rows[0] });
});


posts.delete("/:id", authMiddleware, async (c) => {
  const id = c.req.param("id");
  const user = (c as any).get("user");

  const existing = await db.query("SELECT * FROM posts WHERE id = $1", [id]);
  if (existing.rows.length === 0) return c.json({ message: "Post not found" }, 404);
  if (existing.rows[0].user_id !== user.id) return c.json({ message: "Forbidden" }, 403);

  await db.query("DELETE FROM posts WHERE id = $1", [id]);
  return c.json({ message: "Post deleted successfully" });
});

export default posts;
