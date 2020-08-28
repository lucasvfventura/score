import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class PlayerStat {
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

    @Column({type: "int"})
    attempsPerGame:number

    @Column({type: "int"})
    totalYards:number

    @Column({type: "decimal"})
    averageYargds:number

    @Column({type: "int"})
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