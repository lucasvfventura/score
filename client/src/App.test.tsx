import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
jest.mock('./api');
import {playerStatQuery} from './api'

const mockPlayerStatQuery = playerStatQuery as jest.MockedFunction<typeof playerStatQuery>;

const playerStat = {
  id: 1,
  player: "Joe",
  team: "JAX",
  position: "RB",
  attempts: 1,
  attempsPerGame: 1,
  totalYards: 50,
  averageYards: 50,
  yardsPerGame: 50,
  td: 0,
  longestRun: 50,
  rushingFirstDowns: 1,
  rushingFirstDownsPercent: 0.5,
  rushing20: 1,
  rushing40: 1,
  fumbles: 0
}
test("Renders initial page", () => {
  render(<App />);

  const { getByText } = screen;
  const playerSearch = getByText("Player");
  expect(playerSearch).toBeInTheDocument();

  const sortByBtn = getByText("Sort by");
  expect(sortByBtn).toBeInTheDocument();

  const searchBtn = getByText("Search");
  expect(searchBtn).toBeInTheDocument();

  const itemPerPageBtn = getByText("Items per Page");
  expect(itemPerPageBtn).toBeInTheDocument();

  const twentyOption = getByText("20");
  expect(twentyOption).toBeInTheDocument();
});

test("Clicks the item per page select", async () => {
  const { getByText, getByTestId } = screen;

  render(<App />);

  const itemPerPage = getByTestId("itemPerPage");
  expect(itemPerPage).toBeInTheDocument();

  fireEvent.mouseDown(itemPerPage.children[0]);

  const fityOption = getByText("50");
  expect(fityOption).toBeVisible();

  const oneHundredOption = getByText("100");
  expect(oneHundredOption).toBeVisible();
});

test("Clicks the sort by select", async () => {
  const { getByText, getByTestId } = screen;

  render(<App />);

  const sortByBtn = getByTestId("sortByBtn");
  expect(sortByBtn).toBeInTheDocument();

  fireEvent.click(sortByBtn );

  const opt1 = getByText("Total Rushing Yards");
  expect(opt1).toBeVisible();

  const opt2 = getByText("Longest Run");
  expect(opt2).toBeVisible();

  const opt3 = getByText("Total Rushing Touchdowns");
  expect(opt3).toBeVisible();
});

test("Clicks the search", async () => {
  const { findByText, getByTestId } = screen;

  render(<App />);

  mockPlayerStatQuery.mockResolvedValueOnce({count: 1, stats: [playerStat]});

  const searchBtn = getByTestId("searchBtn");
  expect(searchBtn).toBeInTheDocument();

  fireEvent.click(searchBtn);

  expect(mockPlayerStatQuery).toBeCalledTimes(1);

  const player = await findByText(playerStat.player);
  expect(player).toBeVisible();

  const team = await findByText(`Team: ${playerStat.team}`);
  expect(team).toBeVisible();
});
