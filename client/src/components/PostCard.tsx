import React from "react";

type Post = {
 readonly _id: string;
 readonly content: string;
 readonly createdAt?: string;
 readonly username?: string; // author name
 readonly reactions?: {
   readonly thumbsUp: number;
   readonly thumbsDown: number;
  };
};

type PostCardProps = Readonly<{
  post: Post;
}>;

function PostCard({ post }: PostCardProps): React.JSX.Element {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <p className="font-semibold text-gray-800">{post.username ?? "Unknown"}</p>
        <p className="text-xs text-gray-500">
          {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Just now"}
        </p>
      </div>
      <p className="text-gray-700 mb-2">{post.content}</p>

      <div className="flex space-x-4 text-sm text-gray-600">
        <span>👍 {post.reactions?.thumbsUp ?? 0}</span>
        <span>👎 {post.reactions?.thumbsDown ?? 0}</span>
      </div>
    </div>
  );
}


export default PostCard;
