import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Thought = {
  id: string | number;
  content: string;
  reactions: {
    thumbsUp: number;
    thumbsDown: number;
  };
};

type Friend = {
  _id: string;
  username: string;
};

function ProfilePage(): React.JSX.Element {
  const { id } = useParams();
  const { token } = useAuth();

  const [user, setUser] = useState<{
    username: string;
    bio: string;
    friends: Friend[];
    thoughts: Thought[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id || !token) return;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          const message = data?.message || "User not found";
          setError(message);
          return;
        }

        setUser(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Something went wrong loading the profile.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, token]);

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600">{error}</p>;
  }

  if (!user) {
    return <p className="text-center mt-8 text-gray-600">No user data available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Profile: {user.username}</h1>
      <p className="mb-6 text-gray-700 italic">{user.bio}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Friends List */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Friends</h2>
          <ul className="list-disc list-inside text-gray-700">
            {user.friends.map((friend: Friend) => (
              <li key={friend._id}>{friend.username}</li>
            ))}
          </ul>
        </div>

        {/* Thoughts */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Thoughts</h2>
          {user.thoughts.map((thought: Thought) => (
            <div key={thought.id} className="border-b pb-3 mb-3">
              <p className="text-gray-800">{thought.content}</p>
              <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                <span>👍 {thought.reactions.thumbsUp}</span>
                <span>👎 {thought.reactions.thumbsDown}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
