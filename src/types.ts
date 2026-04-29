export interface TrainSchedule {
  id: string;
  number: string;
  name: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  arrivalDayOffset: 0 | 1;
  frequency: string;
  duration: string;
  corridor: string;
  tags: string[];
  serviceNotes: string;
  sourceUrl: string;
}

export interface StationProfile {
  code: string;
  name: string;
  city: string;
  established: string;
  dailyTrains: string;
  helpline: string;
  address: string;
  highlights: string[];
  sourceUrl: string;
}

export interface FareHighlight {
  route: string;
  fromFare: string;
  className: string;
  duration: string;
  trains: string;
  sourceUrl: string;
}

export interface TrainWindow {
  status: "Next departure today" | "Scheduled en route" | "Next departure tomorrow";
  badgeClass: "today" | "en-route" | "tomorrow";
  minutesUntilDeparture: number;
  minutesUntilArrival?: number;
  summary: string;
}
