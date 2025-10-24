"use client";

import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import toast from "react-hot-toast";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface PostPayload {
  title: string;
  content: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  async function fetchPosts() {
    try {
      const res = await fetch("http://localhost:8787/api/posts");
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data: Post[] = await res.json();
      setPosts(data);
    } catch {
      toast.error("Gagal memuat data post");
    }
  }

  useEffect(() => {
    fetchPosts();
    setToken(localStorage.getItem("token"));
  }, []);

  function openConfirm(message: string, action: () => void) {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    (document.getElementById("confirm_modal") as HTMLDialogElement)?.showModal();
  }

  async function handleCreate(data: PostPayload) {
    if (!token) return toast.error("You must be logged in");

    openConfirm("Are you sure you want to create this post?", async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8787/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to create post");
        }

        toast.success("Post created successfully!");
        setOpenModal(false);
        fetchPosts();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    });
  }

  async function handleUpdate(data: PostPayload) {
    if (!token || !editingPost) return toast.error("Invalid operation");

    openConfirm("Are you sure you want to update this post?", async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8787/api/posts/${editingPost.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          }
        );

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to update post");
        }

        toast.success("Post updated successfully!");
        setEditingPost(null);
        setOpenModal(false);
        fetchPosts();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    });
  }

  async function handleDelete(id: number) {
    if (!token) return toast.error("You must be logged in");

    openConfirm("Are you sure you want to delete this post?", async () => {
      try {
        const res = await fetch(`http://localhost:8787/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to delete post");
        }

        toast.success("Post deleted successfully!");
        fetchPosts();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Unexpected error");
      }
    });
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Posts</h1>
        {token && (
          <button
            onClick={() => {
              setEditingPost(null);
              setOpenModal(true);
            }}
            className="btn btn-primary"
          >
            + New Post
          </button>
        )}
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              canEdit={!!token}
              onEdit={(p) => {
                setEditingPost(p);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>

      {/* Modal Form */}
      <PostForm
        open={openModal}
        initialData={editingPost || undefined}
        onSubmit={editingPost ? handleUpdate : handleCreate}
        onCancel={() => {
          setOpenModal(false);
          setEditingPost(null);
        }}
      />

      {/* Modal Konfirmasi */}
      <dialog id="confirm_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Confirmation</h3>
          <p>{confirmMessage}</p>
          <div className="modal-action">
            <form method="dialog" className="space-x-2">
              <button className="btn">Cancel</button>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  if (confirmAction) await confirmAction();
                }}
              >
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </main>
  );
}
