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
import Grow from "@material-ui/core/Grow";
import axios from "axios";

const styles = theme => ({
  root: {
    width: "100%",
    margin: theme.spacing.unit * 3,
    overflowX: "auto",
    maxWidth: 700
  },
  headerInput: {
    width: 150,
    textAlign: "right",
    fontStyle: "italic"
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
  tableCell: {
    borderBottom: "none"
  },
  scroll: {
    display: "block",
    overflowX: "scroll",
    whiteSpace: "nowrap"
  },
  inputBase: {
    textAlign: "right",
    fontStyle: "italic",
    width: 50
  },
  buttons: {
    width: 300,
    padding: 0,
    borderBottom: "none"
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
    backgroundColor: "#1dd1a1",
    margin: 10
  },
  newButton: {
    backgroundColor: "#dfe6e9",
    marginTop: 15
  },
  fileInput: {
    display: "none"
  },
  fileInputIcon: {
    backgroundColor: "#dfe6e9",
    padding: 5
  },
  labelContainer: {
    position: "absolute",
    borderBottom: "none",
    padding: 5
  },
  imageUpload: {
    width: 50,
    float: "left"
  },
  imageUploadCol: {
    width: 50,
    display: "block",
    textAlign: "left"
  },
  image: {
    width: 40
  }
});

class Question extends React.Component {
  state = {
    title: "Title of the Question",
    rows: [
      { id: 1, text: "row1", image: "", radioOption: "", checked: true },
      { id: 2, text: "row2", image: "", radioOption: "", checked: true },
      { id: 3, text: "row3", image: "", radioOption: "", checked: true },
      { id: 4, text: "row4", image: "", radioOption: "", checked: true }
    ],
    columns: [
      { id: 1, text: "col1", image: "", checked: true },
      { id: 2, text: "col2", image: "", checked: true },
      { id: 3, text: "col3", image: "", checked: true },
      { id: 4, text: "col4", image: "", checked: true }
    ]
  };

  componentDidMount() {
    this.handleStateData();
  }
  handleChange = name => e => {
    this.setState({
      [name]: e.target.value
    });
  };
  /* Edit Label */
  handleChangeLabel = (id, name) => e => {
    let newState = [...this.state[name]];
    newState[id - 1].text = e.target.value;
    this.setState({
      [name]: newState
    });
  };
  /* Add and remove rows and columns */
  addNewRowCol = (id, name, e) => {
    e.preventDefault();
    let newId = id + 1;
    var newRowCol = null;
    if (name === "rows") {
      newRowCol = {
        id: newId,
        text: `row${newId}`,
        image: "",
        radioOption: "",
        checked: true
      };
    } else {
      newRowCol = {
        id: newId,
        text: `col${newId}`,
        image: "",
        checked: true
      };
    }
    let newState = [...this.state[name]];
    newState.push(newRowCol);
    this.setState({
      [name]: newState
    });
  };
  removeRowCol = (name, e) => {
    e.preventDefault();
    let newState = [...this.state[name]];
    newState.pop();
    this.setState({
      [name]: newState
    });
  };

  handleRadioClick = (clickedRow, e) => {
    let newState = [...this.state.rows];
    newState[clickedRow.id - 1].radioOption = e.target.value;
    this.setState({
      rows: newState
    });
  };

  /* Lift up the state */
  handleStateData = () => {
    this.props.callback(this.state);
  };

  /* Save in the database */
  handleSubmit = e => {
    e.preventDefault();

    const newQuestion = {
      title: this.state.title,
      rows: this.state.rows,
      columns: this.state.columns
    };

    axios
      .post("http://localhost:4000/questions/save", newQuestion)
      .then(res => console.log(res.data));
  };

  handleResetData = () => {
    this.setState({
      title: "Title of the Question",
      rows: [
        { id: 1, text: "row1", image: "", radioOption: "", checked: true },
        { id: 2, text: "row2", image: "", radioOption: "", checked: true },
        { id: 3, text: "row3", image: "", radioOption: "", checked: true },
        { id: 4, text: "row4", image: "", radioOption: "", checked: true }
      ],
      columns: [
        { id: 1, text: "col1", image: "", checked: true },
        { id: 2, text: "col2", image: "", checked: true },
        { id: 3, text: "col3", image: "", checked: true },
        { id: 4, text: "col4", image: "", checked: true }
      ]
    });
  };

  /* Handle image change */
  handleImageChange = (id, name, e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    let newState = [...this.state[name]];

    reader.onloadend = () => {
      newState[id - 1].image = reader.result;
      this.setState({
        [name]: newState
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { classes } = this.props;

    const imageLoad = (obj, name) => {
      if (obj.image !== "") {
        return <img className={classes.image} alt="option" src={obj.image} />;
      } else {
        return (
          <label htmlFor={`input-file${name}${obj.id}`}>
            <AddIcon className={classes.fileInputIcon} />
            <input
              id={`input-file${name}${obj.id}`}
              className={classes.fileInput}
              type="file"
              onChange={e => this.handleImageChange(obj.id, name, e)}
            />
          </label>
        );
      }
    };

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Question Editor View</h2>
          <div className={classes.container} noValidate autoComplete="off">
            <InputBase
              className={classes.headerInput}
              value={this.state.title}
              onChange={this.handleChange("title")}
            />
          </div>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell align="right" className={classes.tableCell}>
                    {" "}
                  </TableCell>
                  {this.state.columns.map(col => (
                    <Grow
                      key={col.id}
                      in={col.checked}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(col.checked ? { timeout: 1000 } : {})}
                    >
                      <TableCell align="right" className={classes.tableCell}>
                        <div className={classes.imageUploadCol}>
                          {imageLoad(col, "columns")}
                        </div>
                        <InputBase
                          className={classes.inputBase}
                          value={col.text}
                          onChange={this.handleChangeLabel(col.id, "columns")}
                        />
                      </TableCell>
                    </Grow>
                  ))}
                  <TableCell className={classes.buttons}>
                    <Fab
                      aria-label="Add"
                      color="default"
                      size="small"
                      className={classes.fab}
                      onClick={e =>
                        this.addNewRowCol(
                          this.state.columns.length,
                          "columns",
                          e
                        )
                      }
                    >
                      <AddIcon />
                    </Fab>
                    <Fab
                      aria-label="Add"
                      color="secondary"
                      size="small"
                      className={classes.remove}
                      onClick={e => this.removeRowCol("columns", e)}
                    >
                      <RemoveIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.map((row, index) => (
                  <TableRow key={index} className={classes.tableRow}>
                    <Grow
                      in={row.checked}
                      style={{ transformOrigin: "0 0 0" }}
                      {...(row.checked ? { timeout: 1000 } : {})}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.labelContainer}
                      >
                        <div className={classes.imageUpload}>
                          {imageLoad(row, "rows")}
                        </div>
                        <InputBase
                          className={classes.inputBase}
                          value={row.text}
                          onChange={this.handleChangeLabel(row.id, "rows")}
                        />
                      </TableCell>
                    </Grow>
                    {this.state.columns.map(col => (
                      <Grow
                        key={col.id}
                        in={row.checked}
                        style={{ transformOrigin: "0 0 0" }}
                        {...(row.checked ? { timeout: 1000 } : {})}
                      >
                        <TableCell className={classes.tableCell}>
                          <input
                            id={col.id}
                            type="radio"
                            name={row.id}
                            value={col.text}
                            onChange={e => this.handleRadioClick(row, e)}
                          />
                        </TableCell>
                      </Grow>
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
                      onClick={e =>
                        this.addNewRowCol(this.state.rows.length, "rows", e)
                      }
                    >
                      <AddIcon />
                    </Fab>
                    <Fab
                      aria-label="Add"
                      color="secondary"
                      size="small"
                      className={classes.remove}
                      onClick={e => this.removeRowCol("rows", e)}
                    >
                      <RemoveIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Button
            type="submit"
            className={classes.button}
            onClick={this.handleStateData}
          >
            Save
          </Button>
        </form>
        <Button
          type="submit"
          className={classes.newButton}
          onClick={this.handleResetData}
        >
          New Question
        </Button>
      </div>
    );
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);
