import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing.unit * 3,
    overflowX: "auto",
    maxWidth: 700
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: 20
  },
  table: {
    minWidth: 700
    /* display: "block",
    overflowX: "scroll",
    whiteSpace: "nowrap" */
  },
  tableRow: {
    maxWidth: 130
  },
  scroll: {
    display: "block",
    overflowX: "scroll",
    whiteSpace: "nowrap"
  },
  inputBase: {
    textAlign: "right",
    fontStyle: "italic",
    minWidth: 50
  },
  buttons: {
    width: 300,
    padding: 0
  },
  fab: {
    color: "#fff",
    backgroundColor: "#1dd1a1",
    width: 35,
    height: 20,
    fontSize: 10,
    margin: 3
  },
  remove: {
    color: "#fff",
    backgroundColor: "#dfe6e9",
    width: 35,
    height: 20,
    margin: 3
  },
  button: {
    color: "#fff",
    backgroundColor: "#1dd1a1"
  }
});

class Question extends React.Component {
  state = {
    title: "Title of the Question",
    rows: [
      { id: 1, text: "row1", image: "", radioOption: "" },
      { id: 2, text: "row2", image: "", radioOption: "" },
      { id: 3, text: "row3", image: "", radioOption: "" },
      { id: 4, text: "row4", image: "", radioOption: "" }
    ],
    columns: [
      { id: 1, text: "col1", image: "" },
      { id: 2, text: "col2", image: "" },
      { id: 3, text: "col3", image: "" },
      { id: 4, text: "col4", image: "" }
    ]
  };
  componentDidMount() {
    /* this.props.callback(this.state); */
    this.handleStateData();
    /* console.log("question State: ", this.state); */
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  /* Edit Label */
  handleChangeRow = id => event => {
    let newState = [...this.state.rows];
    newState[id - 1].text = event.target.value;
    this.setState({
      rows: newState
    });
  };
  handleChangeCol = id => event => {
    let newState = [...this.state.columns];
    newState[id - 1].text = event.target.value;
    this.setState({
      columns: newState
    });
  };
  /* Add and remove rows and columns */
  addNewRow = (id, event) => {
    event.preventDefault();
    let newId = id + 1;
    let newRow = {
      id: newId,
      text: `row${newId}`,
      image: "",
      radioOption: ""
    };
    let newState = [...this.state.rows];
    newState.push(newRow);
    this.setState({
      rows: newState
    });
  };
  removeRow = event => {
    event.preventDefault();
    let newState = [...this.state.rows];
    newState.pop();
    this.setState({
      rows: newState
    });
  };
  addNewCol = (id, event) => {
    event.preventDefault();
    let newId = id + 1;
    let newCol = {
      id: newId,
      text: `col${newId}`,
      image: ""
    };
    let newState = [...this.state.columns];
    newState.push(newCol);
    this.setState({
      columns: newState
    });
  };
  removeCol = event => {
    event.preventDefault();
    let newState = [...this.state.columns];
    newState.pop();
    this.setState({
      columns: newState
    });
  };
  /* Handle Click Radio Butoon */
  handleRadioClick = (clickedRow, event) => {
    let newState = [...this.state.rows];
    newState[clickedRow.id - 1].radioOption = event.target.value;
    this.setState({
      rows: newState
    });
  };

  handleStateData = () => {
    this.props.callback(this.state);
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h2>Question Editor View</h2>
        <form className={classes.container} noValidate autoComplete="off">
          <InputBase
            className={classes.inputBase}
            value={this.state.title}
            onChange={this.handleChange("title")}
          />
        </form>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right"> </TableCell>
                {this.state.columns.map(col => (
                  <TableCell key={col.id} align="right">
                    <InputBase
                      className={classes.inputBase}
                      value={col.text}
                      onChange={this.handleChangeCol(col.id)}
                    />
                  </TableCell>
                ))}
                <TableCell className={classes.buttons}>
                  <Fab
                    aria-label="Add"
                    color="default"
                    size="small"
                    className={classes.fab}
                    onClick={e => this.addNewCol(this.state.columns.length, e)}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    aria-label="Add"
                    color="secondary"
                    size="small"
                    className={classes.remove}
                    onClick={e => this.removeCol(e)}
                  >
                    <RemoveIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell component="th" scope="row">
                    <InputBase
                      className={classes.inputBase}
                      value={row.text}
                      onChange={this.handleChangeRow(row.id)}
                    />
                  </TableCell>
                  {this.state.columns.map(col => (
                    <TableCell key={col.id}>
                      <input
                        id={col.id}
                        type="radio"
                        name={row.id}
                        value={col.text}
                        onChange={e => this.handleRadioClick(row, e)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              <TableRow>
                <TableCell>
                  <Fab
                    aria-label="Add"
                    color="default"
                    size="small"
                    className={classes.fab}
                    onClick={e => this.addNewRow(this.state.rows.length, e)}
                  >
                    <AddIcon />
                  </Fab>
                  <Fab
                    aria-label="Add"
                    color="secondary"
                    size="small"
                    className={classes.remove}
                    onClick={e => this.removeRow(e)}
                  >
                    <RemoveIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <Button className={classes.button} onClick={this.handleStateData}>
          Save
        </Button>
      </div>
    );
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);
