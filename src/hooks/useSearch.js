import { useState, useRef, useCallback } from "react";
import { BMC_API } from "../config";

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
        const res = await fetch(BMC_API, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify({ searchText: query.trim().toUpperCase(), page: 1 }),
        });
        const json = await res.json();
        const data = json?.d?.data || [];
        setResults(
          data.map((item) => ({
            id: item.FormNumber,
            sr_no: item.SrNo,
            name: item.Name,
            enrollment_raw: item.EnrollmentRaw,
            district: item.District,
            taluka: item.Taluka,
            bar: item.Bar,
            booth_name: item.BoothName,
            booth_no: item.BoothNo,
          }))
        );
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
