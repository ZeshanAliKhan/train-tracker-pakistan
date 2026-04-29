import { useEffect, useMemo, useState } from "react";
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

export default function App() {
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [corridor, setCorridor] = useState("");
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(trainSchedules[0]?.id ?? null);
  const [clockLabel, setClockLabel] = useState(() => formatKarachiClock(getKarachiTimeParts()));

  useEffect(() => {
    const update = () => setClockLabel(formatKarachiClock(getKarachiTimeParts()));
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, []);

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

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-block">
            <div className="brand-badge" aria-hidden="true">
              🚆
            </div>
            <div className="brand-copy">
              <h1>Train Tracker Pakistan</h1>
              <p>Published Pakistan Railways timetable explorer with route, fare, and station context.</p>
            </div>
          </div>
          <a href={BONUS_LINK} target="_blank" rel="noopener noreferrer" className="bonus-link">
            Bonus Link
          </a>
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
                    Use the cards below to compare the next scheduled departures without scrolling
                    into long text first.
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
            <h2 className="section-title">Why this version is better than the old mock tracker</h2>
            <p className="section-copy">
              The previous build mixed fabricated delays, broken component contracts, and hard-coded
              route details. This version uses a verified timetable snapshot, keeps the tool above
              the fold on mobile, and makes the limitations explicit so the schedule remains useful
              without pretending to be a private realtime railway feed.
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
