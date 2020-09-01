import { PlayerStat } from "../domain";

test("Valid playerStat.fromJson call", async () => {
  const result = PlayerStat.fromJson({
    Player: "Joe Banyard",
    Team: "JAX",
    Pos: "RB",
    Att: 2,
    "Att/G": 2,
    Yds: 7,
    Avg: 3.5,
    "Yds/G": 7,
    TD: 0,
    Lng: "7",
    "1st": 0,
    "1st%": 0,
    "20+": 0,
    "40+": 0,
    FUM: 0,
  });

  let expectedResult = new PlayerStat();
  expectedResult.player = "Joe Banyard";
  expectedResult.team = "JAX";
  expectedResult.position = "RB";
  expectedResult.attempts = 2;
  expectedResult.attempsPerGame = 2;
  expectedResult.totalYards = 7;
  expectedResult.averageYards = 3.5;
  expectedResult.yardsPerGame = 7;
  expectedResult.td = 0;
  expectedResult.longestRun = 7;
  expectedResult.rushingFirstDowns = 0;
  expectedResult.rushingFirstDownsPercent = 0;
  expectedResult.rushing20 = 0;
  expectedResult.rushing40 = 0;
  expectedResult.fumbles = 0;

  expect(result).toEqual(expectedResult);
});

test("Valid playerStat.fromJson call with string parameters", async () => {
  const result = PlayerStat.fromJson({
    Player: "Joe Banyard",
    Team: "JAX",
    Pos: "RB",
    Att: "2",
    "Att/G": "2",
    Yds: "7",
    Avg: "3.5",
    "Yds/G": "7",
    TD: "0",
    Lng: "7T",
    "1st": "0",
    "1st%": "0",
    "20+": "0",
    "40+": "0",
    FUM: "0",
  });

  let expectedResult = new PlayerStat();
  expectedResult.player = "Joe Banyard";
  expectedResult.team = "JAX";
  expectedResult.position = "RB";
  expectedResult.attempts = 2;
  expectedResult.attempsPerGame = 2;
  expectedResult.totalYards = 7;
  expectedResult.averageYards = 3.5;
  expectedResult.yardsPerGame = 7;
  expectedResult.td = 0;
  expectedResult.longestRun = 7;
  expectedResult.rushingFirstDowns = 0;
  expectedResult.rushingFirstDownsPercent = 0;
  expectedResult.rushing20 = 0;
  expectedResult.rushing40 = 0;
  expectedResult.fumbles = 0;

  expect(result).toEqual(expectedResult);
});
