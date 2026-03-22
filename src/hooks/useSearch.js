import { useState, useRef, useCallback } from "react";

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const timerRef = useRef(null);

  const search = useCallback((query) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query || query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      setError(null);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      setSearched(true);
      try {
        const res = await fetch(
          `/api/voter-lookup?q=${encodeURIComponent(query.trim())}`
        );
        const data = await res.json();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setError("Search error — please try again");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, []);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setResults([]);
    setSearched(false);
    setError(null);
  }, []);

  return { results, loading, error, searched, search, clear };
}
