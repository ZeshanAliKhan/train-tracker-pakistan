import { FormEvent, useEffect, useMemo, useState } from "react";
import { FAQSection } from "./components/FAQSection";
import { FareSection } from "./components/FareSection";
import { GuideSection } from "./components/GuideSection";
import { RelatedLinks } from "./components/RelatedLinks";
import { SearchPanel } from "./components/SearchPanel";
import { StationSection } from "./components/StationSection";
import { TrainDetailPanel } from "./components/TrainDetailPanel";
import { TrainResults } from "./components/TrainResults";
import {
  fareHighlights,
  OFFICIAL_SOURCE_NOTE,
  OFFICIAL_SOURCE_URL,
  stationProfiles,
  trainSchedules,
} from "./data/pakistanRailwaySchedules";
import { filterTrains, formatKarachiClock, getKarachiTimeParts } from "./utils/schedule";

const BONUS_LINK =
  "https://www.profitablecpmratenetwork.com/j9f627innq?key=be46e17df9e34aa3b5b8e77e88a34740";

const sitePages = [
  {
    title: "Schedule Guide",
    description: "How to read departures, overnight arrivals, and timetable windows.",
    href: "/train-schedule-guide.html",
  },
  {
    title: "Station Guide",
    description: "Key planning notes for Lahore, Karachi, and Rawalpindi rail hubs.",
    href: "/pakistan-station-guide.html",
  },
  {
    title: "Booking Guide",
    description: "A practical page for reservation timing, classes, and booking checks.",
    href: "/train-booking-guide.html",
  },
  {
    title: "Fare Guide",
    description: "A cleaner view of route examples, classes, and trip budgeting.",
    href: "/pakistan-train-fare-guide.html",
  },
  {
    title: "Popular Routes",
    description: "A corridor page for Karachi, Lahore, Islamabad, Rawalpindi, Multan, and Quetta runs.",
    href: "/popular-pakistan-train-routes.html",
  },
  {
    title: "Rail FAQ",
    description: "Common route-planning and schedule-interpretation questions in one page.",
    href: "/rail-travel-faq.html",
  },
];

export default function App() {
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [corridor, setCorridor] = useState("");
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(trainSchedules[0]?.id ?? null);
  const [clockLabel, setClockLabel] = useState(() => formatKarachiClock(getKarachiTimeParts()));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get("q");
    if (initialQuery) {
      setSearch(initialQuery);
    }
  }, []);

  useEffect(() => {
    const update = () => setClockLabel(formatKarachiClock(getKarachiTimeParts()));
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }

    const nextQuery = params.toString();
    const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}`;
    window.history.replaceState({}, "", nextUrl);
  }, [search]);

  const origins = useMemo(
    () => [...new Set(trainSchedules.map((train) => train.origin))].sort(),
    [],
  );
  const destinations = useMemo(
    () => [...new Set(trainSchedules.map((train) => train.destination))].sort(),
    [],
  );
  const corridors = useMemo(
    () => [...new Set(trainSchedules.map((train) => train.corridor))].sort(),
    [],
  );

  const filteredTrains = useMemo(
    () => filterTrains(trainSchedules, search, origin, destination, corridor),
    [search, origin, destination, corridor],
  );

  useEffect(() => {
    if (!filteredTrains.length) {
      setSelectedTrainId(null);
      return;
    }

    if (!selectedTrainId || !filteredTrains.some((train) => train.id === selectedTrainId)) {
      setSelectedTrainId(filteredTrains[0].id);
    }
  }, [filteredTrains, selectedTrainId]);

  const selectedTrain = filteredTrains.find((train) => train.id === selectedTrainId) ?? filteredTrains[0];

  const resetFilters = () => {
    setSearch("");
    setOrigin("");
    setDestination("");
    setCorridor("");
  };

  const handleHeaderSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("tracker-tool-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-stack">
          <div className="header-inner">
            <div className="brand-block">
              <div className="brand-badge" aria-hidden="true">
                🚆
              </div>
              <div className="brand-copy">
                <h1>Train Tracker Pakistan</h1>
                <p>Pakistan Railways timetable explorer with route, station, fare, and planning pages.</p>
              </div>
            </div>
            <a href={BONUS_LINK} target="_blank" rel="noopener noreferrer" className="bonus-link">
              Bonus Link
            </a>
          </div>

          <div className="nav-bar">
            <nav className="nav-links" aria-label="Site pages">
              <a className="nav-link" href="/">
                Home
              </a>
              {sitePages.map((page) => (
                <a key={page.href} className="nav-link" href={page.href}>
                  {page.title}
                </a>
              ))}
            </nav>

            <form className="header-search" onSubmit={handleHeaderSearchSubmit}>
              <label htmlFor="header-train-search" className="sr-only">
                Search trains or cities
              </label>
              <input
                id="header-train-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search trains, cities, or route codes"
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="main-grid">
          <div>
            <SearchPanel
              search={search}
              origin={origin}
              destination={destination}
              corridor={corridor}
              onSearchChange={setSearch}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
              onCorridorChange={setCorridor}
              onReset={resetFilters}
              origins={origins}
              destinations={destinations}
              corridors={corridors}
              resultCount={filteredTrains.length}
              clockLabel={clockLabel}
            />

            <section className="results-layout" aria-labelledby="results-title">
              <div className="results-header">
                <div>
                  <h2 id="results-title">Today&apos;s timetable windows</h2>
                  <p>
                    Search in the header or inside the main tool, then compare the next published
                    departures without scrolling through unrelated content first.
                  </p>
                </div>
                <div className="chip-row">
                  <span className="info-chip">Official source only</span>
                  <span className="info-chip">No invented delay feed</span>
                  <span className="info-chip">{filteredTrains.length} visible</span>
                </div>
              </div>

              <TrainResults
                trains={filteredTrains}
                selectedTrainId={selectedTrainId}
                onSelect={setSelectedTrainId}
              />
            </section>
          </div>

          <div>
            {selectedTrain ? (
              <TrainDetailPanel train={selectedTrain} />
            ) : (
              <div className="empty-state">
                <strong>No train selected.</strong>
                <p>Choose a result card to see the route summary and official timetable details.</p>
              </div>
            )}
          </div>
        </div>

        <div className="section-stack">
          <section className="surface-card section-card">
            <h2 className="section-title">Why this train topic cluster works better now</h2>
            <p className="section-copy">
              Instead of one thin tool page, the site now has a schedule search surface, route
              context, station notes, fare guidance, booking guidance, and dedicated rail FAQ pages.
              That gives users multiple entry points and gives search engines a clearer site
              structure around the Pakistan train planning topic.
            </p>
            <div className="helper-row">
              <p className="source-note">
                {OFFICIAL_SOURCE_NOTE} For the latest booking or service change check{" "}
                <a href={OFFICIAL_SOURCE_URL} target="_blank" rel="noopener noreferrer">
                  PakRail
                </a>
                .
              </p>
            </div>
          </section>

          <StationSection stations={stationProfiles} />
          <FareSection fares={fareHighlights} />
          <GuideSection />
          <FAQSection />
          <section className="surface-card section-card" aria-labelledby="site-pages-title">
            <h2 id="site-pages-title" className="section-title">
              Internal site pages
            </h2>
            <p className="section-copy">
              These are dedicated internal pages on this site. They cover schedule reading, station
              planning, ticket booking basics, route comparisons, fares, and common rail questions.
            </p>
            <div className="link-grid" style={{ marginTop: 18 }}>
              {sitePages.map((page) => (
                <a key={page.href} href={page.href} className="link-card">
                  <h3>{page.title}</h3>
                  <p>{page.description}</p>
                </a>
              ))}
            </div>
          </section>
          <RelatedLinks />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container">
          <strong>Train Tracker Pakistan</strong> is an independent front end built from published
          Pakistan Railways timetable information. It is not an official Pakistan Railways booking
          or operations product.
        </div>
      </footer>
    </div>
  );
}
