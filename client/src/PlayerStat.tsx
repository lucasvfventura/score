import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { IPlayerStat } from "./types";

const useStyles = makeStyles((theme) => ({
  playerName: {
    fontWeight: "bold",
  },
  pp: {
    padding: `${theme.spacing(1)}px`,
  },
}));

export function PlayerStat(props: { playerStat: IPlayerStat }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" wrap="wrap" className={classes.pp}>
      <Grid item xs={12}>
        <Grid container justify="space-between" alignItems="flex-end">
          <Grid item className={classes.playerName}>
            <Typography variant="h6">{props.playerStat.player}</Typography>
          </Grid>
          <Grid item>
            <Typography>Team: {props.playerStat.team}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" wrap="wrap">
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={3}>
                Position: {props.playerStat.position}
              </Grid>
              <Grid item xs={3}>
                TDs: {props.playerStat.td}
              </Grid>
              <Grid item xs={3}>
                Total Yards: {props.playerStat.totalYards}
              </Grid>
              <Grid item xs={3}>
                Fumbles: {props.playerStat.fumbles}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={3}>
                Attemps: {props.playerStat.attempts}
              </Grid>
              <Grid item xs={3}>
                Attemps per Game: {props.playerStat.attempsPerGame}
              </Grid>
              <Grid item xs={3}>
                Avg yards: {props.playerStat.averageYards}
              </Grid>
              <Grid item xs={3}>
                Yards per Game: {props.playerStat.yardsPerGame}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row">
              <Grid item xs={3}>
                Longest Run: {props.playerStat.longestRun}
              </Grid>
              <Grid item xs={3}>
                First down: {props.playerStat.rushingFirstDowns} /{" "}
                {Math.round(props.playerStat.rushingFirstDowns * 10000) / 100}%
              </Grid>
              <Grid item xs={3}>
                20+ yards : {props.playerStat.rushing20}
              </Grid>
              <Grid item xs={3}>
                40+ yards : {props.playerStat.rushing40}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
