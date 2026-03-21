import { useState, useRef, useCallback } from "react";

export default function SearchSection({
  results,
  loading,
  error,
  searched,
  onSearch,
  onClear,
  onViewSlip,
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const debouncedSearch = useCallback(
    (val) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (!val || val.trim().length < 3) {
        onClear();
        return;
      }
      debounceRef.current = setTimeout(() => {
        onSearch(val);
      }, 800);
    },
    [onSearch, onClear]
  );

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    debouncedSearch(val);
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setQuery("");
    onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length >= 2) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onSearch(query);
    }
  };

  return (
    <main className="search-section">
      <div className="search-header">
        <h2 className="search-title">Find Your Entry in the Electoral Roll</h2>
        <p className="search-subtitle">
          Search and download your Voting Slip from the BCMG Electoral Roll 2026
        </p>
        <div className="search-wrap">
          <span className="search-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Enter name or enrolment number..."
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="search-clear"
              onClick={handleClear}
              style={{ display: "flex" }}
            >
              &#10005;
            </button>
          )}
        </div>
        <div className="search-hints">
          <span className="search-hint">Full Name</span>
          <span className="search-hint">Enrolment No.</span>
          <span className="search-hint">Sr. No.</span>
        </div>
      </div>

      <div style={{ minHeight: 80 }}>
        {loading && (
          <div className="spinner-wrap">
            <div className="spinner" />
          </div>
        )}

        {error && (
          <div className="no-results">
            <div style={{ fontSize: 16, fontWeight: 600, color: "#333" }}>{error}</div>
          </div>
        )}

        {!loading && !error && searched && results.length === 0 && (
          <div className="no-results">
            <div style={{ fontSize: 15, fontWeight: 600, color: "#333" }}>
              No entries found
            </div>
            <div style={{ color: "#8a7e6a", marginTop: 6, fontSize: 13 }}>
              Try a different name or enrolment number
            </div>
          </div>
        )}

        {!loading && !error && results.length > 0 && (
          <>
            <div className="results-count">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </div>
            {results.map((v, i) => (
              <div
                key={v.id || i}
                style={{
                  animation: `fadeUp .3s ease ${i * 0.04}s both`,
                }}
              >
                <button className="result-btn" onClick={() => onViewSlip(v, i)}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <div className="result-serial">{v.sr_no}</div>
                    <div>
                      <div className="result-name">{v.name}</div>
                      <div className="result-meta">
                        {v.enrollment_raw || ""} &middot; {v.district || ""}
                      </div>
                    </div>
                  </div>
                  <div className="result-viewbtn">View Slip</div>
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </main>
  );
}
