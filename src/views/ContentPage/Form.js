import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "components/CustomButtons/Button.js";

const useStyles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  paper: {
    width: 400,
  },
  button: {
    marginTop: 15,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

const dropDownMenuOptions = [{ item: "Personal" }];
class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  //   componentDidMount() {
  //     hist.push("/result");
  //   }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.paper}>
          <Autocomplete
            id="combo-box-demo"
            options={dropDownMenuOptions}
            getOptionLabel={(option) => option.item}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
          <FormGroup className={classes.root}>
            <TextField
              required
              id="outlined-required"
              label="Date"
              // placeholder="M/D/Y"
              defaultValue="M/D/Y"
              variant="outlined"
            />
            <TextField
              required
              id="outlined-required"
              label="Description"
              multiline
              // placeholder="Location/ inv no."
              defaultValue="Location/ inv no."
              variant="outlined"
            />

            <TextField
              required
              id="outlined-required"
              label="Gross Amount"
              defaultValue="$"
              // placeholder="$"
              variant="outlined"
            />
            <TextField
              required
              id="outlined-required"
              label="GST"
              defaultValue="$"
              // placeholder="$"
              variant="outlined"
            />
            <TextField
              required
              id="outlined-required"
              label="Total"
              defaultValue="$"
              // placeholder="$"
              variant="outlined"
            />
          </FormGroup>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
            >
              SAVE TO SHEET
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
  };
};

export default compose(
  withStyles(useStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Form);
