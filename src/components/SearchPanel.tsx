interface SearchPanelProps {
  search: string;
  origin: string;
  destination: string;
  corridor: string;
  onSearchChange: (value: string) => void;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onCorridorChange: (value: string) => void;
  onReset: () => void;
  origins: string[];
  destinations: string[];
  corridors: string[];
  resultCount: number;
  clockLabel: string;
}

export function SearchPanel({
  search,
  origin,
  destination,
  corridor,
  onSearchChange,
  onOriginChange,
  onDestinationChange,
  onCorridorChange,
  onReset,
  origins,
  destinations,
  corridors,
  resultCount,
  clockLabel,
}: SearchPanelProps) {
  return (
    <section className="surface-card tool-card" aria-labelledby="tracker-tool-heading">
      <span className="eyebrow">Official timetable snapshot</span>
      <h2 id="tracker-tool-heading" className="hero-title">
        Pakistan train schedule tracker
      </h2>
      <p className="hero-copy">
        Search train numbers, compare major city pairs, and quickly check whether a published
        departure is still ahead of you today or already in its scheduled journey window.
      </p>

      <div className="meta-strip">
        <div className="meta-pill">
          <strong>14 featured trains</strong>
          <span>Published Pakistan Railways services in the current data pack</span>
        </div>
        <div className="meta-pill">
          <strong>{clockLabel}</strong>
          <span>Pakistan Standard Time used for all timetable windows</span>
        </div>
        <div className="meta-pill">
          <strong>{resultCount} matches</strong>
          <span>Filters update instantly without a page reload</span>
        </div>
      </div>

      <div className="mini-grid" aria-label="Why this version is reliable">
        <div className="mini-stat">
          <strong>No fake delays</strong>
          <span>Only published schedule windows</span>
        </div>
        <div className="mini-stat">
          <strong>Daily services</strong>
          <span>Core long-distance routes</span>
        </div>
        <div className="mini-stat">
          <strong>Official base</strong>
          <span>Curated from PakRail</span>
        </div>
        <div className="mini-stat">
          <strong>Mobile first</strong>
          <span>The tool stays above the fold</span>
        </div>
      </div>

      <div className="filters-grid">
        <div className="field-group">
          <label htmlFor="train-search">Train name, number, city, or corridor</label>
          <input
            id="train-search"
            className="field-control"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Try Green Line, 13 UP, Karachi, or Quetta Corridor"
          />
        </div>

        <div className="field-group">
          <label htmlFor="origin-filter">Origin</label>
          <select
            id="origin-filter"
            className="field-control"
            value={origin}
            onChange={(event) => onOriginChange(event.target.value)}
          >
            <option value="">All origins</option>
            {origins.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="destination-filter">Destination</label>
          <select
            id="destination-filter"
            className="field-control"
            value={destination}
            onChange={(event) => onDestinationChange(event.target.value)}
          >
            <option value="">All destinations</option>
            {destinations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label htmlFor="corridor-filter">Corridor</label>
          <select
            id="corridor-filter"
            className="field-control"
            value={corridor}
            onChange={(event) => onCorridorChange(event.target.value)}
          >
            <option value="">All corridors</option>
            {corridors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="button-row">
        <button type="button" className="primary-button">
          Browse schedules
        </button>
        <button type="button" className="secondary-button" onClick={onReset}>
          Clear filters
        </button>
      </div>

      <div className="helper-row">
        <p>
          This version is intentionally a schedule explorer. It does not invent live delays or
          cancellations when no official public feed is available.
        </p>
      </div>
    </section>
  );
}
