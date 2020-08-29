import { createConnection, getConnectionOptions, getRepository } from "typeorm";

import { PlayerStat } from "../domain";

import * as data from "../rushing.json";

async function loadData() {
  console.log("Loading data from file");
  let connectionOptions = await getConnectionOptions();

  connectionOptions = {
    ...connectionOptions,
    entities: [PlayerStat],
  };

  await createConnection(connectionOptions);

  const statRepository = getRepository(PlayerStat);
  const cleanData = data.map((d) => {
    try {
      return PlayerStat.fromJson(d);
    } catch (e) {
      console.log("ERRO");
      console.log(d);
      console.log(e);
      throw e;
    }
  });
  await statRepository.save(cleanData);
  console.log("Finished loading the data");
}

loadData().catch((e) => console.log(e));
