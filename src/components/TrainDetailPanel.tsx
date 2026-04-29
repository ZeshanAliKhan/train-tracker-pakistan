import { OFFICIAL_SOURCE_NOTE } from "../data/pakistanRailwaySchedules";
import { TrainSchedule } from "../types";
import { getTrainWindow } from "../utils/schedule";

interface TrainDetailPanelProps {
  train: TrainSchedule;
}

export function TrainDetailPanel({ train }: TrainDetailPanelProps) {
  const window = getTrainWindow(train);

  return (
    <aside className="surface-card detail-card">
      <div className="detail-topline">
        <div>
          <div className="train-number">{train.number}</div>
          <h2>{train.name}</h2>
        </div>
        <span className={`status-badge ${window.badgeClass}`}>{window.status}</span>
      </div>

      <p className="section-copy">
        {train.serviceNotes} This detail panel stays tied to the official published times rather
        than pretending to show private operations data.
      </p>

      <div className="detail-grid">
        <div className="detail-stat">
          <strong>{train.origin}</strong>
          <span>Origin ({train.originCode})</span>
        </div>
        <div className="detail-stat">
          <strong>{train.destination}</strong>
          <span>Destination ({train.destinationCode})</span>
        </div>
        <div className="detail-stat">
          <strong>{train.departureTime}</strong>
          <span>Scheduled departure</span>
        </div>
        <div className="detail-stat">
          <strong>{train.arrivalTime}</strong>
          <span>
            Scheduled arrival {train.arrivalDayOffset ? "on the next day" : "the same day"}
          </span>
        </div>
        <div className="detail-stat">
          <strong>{train.duration}</strong>
          <span>Published trip time</span>
        </div>
        <div className="detail-stat">
          <strong>{train.corridor}</strong>
          <span>Operating corridor</span>
        </div>
      </div>

      <div className="tag-list">
        {train.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <ul className="detail-list">
        <li>{window.summary}</li>
        <li>Frequency: {train.frequency}</li>
        <li>Source page: <a href={train.sourceUrl} target="_blank" rel="noopener noreferrer">PakRail official timetable</a></li>
      </ul>

      <div className="helper-row">
        <p className="source-note">{OFFICIAL_SOURCE_NOTE}</p>
      </div>
    </aside>
  );
}
