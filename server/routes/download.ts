import { PlayerStat } from "../domain";
import { getRepository } from "typeorm";
import * as Ajv from "ajv";
import * as schema from "./download.schema.json";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export async function download(req, res) {
  const validRequestBody = await validate(req.body);

  if (!validRequestBody) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.json(validate.errors);
  } else {
    const repo = getRepository(PlayerStat);
    const query = repo.createQueryBuilder("stat");
    if (req.body.player != null) {
      query.where("lower(stat.player) like :player", {
        player: `%${req.body.player.trim().toLowerCase()}%`,
      });
    }

    if (req.body.sorting != null) {
      req.body.sorting.forEach((s) => {
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
            throw new Error(
              "Invalid sorting field. Available options are: totalYards, longestRun and, td"
            );
        }
      });
    }

    var data = await query.take(5000).getRawMany();

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/csv");

    if (data.length > 0) {
      const fields = Object.keys(data[0]).filter((k) => k !== "stat_id");
      const headers = fields.map((f) => f.replace("stat_", "")).join(",");
      res.write(`${headers}\r\n`);

      data.forEach(function (item) {
        const values = fields.map((f) => item[f]).join(",");
        res.write(`${values}\r\n`);
      });
    }

    res.end();
  }
}
