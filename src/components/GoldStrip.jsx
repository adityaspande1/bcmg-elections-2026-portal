export default function GoldStrip({ candidate }) {
  return (
    <div className="gold-strip-wrapper">
      <div className="gold-strip">
        <div className="gold-strip-item">
          <div className="gold-strip-label">Election Date</div>
          <div className="gold-strip-value">24 March 2026</div>
        </div>
        <div className="gold-strip-divider" />
        <div className="gold-strip-item">
          <div className="gold-strip-label">Ballot No.</div>
          <div className="gold-strip-value gold-strip-ballot">
            {candidate.ballot_no}
          </div>
        </div>
        <div className="gold-strip-divider" />
        <div className="gold-strip-item">
          <div className="gold-strip-label">Contact</div>
          <div className="gold-strip-value">
            {candidate.mobile ? (
              <a
                href={`tel:+91${candidate.mobile}`}
                style={{ color: "#0f2137" }}
              >
                +91 {candidate.mobile}
              </a>
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
