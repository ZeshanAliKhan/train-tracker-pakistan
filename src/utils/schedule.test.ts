import { describe, expect, it } from "vitest";
import { trainSchedules } from "../data/pakistanRailwaySchedules";
import { filterTrains, getTrainWindow } from "./schedule";

describe("filterTrains", () => {
  it("filters by train name and number", () => {
    const results = filterTrains(trainSchedules, "green line", "", "", "");
    expect(results).toHaveLength(2);
    expect(results.every((train) => train.name === "Green Line Express")).toBe(true);
  });

  it("filters by origin and destination together", () => {
    const results = filterTrains(trainSchedules, "", "Karachi City", "Lahore Junction", "");
    expect(results.map((train) => train.number)).toEqual(["1 UP", "5 UP"]);
  });

  it("filters by corridor", () => {
    const results = filterTrains(trainSchedules, "", "", "", "Quetta Corridor");
    expect(results.map((train) => train.name)).toEqual(["Jaffar Express", "Jaffar Express"]);
  });
});

describe("getTrainWindow", () => {
  it("marks a future departure today correctly", () => {
    const result = getTrainWindow(trainSchedules[0], new Date("2026-04-29T14:00:00Z"));
    expect(result.status).toBe("Next departure today");
  });

  it("marks overnight trains as en route after midnight", () => {
    const result = getTrainWindow(trainSchedules[0], new Date("2026-04-29T22:30:00Z"));
    expect(result.status).toBe("Scheduled en route");
    expect(result.minutesUntilArrival).toBeGreaterThan(0);
  });
});
