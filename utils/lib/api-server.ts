const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const serverFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    next: { revalidate: 0 },
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }

  return res.json();
};
