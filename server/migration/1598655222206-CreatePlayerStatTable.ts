import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePlayerStatTable1598655222206 implements MigrationInterface {
    name = 'CreatePlayerStatTable1598655222206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player_stat" ("id" SERIAL NOT NULL, "player" character varying NOT NULL, "team" character varying NOT NULL, "position" character varying NOT NULL, "attempts" integer NOT NULL, "attempsPerGame" integer NOT NULL, "totalYards" integer NOT NULL, "averageYargds" numeric NOT NULL, "yardsPerGame" integer NOT NULL, "td" integer NOT NULL, "longestRun" integer NOT NULL, "rushingFirstDowns" integer NOT NULL, "rushingFirstDownsPercent" numeric NOT NULL, "rushing20" integer NOT NULL, "rushing40" integer NOT NULL, "fumbles" integer NOT NULL, CONSTRAINT "PK_ed3543c123f2d2c52da0555599a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "player_stat"`);
    }

}
