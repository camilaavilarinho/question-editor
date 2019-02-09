import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  header: {
    margin: theme.spacing.unit * 6,
    marginLeft: theme.spacing.unit * 10,
    textAlign: "left"
  },
  stats: {
    margin: theme.spacing.unit * 10,
    marginTop: 0,
    padding: theme.spacing.unit * 5,
    textAlign: "justify"
  }
});

class Summary extends React.Component {
  getLongestLabel = obj => {
    let max = 0;
    if (obj !== undefined) {
      for(var val in obj){
        let labelSize = obj[val].text.length;
        if (labelSize >= max) max = labelSize;
      }
    }
    return max;
  };

  getNumberOfImages = (rows, columns) => {
    let count = 0;
    if (rows !== undefined) {
      for (var rKey in rows) {
        if (rows[rKey].image !== "") count++;
      }
      for (var cKey in columns) {
        if (columns[cKey].image !== "") count++;
      }
    }
    return count;
  };

  render() {
    const { classes } = this.props;

    const { question } = this.props;
    console.log();
    const rows = question.rows;
    const columns = question.columns;

    return (
      <div>
        <h2> Question Summary View </h2>{" "}
        <h3 className={classes.header}> Summary: </h3>{" "}
        <Paper className={classes.stats}>
          <p> Number of rows: {rows !== undefined ? rows.length : null} </p>{" "}
          <p>
            Number of columns: {columns !== undefined ? columns.length : null}{" "}
          </p>{" "}
          <p> Number of images uploaded: {this.getNumberOfImages(rows, columns)} </p>{" "}
          <p> Longest row label: {this.getLongestLabel(rows)} </p>{" "}
          <p> Longest column label: {this.getLongestLabel(columns)} </p>{" "}
        </Paper>{" "}
      </div>
    );
  }
}

Summary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Summary);
