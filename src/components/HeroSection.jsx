import { useState } from "react";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].substring(0, 2).toUpperCase();
}

export default function HeroSection({ candidate }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const c = candidate;
  const displayName = c.display_name || c.name;
  const numLabel = "Ballot No.";

  const defaultAppeal = `I humbly seek your valuable support in the upcoming BCMG Election 2026. With a deep commitment to upholding the interests of our legal fraternity, I request you to kindly cast your vote for <strong style="color:#e8dcc0">${displayName}</strong> as your <strong style="color:var(--gold)">${c.tagline}</strong>.`;

  return (
    <header className="hero">
      {c.photo_url && (
        <div className="hero-bg-image">
          <img src={c.photo_url} alt="" />
        </div>
      )}
      <div className="hero-inner">
        <div className="candidate-photo">
          {c.photo_url && !imgLoaded && (
            <span>{getInitials(c.name)}</span>
          )}
          {c.photo_url ? (
            <img
              src={c.photo_url}
              alt={displayName}
              onLoad={() => setImgLoaded(true)}
              style={{
                display: imgLoaded ? "block" : "none",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <span>{getInitials(c.name)}</span>
          )}
        </div>
        <div className="candidate-info">
          <h1 className="candidate-name">{displayName}</h1>
          <p className="candidate-title">{c.title}</p>
          <p className="candidate-ballot">
            {numLabel} <b>{c.ballot_no}</b>
          </p>
          <div className="candidate-tagline-badge">{c.tagline}</div>
        </div>
      </div>

      <div className="appeal">
        <div>
          <p className="appeal-heading">
            Dear Members of the Bar Council of Maharashtra &amp; Goa,
          </p>
          <p
            className="appeal-text"
            dangerouslySetInnerHTML={{ __html: defaultAppeal }}
          />
        </div>
      </div>
    </header>
  );
}
