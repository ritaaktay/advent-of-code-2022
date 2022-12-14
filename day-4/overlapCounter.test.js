const OverlapCounter = require("./overlapCounter");

describe("OverlapCounter", () => {
  it("has pairs array", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.pairs).toEqual([
      "2-4,6-8",
      "2-3,4-5",
      "5-7,7-9",
      "2-8,3-7",
      "6-6,4-6",
      "2-6,4-8",
    ]);
  });

  it("checks if pair has total overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.entireOverlap("2-8,3-7")).toEqual(true);
  });

  it("checks if pair has total overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.entireOverlap("6-6,4-6")).toEqual(true);
  });

  it("checks if pair has total overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.entireOverlap("2-6,4-8")).toEqual(false);
  });

  it("checks if pair has total overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.entireOverlap("5-7,7-9")).toEqual(false);
  });

  it("checks total amount of pairs who have total overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.getAllEntireOverlaps()).toEqual(2);
  });

  it("checks if pair has overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.overlap("5-7,7-9")).toEqual(true);
  });

  it("checks if pair has overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.overlap("2-6,4-8")).toEqual(true);
  });

  it("checks if pair has overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.overlap("2-8,3-7")).toEqual(true);
  });

  it("checks if pair has overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.overlap("6-6,4-6")).toEqual(true);
  });

  it("checks if pair has overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.overlap("2-4,6-8")).toEqual(false);
  });

  it("checks if pair has overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.overlap("2-3,4-5")).toEqual(false);
  });

  it("counts all pairs that have overlap", () => {
    path = "./day-4/mock.txt";
    const counter = new OverlapCounter(path);
    expect(counter.getAllOverlaps()).toEqual(4);
  });
});
