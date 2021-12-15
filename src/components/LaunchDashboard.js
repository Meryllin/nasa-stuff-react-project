import React, { useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as urlLib from "url";
import { host, launchPathName, protocol } from "./../theSpaceDevsApi";

import LaunchCard from "./LaunchCard";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  label: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: "2rem",
  },
  center: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
}));

const defaultQueryArgs = {
  window_start__gte: (() => new Date())().toISOString(),
  limit: 10,
};

function LaunchDashboard() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const getLaunchUrl = (query) => {
    return urlLib.format({
      protocol: protocol,
      host: host,
      pathname: launchPathName,
      query: query,
    });
  };

  useEffect(() => {
    fetch(urlLib.format(getLaunchUrl(defaultQueryArgs)))
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div className={classes.center}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className={classes.center}>Loading...</div>;
  } else {
    return (
      <Container className={classes.root}>
        <Typography className={classes.label}>Upcoming launches</Typography>
        {items && items.map((item) => <LaunchCard key={item.id} data={item} />)}
      </Container>
    );
  }
}

export default LaunchDashboard;
