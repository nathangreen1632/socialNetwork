export async function getThoughts(token: string) {
  const res = await fetch("/api/thoughts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch thoughts");
  }

  return res.json();
}

export async function postThought(token: string, userId: string, content: string) {
  const res = await fetch("/api/thoughts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, content }),
  });

  if (!res.ok) {
    throw new Error("Failed to create thought");
  }

  return res.json();
}
