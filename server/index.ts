import { ApolloServer, gql } from "apollo-server";
import { getRepository, getConnectionOptions, createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { PlayerStat } from "./domain";

const typeDefs = gql`
  type PlayerStat {
    player: String
    team: String
    position: String
    attempts: Int
    attempsPerGame: Float
    totalYards: Int
    averageYards: Float
    yardsPerGame: Float
    td: Int
    longestRun: Int
    rushingFirstDowns: Int
    rushingFirstDownsPercent: Float
    rushing20: Int
    rushing40: Int
    fumbles: Int
  }

  enum SortDirection {
    DESC
    ASC
  }

  enum RecordsPerPage {
    TWENTY
    FIFTY
    ONE_HUNDRED
  }

  input SortInput {
    field: String!
    direction: SortDirection!
  }

  type Query {
    playersStats(player: String, sorting:[SortInput!], recordsPerPage: RecordsPerPage, page: Int): [PlayerStat]
  }
`;

async function createServer() {
  let connectionOptions = await getConnectionOptions();

  connectionOptions = {
    ...connectionOptions,
    entities: [PlayerStat],
  };

  await createConnection(connectionOptions);

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: (context) => {
      context["getRepository"] = getRepository;
      return context;
    },
  });
}

// The `listen` method launches a web server.
createServer().then((s) => {
  s.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
