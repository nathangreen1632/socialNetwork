import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ThoughtForm from "../components/ThoughtForm";
import PostCard from "../components/PostCard";
import { getThoughts } from "../api/thoughts";

type Thought = {
  _id: string;
  username: string;
  content: string;
  createdAt?: string;
  reactions?: {
    thumbsUp: number;
    thumbsDown: number;
  };
};


function FeedPage(): React.JSX.Element {
  const { token } = useAuth();
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        setLoading(true);
        const data = await getThoughts(token);
        setThoughts(data);
      } catch (error) {
        console.error("Failed to fetch thoughts:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, refreshKey]);


  const handlePostSuccess = () => {
    setRefreshKey((prev) => prev + 1); // triggers useEffect
  };

  let content: React.ReactNode;

  if (loading) {
    content = <p className="text-gray-500 text-center mt-4">Loading thoughts...</p>;
  } else if (thoughts.length === 0) {
    content = <p className="text-gray-500 text-center mt-4">No thoughts posted yet.</p>;
  } else {
    content = thoughts.map((thought) => (
      <PostCard key={thought._id} post={thought} />
    ));
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      <ThoughtForm onPost={handlePostSuccess} />
      {content}
    </div>
  );
}

export default FeedPage;
