import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "components/CustomButtons/Button.js";
import Typography from "@material-ui/core/Typography";
import ImageSearchTwoToneIcon from "@material-ui/icons/ImageSearchTwoTone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
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
  imageIcon: {
    paddingLeft: 30,
    paddingRight: 50,
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

  return (
    <div
      className={classes.imageUpload}
      // style={{ backgroundImage: `url(${pic})` }}
    >
      <Typography
        className={classes.imageUploadTitle}
        variant="h5"
        color="inherit"
        gutterBottom
      >
        Select a picture and upload it here!
      </Typography>
      {/* <input type="file" id="image" onChange={handlePicChange} />
      <label htmlFor="image" className={classes.imageUploadIcon}>
        <ImageSearchTwoToneIcon size="8x" />
      </label> */}
      <label className={classes.imageIcon} htmlFor="imageIcon">
        <FontAwesomeIcon icon={faImages} size="8x" />
      </label>
      <input
        id="imageIcon"
        style={{ display: "none" }}
        type={"file"}
        onChange={handlePicChange}
      />
      <Button
        color="primary"
        target="_blank"
        size="small"
        onClick={handleImageUpload}
      >
        Upload
      </Button>
      <div>
        <img src={imageUrl} alt="Image" height="800" width="500" />
      </div>
    </div>
  );
}
