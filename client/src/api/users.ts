export async function getUserById(id: string, token: string) {
  const res = await fetch(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
