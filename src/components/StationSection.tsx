import { StationProfile } from "../types";

interface StationSectionProps {
  stations: StationProfile[];
}

export function StationSection({ stations }: StationSectionProps) {
  return (
    <section className="surface-card section-card" aria-labelledby="station-section-title">
      <h2 id="station-section-title" className="section-title">
        Key station profiles
      </h2>
      <p className="section-copy">
        These station cards use official summary information so travelers can cross-check major hubs
        without leaving the tool.
      </p>

      <div className="station-grid" style={{ marginTop: 18 }}>
        {stations.map((station) => (
          <article key={station.code} className="station-card">
            <h3>{station.name}</h3>
            <p>{station.city}</p>
            <div className="station-meta">
              <span>
                <strong>Code:</strong> {station.code}
              </span>
              <span>
                <strong>Established:</strong> {station.established}
              </span>
              <span>
                <strong>Traffic:</strong> {station.dailyTrains}
              </span>
              <span>
                <strong>Helpline:</strong> {station.helpline}
              </span>
              <span>
                <strong>Address:</strong> {station.address}
              </span>
            </div>
            <ul>
              {station.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a href={station.sourceUrl} target="_blank" rel="noopener noreferrer" className="source-note">
              Open official source
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
