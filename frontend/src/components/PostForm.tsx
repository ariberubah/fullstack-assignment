"use client";

import { useEffect, useRef } from "react";

interface PostFormProps {
  open: boolean;
  initialData?: {
    title: string;
    content: string;
  };
  onSubmit: (data: { title: string; content: string }) => void;
  onCancel: () => void;
}

export default function PostForm({
  open,
  initialData,
  onSubmit,
  onCancel,
}: PostFormProps) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    if (open && !modal.open) modal.showModal();
    else if (!open && modal.open) modal.close();
  }, [open]);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const handleClose = () => {
      onCancel();
    };
    modal.addEventListener("close", handleClose);
    return () => modal.removeEventListener("close", handleClose);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const title = titleRef.current?.value ?? "";
    const content = contentRef.current?.value ?? "";
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  }

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
          {initialData ? "Edit Post" : "Create New Post"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              className="input input-bordered w-full"
              defaultValue={initialData?.title ?? ""}
              placeholder="Title"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              ref={contentRef}
              className="textarea textarea-bordered w-full min-h-[120px]"
              defaultValue={initialData?.content ?? ""}
              placeholder="Content"
              required
            />
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={() => {
              (modalRef.current && modalRef.current.open && modalRef.current.close());
              onCancel();
            }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
