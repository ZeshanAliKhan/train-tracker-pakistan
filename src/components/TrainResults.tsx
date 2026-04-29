import { TrainSchedule } from "../types";
import { getTrainWindow } from "../utils/schedule";

interface TrainResultsProps {
  trains: TrainSchedule[];
  selectedTrainId: string | null;
  onSelect: (trainId: string) => void;
}

export function TrainResults({ trains, selectedTrainId, onSelect }: TrainResultsProps) {
  if (trains.length === 0) {
    return (
      <div className="empty-state">
        <strong>No trains matched these filters.</strong>
        <p>
          Clear one filter or broaden the city search. This page only shows trains that are in the
          verified published timetable set.
        </p>
      </div>
    );
  }

  return (
    <div className="train-grid">
      {trains.map((train) => {
        const window = getTrainWindow(train);
        return (
          <article
            key={train.id}
            className={`train-card ${selectedTrainId === train.id ? "active" : ""}`}
          >
            <div className="train-topline">
              <div>
                <div className="train-number">{train.number}</div>
                <h3>{train.name}</h3>
              </div>
              <span className={`status-badge ${window.badgeClass}`}>{window.status}</span>
            </div>

            <div className="route-line" aria-label={`${train.origin} to ${train.destination}`}>
              <span>{train.origin}</span>
              <span className="route-arrow">→</span>
              <span>{train.destination}</span>
            </div>

            <div className="time-grid">
              <div className="time-box">
                <strong>{train.departureTime}</strong>
                <span>Departure</span>
              </div>
              <div className="time-box">
                <strong>{train.arrivalTime}</strong>
                <span>
                  Arrival {train.arrivalDayOffset ? "(next day)" : "(same day)"}
                </span>
              </div>
              <div className="time-box">
                <strong>{train.duration}</strong>
                <span>Scheduled trip time</span>
              </div>
            </div>

            <div className="tag-list">
              <span className="tag">{train.corridor}</span>
              <span className="tag">{train.frequency}</span>
              {train.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <p>{window.summary}</p>

            <div className="button-row">
              <button type="button" className="secondary-button" onClick={() => onSelect(train.id)}>
                View details
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
