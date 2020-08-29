import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { logout } from "views/LoginPage/LoginAuth";
import { unloadUserData } from "../../actions/index";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = (theme) => ({
  appbar: {
    color: "secondary",
    position: "sticky",
  },
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  websiteTitle: {
    flex: 1,
    marginLeft: 15,
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogOut = () => {
    this.props.unloadUserData();
    logout().catch((err) => {
      console.log(err);
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.isUserAuthenticated ? (
          <AppBar
            className={classes.appbar}
            // color="secondary"
            style={{ backgroundColor: "#9b5de5" }}
          >
            <Toolbar className={classes.toolbar}>
              {/* <img alt="logo" src={pic} style={{ width: 50, height: 50 }}></img> */}
              <Typography
                style={{ textAlign: "left" }}
                variant="h5"
                className={classes.websiteTitle}
              >
                <Link
                  to={"/uploadImage"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  QuickRScan
                </Link>
              </Typography>

              <List className="menu-list">
                <ListItem className="menu-item">
                  <Button
                    // href="/auth/logout"
                    color="inherit"
                    target="_self"
                    size="small"
                    onClick={this.handleLogOut}
                  >
                    Logout
                  </Button>

                  <Tooltip
                    title={this.props.userInfo.userEmail}
                    placement="bottom"
                  >
                    <Avatar
                      className={classes.avatar}
                      alt={this.props.userInfo.userName}
                      src={this.props.userInfo.userProfilePicURL}
                    />
                  </Tooltip>
                </ListItem>
              </List>
            </Toolbar>
          </AppBar>
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unloadUserData: () => dispatch(unloadUserData()),
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
)(Header);
