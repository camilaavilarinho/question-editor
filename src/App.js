import React, { Component } from "react";
import "./App.css";
import Question from "./components/Question";
import Summary from "./components/Summary";
import Grid from "@material-ui/core/Grid";

class App extends Component {
  state = {
    question: {}
  };

  getStateCallback = questionState => {
    this.setState({
      question: questionState
    });
  };

  render() {
    console.log("state: ", this.state);
    return (
      <Grid container spacing={24} className="App">
        <Grid item xs>
          <Question callback={this.getStateCallback} />
        </Grid>
        <Grid item xs>
          <Summary question={this.state.question} />
        </Grid>
      </Grid>
    );
  }
}

export default App;
