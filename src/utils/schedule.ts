import { TrainSchedule, TrainWindow } from "../types";

export interface KarachiTimeParts {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

function getFormatter() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
}

export function getKarachiTimeParts(date = new Date()): KarachiTimeParts {
  const parts = getFormatter().formatToParts(date);
  const lookup = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: lookup("year"),
    month: lookup("month"),
    day: lookup("day"),
    hour: lookup("hour"),
    minute: lookup("minute"),
  };
}

export function formatKarachiClock(parts: KarachiTimeParts): string {
  const hour = String(parts.hour).padStart(2, "0");
  const minute = String(parts.minute).padStart(2, "0");
  return `${hour}:${minute} PKT`;
}

export function toMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function formatMinutes(minutes: number): string {
  const safe = Math.max(0, minutes);
  const hours = Math.floor(safe / 60);
  const remainder = safe % 60;

  if (hours === 0) {
    return `${remainder} min`;
  }

  if (remainder === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainder}m`;
}

export function getTrainWindow(train: TrainSchedule, date = new Date()): TrainWindow {
  const nowParts = getKarachiTimeParts(date);
  const nowMinutes = nowParts.hour * 60 + nowParts.minute;
  const departure = toMinutes(train.departureTime);
  const arrival = train.arrivalDayOffset * 1440 + toMinutes(train.arrivalTime);
  const stillRunningFromYesterday =
    train.arrivalDayOffset > 0 && nowMinutes < toMinutes(train.arrivalTime);
  const departedToday = nowMinutes >= departure;
  const currentlyEnRoute =
    (departedToday && nowMinutes < arrival) || stillRunningFromYesterday;

  if (currentlyEnRoute) {
    const arrivalClock = toMinutes(train.arrivalTime);
    const minutesUntilArrival = stillRunningFromYesterday
      ? arrivalClock - nowMinutes
      : arrival - nowMinutes;

    return {
      status: "Scheduled en route",
      badgeClass: "en-route",
      minutesUntilDeparture: 0,
      minutesUntilArrival: Math.max(0, minutesUntilArrival),
      summary: `Scheduled to arrive in ${formatMinutes(minutesUntilArrival)}.`,
    };
  }

  if (nowMinutes < departure) {
    const minutesUntilDeparture = departure - nowMinutes;
    return {
      status: "Next departure today",
      badgeClass: "today",
      minutesUntilDeparture,
      summary: `Scheduled to depart in ${formatMinutes(minutesUntilDeparture)}.`,
    };
  }

  const minutesUntilTomorrow = 1440 - nowMinutes + departure;
  return {
    status: "Next departure tomorrow",
    badgeClass: "tomorrow",
    minutesUntilDeparture: minutesUntilTomorrow,
    summary: `Today's slot has passed. Next scheduled run is in ${formatMinutes(minutesUntilTomorrow)}.`,
  };
}

export function filterTrains(
  trains: TrainSchedule[],
  search: string,
  origin: string,
  destination: string,
  corridor: string,
): TrainSchedule[] {
  const query = search.trim().toLowerCase();

  return trains
    .filter((train) => {
      if (!query) return true;
      return [
        train.number,
        train.name,
        train.origin,
        train.destination,
        train.originCode,
        train.destinationCode,
        train.corridor,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    })
    .filter((train) => (origin ? train.origin === origin : true))
    .filter((train) => (destination ? train.destination === destination : true))
    .filter((train) => (corridor ? train.corridor === corridor : true))
    .sort((left, right) => {
      const leftWindow = getTrainWindow(left);
      const rightWindow = getTrainWindow(right);
      const weight = (status: TrainWindow["status"]) =>
        status === "Scheduled en route" ? 0 : status === "Next departure today" ? 1 : 2;

      const statusDelta = weight(leftWindow.status) - weight(rightWindow.status);
      if (statusDelta !== 0) return statusDelta;

      return leftWindow.minutesUntilDeparture - rightWindow.minutesUntilDeparture;
    });
}
