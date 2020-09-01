import { resolvers, RecordsPerPage, SortDirection } from "../resolvers";
import { PlayerStat } from "../domain";
import * as data from "../rushing.json";

function createMockedContext() {
  return {
    getRepository: jest.fn(() => {
      return {
        createQueryBuilder: jest.fn(() => {
          return {
            getCount: jest.fn(() => 1),
            getMany: jest.fn(() => [PlayerStat.fromJson(data[0])]),
            where: jest.fn(),
            addOrderBy: jest.fn(),
            take: jest.fn(() => this),
            skip: jest.fn(),
          };
        }),
      };
    }),
  };
}

const context = createMockedContext();

beforeAll(() => {
  // init database
});

afterAll(() => {
  // clear database
});

beforeEach(() => {
  context.getRepository.mockClear();
});

test("Valid playerStat call without parameters", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    { player: null, sorting: null, recordsPerPage: null, page: null },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(0);

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(20);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with player filter", async () => {
  const player = "Joe";
  const result = await resolvers.Query.playersStats(
    null,
    { player, sorting: null, recordsPerPage: null, page: null },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(1);
  expect(queryMock.where).toHaveBeenCalledWith(
    "lower(stat.player) like :player",
    {
      player: `%${player.trim().toLowerCase()}%`,
    }
  );

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(0);

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(20);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with 20 records per page", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    {
      player: null,
      sorting: null,
      recordsPerPage: RecordsPerPage.TWENTY,
      page: null,
    },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(0);

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(20);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with 50 records per page", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    {
      player: null,
      sorting: null,
      recordsPerPage: RecordsPerPage.FIFTY,
      page: null,
    },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(0);

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(50);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with 100 records per page", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    {
      player: null,
      sorting: null,
      recordsPerPage: RecordsPerPage.ONE_HUNDRED,
      page: null,
    },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(0);

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(100);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with page 2", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    { player: null, sorting: null, recordsPerPage: null, page: 2 },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(0);

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(20);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(20);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with simple sorting", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    {
      player: null,
      sorting: [{ field: "totalyards", direction: SortDirection.DESC }],
      recordsPerPage: null,
      page: null,
    },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(1);
  expect(queryMock.addOrderBy).toHaveBeenCalledWith(
    "stat.totalYards",
    SortDirection.DESC
  );

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(20);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Valid playerStat call with multiple sorting", async () => {
  const result = await resolvers.Query.playersStats(
    null,
    {
      player: null,
      sorting: [
        { field: "totalyards", direction: SortDirection.DESC },
        { field: "longestrun", direction: SortDirection.ASC },
      ],
      recordsPerPage: null,
      page: null,
    },
    context,
    null
  );
  expect(result).toEqual({ count: 1, stats: [PlayerStat.fromJson(data[0])] });

  const getRepositoryMock = context.getRepository;
  expect(getRepositoryMock).toHaveBeenCalledTimes(1);
  expect(getRepositoryMock).toHaveBeenCalledWith(PlayerStat);

  const { createQueryBuilder } = getRepositoryMock.mock.results[0].value;
  expect(createQueryBuilder).toHaveBeenCalledTimes(1);
  expect(createQueryBuilder).toHaveBeenCalledWith("stat");

  const queryMock = createQueryBuilder.mock.results[0].value;

  expect(queryMock.where).toHaveBeenCalledTimes(0);

  expect(queryMock.addOrderBy).toHaveBeenCalledTimes(2);
  expect(queryMock.addOrderBy).toHaveBeenCalledWith(
    "stat.totalYards",
    SortDirection.DESC
  );
  expect(queryMock.addOrderBy).toHaveBeenCalledWith(
    "stat.longestRun",
    SortDirection.ASC
  );

  expect(queryMock.take).toHaveBeenCalledTimes(1);
  expect(queryMock.take).toHaveBeenCalledWith(20);

  expect(queryMock.skip).toHaveBeenCalledTimes(1);
  expect(queryMock.skip).toHaveBeenCalledWith(0);

  expect(queryMock.getMany).toHaveBeenCalledTimes(1);
});

test("Invalid playerStat call with negative page", async () => {
  try {
    await resolvers.Query.playersStats(
      null,
      {
        player: null,
        sorting: null,
        recordsPerPage: null,
        page: -1,
      },
      context,
      null
    );
  } catch (e) {
    expect(e.message).toMatch("page must be a positive integer");
  }
});

test("Invalid playerStat call with invalid sorting field", async () => {
  try {
    await resolvers.Query.playersStats(
      null,
      {
        player: null,
        sorting: [{ field: "wrong", direction: SortDirection.ASC }],
        recordsPerPage: null,
        page: null,
      },
      context,
      null
    );
  } catch (e) {
    expect(e.message).toMatch(
      "Invalid sorting field. Available options are: totalYards, longestRun and, td"
    );
  }
});
