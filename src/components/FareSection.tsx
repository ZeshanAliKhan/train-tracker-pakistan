import { FareHighlight } from "../types";

interface FareSectionProps {
  fares: FareHighlight[];
}

export function FareSection({ fares }: FareSectionProps) {
  return (
    <section className="surface-card section-card" aria-labelledby="fare-section-title">
      <h2 id="fare-section-title" className="section-title">
        Published fare highlights
      </h2>
      <p className="section-copy">
        These sample fares are useful for quick trip planning. Always confirm the latest class and
        quota availability when you book.
      </p>

      <div className="fare-grid" style={{ marginTop: 18 }}>
        {fares.map((fare) => (
          <article key={fare.route} className="fare-card">
            <h3>{fare.route}</h3>
            <div className="fare-meta">
              <span>
                <strong>From fare:</strong> {fare.fromFare}
              </span>
              <span>
                <strong>Class:</strong> {fare.className}
              </span>
              <span>
                <strong>Typical duration:</strong> {fare.duration}
              </span>
              <span>
                <strong>Common trains:</strong> {fare.trains}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
