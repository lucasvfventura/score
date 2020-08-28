import {createConnection, getConnectionOptions, getRepository} from "typeorm";

import {PlayerStat} from '../domain';

async function loadData(){
    let connectionOptions = await getConnectionOptions();

    connectionOptions = {
        ...connectionOptions,
        entities: [
            PlayerStat
        ]
    }

    await createConnection(connectionOptions);
    
}

loadData()
    .then(() => console.log("Finished load the data"))
    .catch((e) => console.log(e))