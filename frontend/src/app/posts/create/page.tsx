"use client";

import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";

export default function CreatePostPage() {
  const router = useRouter();

  const handleCreate = async (data: { title: string; content: string }) => {
    const res = await fetch("http://localhost:8787/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to create post");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <PostForm submitText="Create" onSubmit={handleCreate} />
    </div>
  );
}
