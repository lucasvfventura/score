import React, { useState, useEffect } from "react";
import { playerStatQuery, downloadPlayerStats } from "./api";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  Paper,
  IconButton,
} from "@material-ui/core";
import {
  ArrowDropUp,
  ArrowDropDown,
  ArrowLeft,
  ArrowRight,
} from "@material-ui/icons";
import {
  SortInput,
  RecordsPerPage,
  IPlayerStat,
  SortFields,
  SortDirection,
} from "./types";
import { PlayerStat } from "./PlayerStat";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(RecordsPerPage.TWENTY);
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortInput[]>([]);
  const [count, setCount] = useState(0);
  const [players, setPlayers] = useState<IPlayerStat[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [searching, setSearching] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleClick = (target: EventTarget & HTMLButtonElement) => {
    setAnchorEl(target);
  };

  const handlePaginationClick = (newPage: number) => {
    setPage(newPage);
    setSearching(true);
  };

  const handleSearchClick = () => {
    setPage(1);
    setSearching(true);
  };

  const handleSelectSorting = (field: SortFields) => {
    const currentFilterSort = sorting.find((s) => s.field === field);
    const filteredSort = sorting.filter((s) => s.field !== field);

    let direction = SortDirection.ASC;
    if (currentFilterSort?.direction === SortDirection.ASC) {
      direction = SortDirection.DESC;
    } else if (currentFilterSort?.direction === SortDirection.DESC) {
      setSorting([...filteredSort]);
      return;
    }
    setSorting([...filteredSort, { field, direction }]);
  };

  useEffect(() => {
    if (searching) {
      const asyncQuery = async () => {
        const result = await playerStatQuery(
          playerName,
          sorting,
          recordsPerPage,
          page
        );
        setCount(result.count);
        setPlayers(result.stats);
      };
      asyncQuery();
    }
    setSearching(false);
  }, [searching]);

  useEffect(() => {
    if (downloading) {
      downloadPlayerStats(playerName, sorting);
    }
    setDownloading(false);
  }, [downloading]);

  const playerView = players.map((p, i) => (
    <Grid key={i} item xs={12} lg={6}>
      <Paper style={{ background: i % 2 === 0 ? "#DDDDDD" : "#EEEEEE" }}>
        <PlayerStat playerStat={p} />
      </Paper>
    </Grid>
  ));

  const totalYardSort = sorting.findIndex(
    (s) => s.field === SortFields.TOTAL_YARDS
  );
  const tdSort = sorting.findIndex((s) => s.field === SortFields.TD);
  const longestRunSort = sorting.findIndex(
    (s) => s.field === SortFields.LONGEST_RUN
  );

  const sortDirection = (direction?: SortDirection) => {
    if (direction === SortDirection.ASC) {
      return <ArrowDropUp />;
    } else if (direction === SortDirection.DESC) {
      return <ArrowDropDown />;
    } else {
      return "";
    }
  };

  const sortMenu = (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => {
        setAnchorEl(null);
      }}
    >
      <MenuItem onClick={() => handleSelectSorting(SortFields.TOTAL_YARDS)}>
        <Grid container alignItems="flex-end">
          <Grid item xs={2}>
            {totalYardSort >= 0 ? totalYardSort + 1 : ""}
            {sortDirection(sorting[totalYardSort]?.direction)}
          </Grid>
          <Grid item xs={10}>
            Total Rushing Yards
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={() => handleSelectSorting(SortFields.LONGEST_RUN)}>
        <Grid container alignItems="flex-end">
          <Grid item xs={2}>
            {longestRunSort >= 0 ? longestRunSort + 1 : ""}
            {sortDirection(sorting[longestRunSort]?.direction)}
          </Grid>
          <Grid item xs={10}>
            Longest Run
          </Grid>
        </Grid>
      </MenuItem>
      <MenuItem onClick={() => handleSelectSorting(SortFields.TD)}>
        <Grid container alignItems="flex-end">
          <Grid item xs={2}>
            {tdSort >= 0 ? tdSort + 1 : ""}
            {sortDirection(sorting[tdSort]?.direction)}
          </Grid>
          <Grid item xs={10}>
            Total Rushing Touchdowns
          </Grid>
        </Grid>
      </MenuItem>
    </Menu>
  );

  const pagination = () => {
    let recordsPerPageInt = 20;
    switch (recordsPerPage) {
      case RecordsPerPage.FIFTY:
        recordsPerPageInt = 50;
        break;
      case RecordsPerPage.ONE_HUNDRED:
        recordsPerPageInt = 100;
        break;
      default:
        break;
    }

    let totalPages = Math.floor(count / recordsPerPageInt);

    totalPages =
      count !== 0 && count % recordsPerPageInt === 0
        ? totalPages
        : totalPages + 1;

    return (
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={12} lg={8}>
            <Grid
              container
              justify="flex-end"
              alignItems="center"
              wrap="nowrap"
            >
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => setDownloading(true)}
                >
                  Download
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                  disabled={page <= 1}
                  onClick={() => handlePaginationClick(page - 1)}
                >
                  <ArrowLeft />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  disabled={page >= totalPages}
                  onClick={() => handlePaginationClick(page + 1)}
                >
                  <ArrowRight />
                </IconButton>
              </Grid>
              <Grid item>
                {page} of {totalPages}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs={12} lg={8}>
            <Grid
              container
              justify="space-between"
              spacing={2}
              alignItems="flex-end"
            >
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  id="plater"
                  label="Player"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value as string)}
                />
              </Grid>
              <Grid item xs={8} md={3}>
                <Grid
                  container
                  justify="space-evenly"
                  alignItems="flex-end"
                  wrap="nowrap"
                >
                  <Grid item>
                    <Button
                      size="small"
                      variant="contained"
                      data-testid="sortByBtn"
                      onClick={(e) => handleClick(e.currentTarget)}
                    >
                      Sort by
                    </Button>
                    {sortMenu}
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <InputLabel id="itemPerPageLbl">
                        Items per Page
                      </InputLabel>
                      <Select
                        labelId="itemPerPageLbl"
                        id="itemPerPage"
                        data-testid="itemPerPage"
                        value={recordsPerPage}
                        onChange={(e) =>
                          setRecordsPerPage(e.target.value as RecordsPerPage)
                        }
                        style={{ minWidth: 120 }}
                      >
                        <MenuItem value={"TWENTY"}>20</MenuItem>
                        <MenuItem value={"FIFTY"}>50</MenuItem>
                        <MenuItem value={"ONE_HUNDRED"}>100</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={1}>
                <Button
                  variant="contained"
                  color="primary"
                  data-testid="searchBtn"
                  onClick={() => handleSearchClick()}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {count > 0 && pagination()}
      <Grid item xs={12}>
        <Grid container alignItems="center" direction="column" spacing={1}>
          {playerView}
        </Grid>
      </Grid>
      {count > 0 && pagination()}
    </Grid>
  );
}

export default App;
