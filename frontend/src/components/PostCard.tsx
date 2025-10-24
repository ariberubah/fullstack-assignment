"use client";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

interface PostCardProps {
  post: Post;
  canEdit?: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
}

export default function PostCard({ post, canEdit, onEdit, onDelete }: PostCardProps) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <div className="card-body">
        <h2 className="card-title break-words">{post.title}</h2>
        <p className="text-gray-600 whitespace-pre-line break-words">{post.content}</p>
        <div className="text-sm text-gray-400 mt-2">by {post.author}</div>

        {canEdit && (
          <div className="card-actions justify-end mt-4">
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline btn-error"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
