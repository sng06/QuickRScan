import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "views/Navigation/Header.js";
import { getTextDetectionResult } from "../../actions/index";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import TextResultTable from "./TextResultTable";
import UploadedImage from "./UploadedImage";
import Form from "./Form";

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
    justifyContent: "center",
  },
});

const override = css`
  display: block;
  margin: 2 auto;
`;

class ResultView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTextDetectionResult();
    // this.getTextDetectionResult();
  }

  //   getTextDetectionResult = () => {
  //     console.log("checking get text detection result");
  //     const data = firestore
  //       .collection("results")
  //       //   .orderBy("createdAtServerTime", "desc")
  //       .limit(1)
  //       //   .doc("tYICSAfDcNGBOiRig0nK")
  //       .onSnapshot((snapshot) => {
  //         let allData = [];
  //         console.log("all snapshot data", snapshot);
  //         snapshot.forEach((doc) => {
  //           console.log("doc: ", doc.id);
  //           console.log("each snapshot data", doc.id, doc.data());
  //           var newItem = doc.data();
  //           newItem.id = doc.id;
  //           allData.push(newItem);
  //           console.log(JSON.stringify(allData[0]));
  //         });
  //       });
  //   };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* {this.props.userInfo.isLoggedIn ? ( */}

        <Header
          isUserAuthenticated={this.props.userInfo.isLoggedIn}
          userInfo={this.props.userInfo}
        />
        <div className={classes.loading}>
          <CircleLoader
            css={override}
            size={80}
            color={"green"}
            loading={this.props.textDetectionResult.loading}
          />
        </div>
        {/* </div>
          Hiiii testing here
          <div> */}
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <div className={classes.uploadedImage}>
                {this.props.textDetectionResult.imageURL && (
                  <UploadedImage
                    textDetectionResult={this.props.textDetectionResult}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs>
              <div className={classes.textResultTable}>
                {this.props.textDetectionResult.textResult && (
                  <TextResultTable
                    textResult={this.props.textDetectionResult.textResult}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs>
              <div className={classes.form}>
                <Form />
              </div>
            </Grid>
          </Grid>
        </div>

        {/* ) : (
          <div>You must log in!!</div>
        )} */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTextDetectionResult: () => dispatch(getTextDetectionResult()),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
    textDetectionResult: state.textDetectionResultStore,
  };
};

export default compose(
  withStyles(useStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ResultView);
