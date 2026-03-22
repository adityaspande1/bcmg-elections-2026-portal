import { useState } from "react";
import { CANDIDATE } from "../config";
import { useSearch } from "../hooks/useSearch";
import TopBar from "../components/TopBar";
import HeroSection from "../components/HeroSection";
import GoldStrip from "../components/GoldStrip";
import SearchSection from "../components/SearchSection";
import VoterModal from "../components/VoterModal";

export default function CandidatePortal() {
  const [selectedVoter, setSelectedVoter] = useState(null);
  const { results, loading, error, searched, search, clear } = useSearch();

  return (
    <>
      <TopBar />
      <HeroSection candidate={CANDIDATE}>
        <GoldStrip candidate={CANDIDATE} />
      </HeroSection>
      <SearchSection
        results={results}
        loading={loading}
        error={error}
        searched={searched}
        onSearch={search}
        onClear={clear}
        onViewSlip={(voter) => setSelectedVoter(voter)}
      />
      <footer className="footer">
        <div className="footer-cta">
          Vote <strong>{CANDIDATE.display_name || CANDIDATE.name}</strong> — Serial No.{" "}
          {CANDIDATE.ballot_no} — {CANDIDATE.tagline} — 24 March 2026
        </div>
        <p style={{ fontSize: 11, color: "#a09880", marginTop: 14 }}>
          Electoral Roll data sourced from the{" "}
          <a
            href="https://barcouncilmahgoa.org/election-code-of-conduct/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a09880", textDecoration: "underline" }}
          >
            official BCMG portal
          </a>
        </p>
      </footer>

      {selectedVoter && (
        <VoterModal
          voter={selectedVoter}
          onClose={() => setSelectedVoter(null)}
        />
      )}
    </>
  );
}
