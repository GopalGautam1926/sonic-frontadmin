import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Divider,
  Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import useStyle from "./styles";
import classNames from "classnames";
import FancyCardHeader from "./FancyCardHeader";
import FancyCardIcon from "./FancyCardIcon";

export default function FancyCard({ children, cardHeader, ...props }) {
  const classes = useStyle();
  return (
    <Paper
      classes={{ root: classes.card }}
      className={classes.card}
      elevation={3}
      {...props}
    >
      {cardHeader && (
        <Card
          className={classNames({
            [classes.cardHeader]: true,
          })}
          classes={{ root: classes.cardHeader }}
        >
          {cardHeader}
        </Card>
      )}
      {children}
    </Paper>
  );
}

FancyCard.CardContent = CardContent;
FancyCard.CardActionArea = CardActionArea;
FancyCard.CardActions = CardActions;
FancyCard.CardHeader = FancyCardHeader;
FancyCard.CardIcon = FancyCardIcon;
FancyCard.Divider = Divider;

FancyCard.propTypes = {
  cardHeader: PropTypes.node,
  children: PropTypes.node,
};
