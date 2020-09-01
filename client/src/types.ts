export enum RecordsPerPage {
  TWENTY = "TWENTY",
  FIFTY = "FIFTY",
  ONE_HUNDRED = "ONE_HUNDRED",
}

export enum SortFields {
  TOTAL_YARDS = "totalyards",
  LONGEST_RUN = "longestrun",
  TD = "td",
}

export enum SortDirection {
  DESC = "DESC",
  ASC = "ASC",
}

export interface SortInput {
  field: string;
  direction: SortDirection;
}

export interface IPlayerStat {
  id: number;
  player: string;
  team: string;
  position: string;
  attempts: number;
  attempsPerGame: number;
  totalYards: number;
  averageYards: number;
  yardsPerGame: number;
  td: number;
  longestRun: number;
  rushingFirstDowns: number;
  rushingFirstDownsPercent: number;
  rushing20: number;
  rushing40: number;
  fumbles: number;
}
