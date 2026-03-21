import { CANDIDATE, CARD_BASE } from "../config";

export default function VoterModal({ voter, onClose }) {
  if (!voter) return null;

  const c = CANDIDATE;
  const numLabel = "Ballot No.";
  const imgUrl = `${CARD_BASE}/${voter.id}?candidate=${c.ballot_no}`;

  const shareMsg = `BCMG Election 2026\n\nName: ${voter.name}\nSr. No: ${voter.sr_no}\nEnrolment: ${voter.enrollment_raw || ""}\n\nPlease vote for ${c.display_name || c.name} (${numLabel} ${c.ballot_no}) as ${c.tagline}!\n\nView your Voting Slip: ${window.location.origin}/${c.ballot_no}`;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(shareMsg)}`;

  const forceDownload = () => {
    fetch(imgUrl)
      .then((r) => r.blob())
      .then((b) => {
        const u = URL.createObjectURL(b);
        const a = document.createElement("a");
        a.href = u;
        a.download = `BCMG_Slip_${voter.sr_no}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(u);
      })
      .catch(() => window.open(imgUrl, "_blank"));
  };

  const details = [
    ["Enrolment No.", voter.enrollment_raw || "\u2014"],
    ["District", voter.district || "\u2014"],
    ["Taluka", voter.taluka || "\u2014"],
    ["Bar Association", voter.bar || "\u2014"],
    ["Polling Booth", voter.booth_name || "\u2014"],
    ["Booth No.", voter.booth_no || "\u2014"],
  ];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div style={{ flex: 1 }}>
            <div className="modal-serial-badge">{voter.sr_no}</div>
            <h2 className="modal-name">{voter.name}</h2>
            <div className="modal-reg">{voter.enrollment_raw || ""}</div>
          </div>
          <button className="modal-close" onClick={onClose}>
            &#10005;
          </button>
        </div>

        <div className="img-display">
          <div id="slipLoading" style={{ textAlign: "center", padding: 24 }}>
            <div className="spinner" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 14, color: "#888", fontWeight: 600 }}>
              Voting Slip Loading...
            </div>
          </div>
          <img
            src={imgUrl}
            alt="Voting Slip"
            style={{ display: "none" }}
            onLoad={(e) => {
              e.target.style.display = "block";
              const loader = e.target.previousSibling;
              if (loader) loader.style.display = "none";
            }}
            onError={(e) => {
              const loader = e.target.previousSibling;
              if (loader)
                loader.innerHTML =
                  '<div style="font-size:14px;color:#888;font-weight:600">Slip being generated... please refresh</div>';
            }}
          />
        </div>

        <div className="detail-rows">
          {details.map(([label, value], i) => (
            <div className="detail-row" key={i}>
              <div>
                <div className="detail-label">{label}</div>
                <div className="detail-value">{String(value)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="dl-buttons">
          <button className="dl-btn dl-btn-primary" onClick={forceDownload}>
            Download Slip
          </button>
        </div>

        <div style={{ padding: "0 20px 16px" }}>
          <button
            className="wa-btn"
            onClick={() => window.open(waUrl, "_blank")}
          >
            Share via WhatsApp
          </button>
        </div>

        <div className="modal-footer-appeal">
          <strong style={{ color: "var(--navy-700)" }}>Vote {c.display_name || c.name}</strong>{" "}
          <span style={{ color: "var(--text-light)" }}>
            — {numLabel} {c.ballot_no} — {c.tagline}
          </span>
        </div>
      </div>
    </div>
  );
}
