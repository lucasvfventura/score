import { Repository } from "typeorm";
import { PlayerStat } from "../domain";
import { UserInputError } from "apollo-server";

export enum RecordsPerPage {
  TWENTY = "TWENTY",
  FIFTY = "FIFTY",
  ONE_HUNDRED = "ONE_HUNDRED",
}

export enum SortDirection {
  DESC = "DESC",
  ASC = "ASC",
}

export interface SortInput {
  field: string;
  direction: SortDirection;
}

interface PlayersStatsInput {
  player: string;
  sorting: SortInput[];
  recordsPerPage: RecordsPerPage;
  page: number;
}

export const resolvers = {
  Query: {
    async playersStats(
      parent,
      { player, sorting, recordsPerPage, page }: PlayersStatsInput,
      context,
      info
    ) {
      //Input validations
      const pageInt = (page ?? 1) - 1;
      if (pageInt < 0) {
        throw new UserInputError("page must be a positive integer");
      }

      const statRepo: Repository<PlayerStat> = context.getRepository(
        PlayerStat
      );
      let query = statRepo.createQueryBuilder("stat");

      if (player != null && player.trim() !== "") {
        query.where("lower(stat.player) like :player", {
          player: `%${player.trim().toLowerCase()}%`,
        });
      }

      //Order by Total Rushing Yards, Longest Rush and Total Rushing Touchdowns
      if (sorting != null) {
        sorting.forEach((s) => {
          switch (s.field.trim().toLowerCase()) {
            case "totalyards":
              query.addOrderBy("stat.totalYards", s.direction);
              break;

            case "longestrun":
              query.addOrderBy("stat.longestRun", s.direction);
              break;

            case "td":
              query.addOrderBy("stat.td", s.direction);
              break;

            default:
              throw new UserInputError(
                "Invalid sorting field. Available options are: totalYards, longestRun and, td"
              );
          }
        });
      }

      let recordsPerPageInt = 20;
      switch (recordsPerPage) {
        case RecordsPerPage.ONE_HUNDRED:
          recordsPerPageInt = 100;
          break;
        case RecordsPerPage.FIFTY:
          recordsPerPageInt = 50;
          break;
        default:
          break;
      }

      const count = await query.getCount();

      query.take(recordsPerPageInt);
      query.skip(recordsPerPageInt * pageInt);

      return { count, stats: await query.getMany() };
    },
  },
};
