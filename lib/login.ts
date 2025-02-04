export default async function login(email: string, password: string) {
  try {
    const token = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const res = await token.json();
    return res;
  } catch (error) {
    throw error;
  }
}
