import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Button from "components/CustomButtons/Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import { storage } from "config/FirebaseConfig";
import { firestore } from "config/FirebaseConfig";
import { hist } from "../../index";
//https://upmostly.com/tutorials/react-dropzone-file-uploads-react
//https://react-dropzone.js.org/

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "60px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#6c757d",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  // color: "#bdbdbd",
  color: "#5e60ce",
  outline: "none",
  transition: "border .24s ease-in-out",
  multiple: false,
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const imageIconStyle = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

const buttonStyle = {
  marginTop: 15,
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};

// const thumbs = files.map((file) => (
//   <div style={thumb} key={file.name}>
//     <div style={thumbInner}>
//       <img src={file.preview} width="550" height="550" />
//     </div>
//   </div>
// ));

// const thumbsContainer = {
//   display: "flex",
//   flexDirection: "row",
//   flexWrap: "wrap",
//   marginTop: 16,
// };

// const thumb = {
//   display: "inline-flex",
//   borderRadius: 2,
//   border: "1px solid #eaeaea",
//   marginBottom: 8,
//   marginRight: 8,
//   // // width: 100,
//   // height: 100,
//   padding: 4,
//   boxSizing: "border-box",
// };

// const thumbInner = {
//   display: "flex",
//   minWidth: 0,
//   overflow: "hidden",
// };

export default function ImageDropZone(props) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const imgElement = React.useRef(null);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const onDrop = (acceptedFiles) => {
    // console.log(acceptedFiles);
    // if (acceptedFiles) {
    setImage(acceptedFiles[0]);
    //   setImagePreview(URL.createObjectURL(acceptedFiles));
    // }
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  // const imageSize = (image) => {
  //   // let img = new Image();
  //   // img.onload = function() {
  //   //   alert("height: " + img.height + "width: " + img.width);
  //   // };
  //   // img.src = image;
  //   console.log("image size", image.offsetWidth, offsetHeight);
  // };

  const handleImageUpload = () => {
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
      async () => {
        // complete function ....
        let { bucket, fullPath } = await storage
          .ref("images")
          .child(image.name)
          .getMetadata();
        console.log("bucket", bucket);
        console.log("fullPath", fullPath);

        let downloadURL = await storage
          .ref("images")
          .child(image.name)
          .getDownloadURL();
        console.log("downloadURL", downloadURL);

        let newPhoto = {
          imageURL: downloadURL,
          userName: props.userInfo.userName,
          email: props.userInfo.userEmail,
          createdAtLocalTime: new Date().toLocaleString(),
          createAtServerTime: firebase.firestore.FieldValue.serverTimestamp(),
          bucket,
          fullPath,
        };
        console.log("newPhoto", newPhoto);

        await firestore.collection("results").add(newPhoto);
        hist.push("/result");
      }
    );
  };

  return (
    <section className="container">
      <div className="dropzone" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {/* {!isDragActive && "Click here or drag & drop a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"} */}

        {files.length > 0 ? (
          <img
            src={files[0].preview}
            width="550"
            height="550"
            ref={imgElement}
            onLoad={() =>
              console.log(
                "image size",
                imgElement.current.naturalHeight,
                imgElement.current.naturalWidth
              )
            }
          />
        ) : (
          <div className="defaultBackground">
            <FontAwesomeIcon icon={faImages} size="3x" style={imageIconStyle} />
            <br />
            {!isDragActive && "Click here or drag & drop a file to upload!"}
            {isDragActive && !isDragReject && "Drop it like it's hot!"}
            {isDragReject && "File type not accepted, sorry!"}
          </div>
        )}
      </div>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
      {image ? (
        <div>
          <Button
            color="primary"
            variant="outlined"
            style={buttonStyle}
            onClick={handleImageUpload}
          >
            DETECT TEXT
          </Button>
          {/* {imageSize(image)} */}
        </div>
      ) : null}
    </section>
  );
}
