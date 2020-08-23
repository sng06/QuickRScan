import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import Header from "views/Navigation/Header.js";
import ImageDropZone from "views/ContentPage/ImageDropZone";
import { getTextDetectionResult } from "../../actions/index";
import { firestore } from "config/FirebaseConfig";
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const useStyles = (theme) => ({});

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
        <div className={classes.loading}>
          <CircleLoader
            css={override}
            size={80}
            color={"green"}
            loading={this.props.textDetectionResult.loading}
          />
        </div>
        Hiiii testing here
        <div>
          {this.props.textDetectionResult.imageURL && (
            <img
              src={this.props.textDetectionResult.imageURL}
              alt="Uploaded image"
              width="550"
              height="550"
            ></img>
          )}
        </div>
        <div>
          {this.props.textDetectionResult.textResult && (
            <li style={{ listStyle: "none" }}>
              {this.props.textDetectionResult.textResult}
            </li>
          )}
        </div>
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
