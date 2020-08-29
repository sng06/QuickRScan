import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormGroup from "@material-ui/core/FormGroup";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "items/CustomButtons/Button.js";
import { updateSheetValue } from "../../googleAPI/Sheets";
import Box from "@material-ui/core/Box";
import { updateSheetData } from "../../actions/index";
// import { updateSheets } from "../../googleAPI/SpreadSheets";

const useStyles = (theme) => ({
  paper: {
    width: 450,
    height: 600,
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
  textField: {
    width: 200,
    marginTop: 12,
  },
});

const dropDownMenuOptions = [
  { item: "Advertising" },
  { item: "Commission" },
  { item: "Computer Expense" },
  { item: "Courier & Postage" },
  { item: "Insurance" },
  { item: "License, fees, dues" },
  { item: "Meals & Entertainment" },
  { item: "Office" },
  { item: "Professional Development" },
  { item: "Professional Fees (Legal & Accounting)" },
  { item: "Rent" },
  { item: "Subcontractors" },
  { item: "Supplies" },
  { item: "Telephone" },
  { item: "Travel" },
  { item: "Utilities" },
  { item: "Vehicle - Gas" },
  { item: "Vehicle - Insurance" },
  { item: "Vehicle - Lease" },
  { item: "Vehicle - Parking" },
  { item: "Vehicle -R & M" },
];

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      sheetRowNum: "",
      desription: "",
      date: "",
      grossAmount: "",
      gst: "",
      total: "",
    };
  }

  //   componentDidMount() {
  //     hist.push("/result");
  //   }

  // getFiles = (token) => {
  //   return fetch(url, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // };

  // getDrivefiles = (token) => {
  //   return this.getFiles(token)
  //     .then((response) => response.json())
  //     .then((files) => console.log("App.js | files", files));
  // };

  // updateSheetData = async (token) => {
  //   if (token) {
  //     // const values = await processInput();
  //     return updateSheetValue(token)
  //       .then(() => {
  //         console.log("App.js | value updated in Spreadsheet");
  //       })
  //       .catch((error) => {
  //         console.log("App.js | ", "ERROR updating value", error);
  //       });
  //   } else {
  //     console.log(
  //       "App.js 72 | No sheetId or Token, please generate them with the buttons before updating the sheet"
  //     );
  //   }
  // };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.paper}>
          <Box
            className={classes.box}
            display="flex"
            justifyContent="center"
            m={1}
            p={1}
          >
            <ul>
              <li style={{ listStyle: "none" }}>
                <Autocomplete
                  id="combo-box-demo"
                  options={dropDownMenuOptions}
                  getOptionLabel={(option) => option.item}
                  style={{ width: "35ch" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                      style={{ marginTop: 15 }}
                    />
                  )}
                  onChange={(e, value) => {
                    this.setState({ category: value.item });
                  }}
                />
                <TextField
                  className={classes.textField}
                  id="sheetRow"
                  label="Sheet Row No."
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({ sheetRowNum: e.target.value })
                  }
                />
                <TextField
                  className={classes.textField}
                  id="description"
                  label="Description"
                  type="text"
                  multiline
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
                <TextField
                  className={classes.textField}
                  id="date"
                  label="Date"
                  variant="outlined"
                  onChange={(e) => this.setState({ date: e.target.value })}
                />
                <TextField
                  className={classes.textField}
                  id="gross-amount"
                  label="Gross Amount"
                  type="text"
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({ grossAmount: e.target.value })
                  }
                />
                <TextField
                  className={classes.textField}
                  id="gst"
                  label="GST"
                  type="text"
                  variant="outlined"
                  onChange={(e) => this.setState({ gst: e.target.value })}
                />
                <TextField
                  className={classes.textField}
                  id="total-amount"
                  label="Total"
                  type="text"
                  variant="outlined"
                  onChange={(e) => this.setState({ total: e.target.value })}
                />
              </li>
            </ul>
          </Box>

          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
              onClick={() => {
                this.props.updateSheetData(
                  this.props.userInfo.token,
                  this.state.category,
                  this.state.sheetRowNum,
                  this.state.description,
                  this.state.date,
                  this.state.grossAmount,
                  this.state.gst,
                  this.state.total
                );
              }}
            >
              SAVE TO SHEET
            </Button>
            {/* <Button
              className={classes.button}
              color="primary"
              variant="outlined"
            >
              SAVE TO NEW SHEET
            </Button>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
            >
              GET FILE
            </Button> */}
          </div>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateSheetData: (
      token,
      category,
      sheetRowNum,
      description,
      date,
      grossAmount,
      gst,
      total
    ) =>
      dispatch(
        updateSheetData(
          token,
          category,
          sheetRowNum,
          description,
          date,
          grossAmount,
          gst,
          total
        )
      ),
  };
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
