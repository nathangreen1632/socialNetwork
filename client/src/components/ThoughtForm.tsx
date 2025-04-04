import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

type ThoughtFormProps = Readonly<{
  onPost: () => void;
}>;

function ThoughtForm({ onPost }: ThoughtFormProps): React.JSX.Element {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token, userId } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!content.trim()) return;

    try {
      const res = await fetch("/api/thoughts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.message || "Something went wrong while posting.";
        setErrorMessage(message);
        return;
      }

      setContent("");
      onPost(); // refresh feed
    } catch (err) {
      console.error("Network or unexpected error:", err);
      setErrorMessage("Unable to reach the server. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2"
        rows={3}
        placeholder="What's on your mind?"
      />

      {errorMessage && (
        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post
      </button>
    </form>
  );
}

export default ThoughtForm;
