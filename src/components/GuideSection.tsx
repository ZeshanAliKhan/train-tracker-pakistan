export function GuideSection() {
  return (
    <section className="surface-card section-card" aria-labelledby="guide-section-title">
      <h2 id="guide-section-title" className="section-title">
        How to use this train tracker
      </h2>
      <div className="section-stack">
        <div>
          <p className="section-copy">
            Start with the search box if you already know the train number, then narrow the list by
            origin, destination, or corridor. The results are sorted so services already in their
            published journey window show up before later departures.
          </p>
        </div>
        <div>
          <p className="section-copy">
            When you tap a result, the detail panel gives you the published departure, arrival,
            duration, route codes, and service note. This is much more honest than showing invented
            delays, because public Pakistan Railways schedule pages do not expose a verified live
            operating feed for this route pack.
          </p>
        </div>
      </div>
    </section>
  );
}
