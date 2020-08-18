import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Typography from "@material-ui/core/Typography";
import Button from "components/CustomButtons/Button.js";
import Box from "@material-ui/core/Box";
import image from "assets/img/bg7.jpg";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import { loginWithGoogle } from "views/LoginPage/LoginAuth";
import { loadUserData } from "../../actions/index";
import { firebaseAuth } from "config/FirebaseConfig";
import { hist } from "index";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   firebaseAuth().onAuthStateChanged(async (userAuth) => {
  //     if (userAuth) {
  //       const user = await createUserProfileDocument(userAuth);
  //       user.onSnapshot((snapshot) => {
  //         this.setState({
  //           currentUser: {
  //             id: snapshot.id,
  //             ...snapshot.data(),
  //           },
  //         });
  //         // console.log("checking: ", this.state.currentUser);
  //         console.log("checking: ", snapshot);
  //       });
  //     }
  //     this.setState({ currentUser: userAuth });
  //   });
  // }

  componentDidMount() {
    this.props.loadUserData();
  }

  handleGoogleLogin = () => {
    loginWithGoogle().catch((err) => {
      console.log(err);
    });
  };

  // handleRedirect = () => {
  //   if (this.props.userInfo.isLoggedIn) {
  //     this.props.history.push("/content-page");
  //   }
  // };

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <Typography
            style={{ textAlign: "center" }}
            variant="h1"
            className={classes.websiteTitle}
          >
            QuickRScan
          </Typography>
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleGoogleLogin}
            >
              <i className={"fab fa-google-plus-g"} /> Login with Google
            </Button>
          </Box>
        </div>
        {/* {this.handleRedirect} */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserData: () => dispatch(loadUserData()),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);
