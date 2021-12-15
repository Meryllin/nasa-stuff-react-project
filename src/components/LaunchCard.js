import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const moment = require("moment");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "2rem 0rem",
    minHeight: 140,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "40%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  failure: {
    color: "#FF0000",
  },
  iconButton: {
    maxHeight: 42,
    maxWidth: 42,
  },
  name: {
    fontWeight: "bold",
  },
  success: {
    color: "#86B049",
  },
}));

function MediaControlCard(props) {
  const cardData = props.data;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dateFormatter = (date) => moment(date).format("YYYY/MM/DD hh:mm:ss");

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={cardData.image ? cardData.image : cardData.pad.map_image}
        title={cardData.name}
      />

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Grid container direction="column" justifyContent="space-between">
            <Grid container justifyContent="space-between">
              <Grid item xs>
                <Typography className={classes.name}>
                  {cardData.name}
                </Typography>
              </Grid>
              <Grid container item xs justifyContent="flex-end">
                <Chip
                  size="small"
                  variant="outlined"
                  color="secondary"
                  label={`Last updated: ${dateFormatter(
                    cardData.last_updated
                  )}`}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" justifyContent="space-between">
              <Grid item container direction="column" xs={10}>
                <Typography
                  className={
                    cardData.status.abbrev ? classes.success : classes.failure
                  }
                >
                  {cardData.status.name}
                </Typography>

                <Typography>{`Launch Provider: ${cardData.launch_service_provider.name}`}</Typography>
              </Grid>

              <Grid item container xs={2} alignItems="flex-end">
                <Tooltip title="More information" placement="top">
                  <IconButton
                    className={clsx(classes.expand, classes.iconButton, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMore />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div>
              <Typography variant="h6" gutterBottom>
                Launch details
              </Typography>
              <Typography variant="body2">
                {`Launch window start: ${dateFormatter(cardData.window_start)}`}
              </Typography>
              <Typography variant="body2">
                {`Launch window end: ${dateFormatter(cardData.window_end)}`}
              </Typography>
            </div>

            {cardData.mission && (
              <Box mt={1}>
                <Typography variant="h6" gutterBottom>
                  Mission
                </Typography>
                <Typography variant="body2">
                  {`Name: ${cardData.mission.name}`}
                </Typography>
                <Typography variant="body2">
                  {`Type: ${cardData.mission.type}`}
                </Typography>
                <Typography variant="body2">
                  {`Description: ${cardData.mission.description}`}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Collapse>
      </div>
    </Card>
  );
}

export default MediaControlCard;
