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
    process.env.REACT_APP_ENDPOINT as string,
    query,
    variables
  );

  return playersStats;
}
