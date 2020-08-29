import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

const INT_RE =  /\d+/
const FLOAT_RE =  /\d+(\.\d+)?/

@Entity()
export class PlayerStat {
    static fromJson(obj: any): PlayerStat{
        function converStat(value:any, re:RegExp): number{
            if(typeof value === 'number'){
                return value;
            } else if(typeof value === 'string'){
                return parseFloat(re.exec(value)[0])
            }
    
            throw new Error(`Invalid data type for ${value}`);
        } 

        let newPlayerStat = new PlayerStat();
        newPlayerStat.player = `${obj.Player}`;
        newPlayerStat.team = `${obj.Team}`;
        newPlayerStat.position = `${obj.Pos}`;
        newPlayerStat.attempts = converStat(obj.Att, INT_RE);
        newPlayerStat.attempsPerGame = converStat(obj["Att/G"], FLOAT_RE);
        newPlayerStat.totalYards = converStat(obj.Yds, INT_RE);
        newPlayerStat.averageYards = converStat(obj.Avg, FLOAT_RE);
        newPlayerStat.yardsPerGame = converStat(obj["Yds/G"], FLOAT_RE);
        newPlayerStat.td = converStat(obj.TD, INT_RE);
        newPlayerStat.longestRun = converStat(obj.Lng, INT_RE);
        newPlayerStat.rushingFirstDowns = converStat(obj["1st"], INT_RE);
        newPlayerStat.rushingFirstDownsPercent = converStat(obj["1st%"], FLOAT_RE);
        newPlayerStat.rushing20 = converStat(obj["20+"], INT_RE);
        newPlayerStat.rushing40 = converStat(obj["40+"], INT_RE);
        newPlayerStat.fumbles = converStat(obj.FUM, INT_RE);

        return newPlayerStat;
    }

    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"varchar"})
    player:string

    @Column({type:"varchar"})
    team:string

    @Column({type:"varchar"})
    position:string

    @Column({type: "int"})
    attempts:number

    @Column({type: "decimal"})
    attempsPerGame:number

    @Column({type: "int"})
    totalYards:number

    @Column({type: "decimal"})
    averageYards:number

    @Column({type: "decimal"})
    yardsPerGame:number

    @Column({type: "int"})
    td:number

    @Column({type: "int"})
    longestRun:number

    @Column({type: "int"})
    rushingFirstDowns:number

    @Column({type: "decimal"})
    rushingFirstDownsPercent:number

    @Column({type: "int"})
    rushing20:number

    @Column({type: "int"})
    rushing40:number

    @Column({type: "int"})
    fumbles:number
}