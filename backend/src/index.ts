import { db } from "./lib/db";

async function testConnection() {
  try {
    const result = await db.query("SELECT NOW()");
    console.log("✅ Database connected!");
    console.log("Server time:", result.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

testConnection();
