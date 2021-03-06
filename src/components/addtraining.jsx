import React, { Component } from "react";
import SkyLight from "react-skylight";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

class addTraining extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      date: "",
      duration: "",
      activity: ""
    };
    this.addModal = React.createRef();
  }

  // Get inputted values
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save input data to states, save them to a variable 'training' and send that variable to the addtraining function in customerlist.js
  // or get the function addtraining from customerlist.js as a prop
  addTraining = () => {
    if (this.state.date === "") return false;
    if (this.state.duration === "") return false;
    if (this.state.activity === "") return false;

    const training = {
      date: this.state.date,
      duration: this.state.duration,
      activity: this.state.activity,
      customer: this.props.link
    };
    this.props.addTraining(training).then(r => {
      //first one is when everything WORKS (resolve)
      // console.log(r);

      if (r.ok) {
        this.setState({
          date: "",
          duration: "",
          activity: ""
        });
        this.addModal.current.hide();
      } else {
        alert("Something went wrong! Try it again");
      }
    });
    // This clears the previously inputted values from the textfields
  };

  render() {
    const addDialog = {
      width: "250px",
      height: "250px",
      marginLeft: "-15%"
    };

    return (
      <div>
        <Button
          style={{ margin: 10 }}
          variant="contained"
          color="primary"
          onClick={() => this.addModal.current.show()}
        >
          <AddIcon />
          New training
        </Button>
        <SkyLight
          dialogStyles={addDialog}
          hideOnOverlayClicked
          ref={this.addModal}
          title="Add a new training"
        >
          <TextField
            placeholder="Date (YYYY-MM-DD)"
            name="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
          <br />
          <TextField
            placeholder="Duration (NN)"
            name="duration"
            onChange={this.handleChange}
            value={this.state.duration}
          />
          <br />
          <TextField
            placeholder="Activity (string)"
            name="activity"
            onChange={this.handleChange}
            value={this.state.activity}
          />
          <br />
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            onClick={this.addTraining}
          >
            <SaveIcon />
            Add training
          </Button>
        </SkyLight>
      </div>
    );
  }
}

export default addTraining;
