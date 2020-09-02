import * as express from "express";
import * as bodyParser from "body-parser";
import { ApolloServer, gql } from "apollo-server-express";
import { getRepository, getConnectionOptions, createConnection } from "typeorm";
import { resolvers } from "./resolvers";
import { PlayerStat } from "./domain";
import { download } from "./routes/download";
import * as cors from "cors";

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

  type PlayersStatsResponse {
    stats: [PlayerStat]
    count: Int!
  }

  type Query {
    playersStats(
      player: String
      sorting: [SortInput!]
      recordsPerPage: RecordsPerPage
      page: Int
    ): PlayersStatsResponse
  }
`;

async function createServer() {
  let connectionOptions = await getConnectionOptions();

  connectionOptions = {
    ...connectionOptions,
    entities: [PlayerStat],
  };

  await createConnection(connectionOptions);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (context) => {
      context["getRepository"] = getRepository;
      return context;
    },
  });

  const app = express();
  app.use(cors());

  var jsonParser = bodyParser.json();

  server.applyMiddleware({ app });

  app.post("/download", jsonParser, download);

  return app;
}

// The `listen` method launches a web server.
createServer().then((s) => {
  s.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
    console.log(`🚀 GraphiQL ready at http://localhost:4000/graphql`);
  });
});
