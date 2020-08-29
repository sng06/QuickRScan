import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Typography from "@material-ui/core/Typography";
import Button from "items/CustomButtons/Button.js";
import Box from "@material-ui/core/Box";
import image from "assets/img/bg7.jpg";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { handleGoogleLogin } from "../../actions/index";
import { loginWithGoogle } from "views/LoginPage/LoginAuth";
import { loadUserData } from "../../actions/index";
import { loadAccessToken } from "../../actions/index";
import { firebaseAuth } from "config/FirebaseConfig";
import { hist } from "index";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.loadUserData();
  // }

  handleGoogleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        // this.props.loadAccessToken(res.credential.accessToken);
        this.props.loadUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    // loadUserData: () => dispatch(loadUserData()),
    loadUserData: (res) => dispatch(loadUserData(res)),
    // loadAccessToken: (token) => dispatch(loadAccessToken(token)),
    // handleGoogleLogin: () => dispatch(handleGoogleLogin()),
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
