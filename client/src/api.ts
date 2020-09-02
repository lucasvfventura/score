import { request, gql } from "graphql-request";
import { SortInput, RecordsPerPage, IPlayerStat } from "./types";

interface PlayerStatResponse {
  count: number;
  stats: IPlayerStat[];
}

export async function playerStatQuery(
  player: string | null,
  sorting: SortInput[] | null,
  recordsPerPage?: RecordsPerPage | null,
  page?: number | null
): Promise<PlayerStatResponse> {
  const variables = {
    player,
    sorting,
    recordsPerPage,
    page,
  };

  const query = gql`
    query playersStatsQuery(
      $player: String
      $sorting: [SortInput!]
      $recordsPerPage: RecordsPerPage
      $page: Int
    ) {
      playersStats(
        player: $player
        sorting: $sorting
        recordsPerPage: $recordsPerPage
        page: $page
      ) {
        count
        stats {
          player
          team
          position
          attempts
          attempsPerGame
          totalYards
          averageYards
          yardsPerGame
          td
          longestRun
          rushingFirstDowns
          rushingFirstDownsPercent
          rushing20
          rushing40
          fumbles
        }
      }
    }
  `;
  const { playersStats } = await request(
    `${process.env.REACT_APP_ENDPOINT}/graphql`,
    query,
    variables
  );

  return playersStats;
}

export async function downloadPlayerStats(
  player: string | null,
  sorting: SortInput[] | null
): Promise<void> {
  try {
    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player,
        sorting,
      }),
    });
    console.log(response);

    if (response.status < 300) {
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "playerStat.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      console.log(response);
    }
  } catch (e) {
    console.log(e);
  }
}
