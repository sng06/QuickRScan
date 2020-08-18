import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import Header from "views/Navigation/Header.js";

import Button from "components/CustomButtons/Button.js";
import Typography from "@material-ui/core/Typography";
import UploadImage from "views/ContentPage/UploadImage";
import ImageDropZone from "views/ContentPage/ImageDropZone";

const useStyles = (theme) => ({
  contentOverlay: {
    height: 1000,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    marginTop: 200,
    justifyContent: "center",
  },
});

class ContentPage extends React.Component {
  constructor(props) {
    super(props);
  }

  //   const [uploadImage, setImage] = useState(null);
  //   const [imageUrl, setURL] = useState("");
  //   const [image, setImage] = useState(null);

  //   const handlePicChange = (e) => {
  //     if (e.target.files[0]) {
  //       const image = e.target.files[0];
  //       setImage({ image });
  //       console.log("pic changed");
  //     }
  //   };

  //   const handleImageUpload = () => {
  //     const { image } = uploadImage;
  //     const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // progrss function ....
  //         // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //         // this.setState({progress});
  //         console.log("Uploading.....");
  //       },
  //       (error) => {
  //         // error function ....
  //         console.log(error);
  //       },
  //       () => {
  //         // complete function ....
  //         storage
  //           .ref("images")
  //           .child(image.name)
  //           .getDownloadURL()
  //           .then((url) => {
  //             console.log(url);
  //             setURL(url);
  //           });
  //       }
  //     );
  //   };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <Header
          color="transparent"
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white",
          }}
          {...rest}
        /> */}
        {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}
        {this.props.userInfo.isLoggedIn ? (
          <div>
            <Header
              isUserAuthenticated={this.props.userInfo.isLoggedIn}
              userInfo={this.props.userInfo}
            />

            <div className={classes.paper}>
              <Paper className={classes.contentOverlay}>
                <div className={classes.content}>
                  <div>
                    {JSON.stringify(this.props.userInfo.isLoggedIn)}
                    {this.props.userInfo.userName}
                    Hiiiii
                  </div>
                  <br />
                  {/* <UploadImage /> */}
                  <ImageDropZone />
                </div>
              </Paper>
            </div>
          </div>
        ) : (
          <div>You must log in!!</div>
        )}
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
)(ContentPage);
