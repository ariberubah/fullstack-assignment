"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PostForm from "@/components/PostForm";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8787/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async (data: { title: string; content: string }) => {
    const res = await fetch(`http://localhost:8787/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to update post");
    }
  };

  if (!post) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <PostForm
        initialData={post}
        onSubmit={handleUpdate}
        submitText="Update"
      />
    </div>
  );
}
