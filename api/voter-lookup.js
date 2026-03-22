export default async function handler(req, res) {
  const { q, candidate_id = "96" } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Missing q parameter" });
  }

  try {
    const response = await fetch(
      `https://bcmg-election-2026.vercel.app/api/search?q=${encodeURIComponent(q)}&candidate_id=${encodeURIComponent(candidate_id)}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "Lookup failed" });
  }
}
