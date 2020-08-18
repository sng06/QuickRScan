import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import classNames from "classnames";
import Footer from "components/Footer/Footer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";
import studio1 from "assets/img/examples/studio-1.jpg";

import FileUploader from "react-firebase-file-uploader";
import firebase from "firebase";
//import { storage } from "firebase";
import { storage } from "config/FirebaseConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 600,
    width: 500,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function ContentPage(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const { ...rest } = props;
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const [uploadImage, setImage] = useState(null);
  const [imageUrl, setURL] = useState("");
  //   const [image, setImage] = useState(null);

  const handlePicChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setImage({ image });
      console.log("pic changed");
    }
  };

  const handleImageUpload = () => {
    const { image } = uploadImage;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        // this.setState({progress});
        console.log("Uploading.....");
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setURL(url);
          });
      }
    );
  };

  //   const handleUploadSuccess = async (filename) => {
  //     try {
  //       let { bucket, fullPath } = await firebase
  //         .storage()
  //         .ref("images")
  //         .child(filename)
  //         .getMetadata();
  //       console.log("bucket", bucket);
  //       console.log("fullPath", fullPath);
  //       let downloadURL = await firebase
  //         .storage()
  //         .ref("images")
  //         .child(filename)
  //         .getDownloadURL();
  //       console.log("downloadURL", downloadURL);

  //       let { uid, email, displayName } = await firebase.auth().currentUser;

  //       let newPhoto = {
  //         url: downloadURL,
  //         userName: displayName,
  //         userId: uid,
  //         email,
  //         bucket,
  //         fullPath,
  //       };
  //       console.log("newPhoto", newPhoto);

  //       await firebase
  //         .firestore()
  //         .collection("photos")
  //         .add(newPhoto);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                  {/* {[0, 1, 2].map((value) => (
                    <Grid key={value} item>
                      <Paper className={classes.paper} />
                    </Grid>
                  ))} */}
                  <Grid key={1} item>
                    <div className={classes.name}>
                      <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                          <h3 className={classes.title}>Image</h3>
                          {/* <label> */}
                          <div>
                            {/* <label> */}
                            <input type="file" onChange={handlePicChange} />
                            {/* <FileUploader
                                hidden
                                accept="image/*"
                                storageRef={firebase.storage().ref("images")}
                                //onUploadStart={handleUploadStart}
                                //   onUploadError={this.handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                //onProgress={this.handleProgress}
                              />
                            </label> */}
                            <Button
                              color="primary"
                              // href="/profile-page"
                              target="_blank"
                              size="small"
                              //onClick={handleUpload}
                              // className={classes.navLink}
                              onClick={handleImageUpload}
                            >
                              Upload
                            </Button>
                          </div>
                          {/* <FileUploader
                              hidden
                              accept="image/*"
                              storageRef={firebase.storage().ref("images")}
                              //   onUploadStart={this.handleUploadStart}
                              //   onUploadError={this.handleUploadError}
                              onUploadSuccess={handleUploadSuccess}
                              //onProgress={this.handleProgress}
                            />
                          </label> */}
                          <Button
                            color="primary"
                            href=""
                            target="_blank"
                            className={classes.navLink}
                          >
                            Detect
                          </Button>
                        </ListItem>
                      </List>
                      {/* <h3 className={classes.title}>Image to Scan</h3> */}
                      <Paper
                        className={classes.paper}
                        style={{ overflow: "hidden" }}
                      >
                        <img
                          src={imageUrl}
                          alt="uploaded images"
                          height="800"
                          width="500"
                          //   style={{ width: "500", height: "800" }}
                        />
                      </Paper>
                    </div>
                    {/* <List className={classes.list}>
                      <ListItem className={classes.listItem}>
                        <Button
                          color="transparent"
                          href="/profile-page"
                          target="_blank"
                          size="large"
                          className={classes.navLink}
                        >
                          My Account
                        </Button>
                        <Button
                          color="transparent"
                          href=""
                          target="_blank"
                          className={classes.navLink}
                        ></Button>
                        )}
                      </ListItem>
                    </List> */}
                  </Grid>
                  <Grid key={2} item>
                    <div className={classes.name}>
                      <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                          <h3 className={classes.title}>Text Detected </h3>
                        </ListItem>
                      </List>
                      <Paper
                        className={classes.paper}
                        style={{ overflow: "hidden" }}
                      >
                        {/* <img
                          src={studio1}
                          style={{ width: "500", height: "800" }}
                        ></img> */}
                      </Paper>
                    </div>
                  </Grid>
                  <Grid key={3} item>
                    <div className={classes.name}>
                      <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                          <h3 className={classes.title}>Data Form </h3>
                        </ListItem>
                      </List>
                      <Paper
                        className={classes.paper}
                        style={{ overflow: "hidden" }}
                      >
                        {/* <img
                          src={studio1}
                          style={{ width: "500", height: "800" }}
                        ></img> */}
                      </Paper>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper className={classes.control}>
                      <Grid container>
                        <Grid item>
                          <FormLabel>spacing</FormLabel>
                          <RadioGroup
                            name="spacing"
                            aria-label="spacing"
                            value={spacing.toString()}
                            onChange={handleChange}
                            row
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                              <FormControlLabel
                                key={value}
                                value={value.toString()}
                                control={<Radio />}
                                label={value.toString()}
                              />
                            ))}
                          </RadioGroup>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

{
  /* <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        This is a sheet of paper.
      </Typography>
      <Typography component="p">Paper can be used to build surface or other elements for your application.</Typography>
    </Paper> */
}
