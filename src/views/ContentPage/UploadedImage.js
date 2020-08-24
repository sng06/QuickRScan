import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//https://stackoverflow.com/questions/46030129/react-get-width-height-of-image-to-process?rq=1

const useStyles = makeStyles((theme) => ({
  boundingBox: {
    position: "absolute",
    boxShadow: "0 0 0 2px #2a9d8f inset",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    cursor: "pointer",
    textAlign: "end",
    color: " #e76f51",
  },
  container: {
    position: "relative",
    width: "100%",
    height: "auto",
  },
  image: {
    width: "100%",
    height: "auto",
  },
}));

export default function UploadedImage(props) {
  const [imageHeight, setImageHeight] = useState("");
  const [imageWidth, setImageWidth] = useState("");

  const classes = useStyles();

  const imgElement = React.useRef(null);

  const setImageSize = () => {
    setImageHeight(imgElement.current.naturalHeight);
    setImageWidth(imgElement.current.naturalWidth);
  };

  const boundingBoxes = () => {
    let objectBoxes;

    let vertices = [];
    let verticesNomalized = [];
    props.textDetectionResult.textResult.forEach((object) => {
      if (!object.boundingPoly) {
      } else if (object.boundingPoly.normalizedVertices.length > 0) {
        verticesNomalized.push(object.boundingPoly.normalizedVertices);
      } else if (object.boundingPoly.vertices.length > 0) {
        vertices.push(object.boundingPoly.vertices);
      }
    });
    let boxes = [];

    let w = imageWidth;
    let h = imageHeight;

    verticesNomalized.forEach((vertice, index) => {
      boxes.push(
        <div
          key={index}
          className={classes.boundingBox}
          style={{
            top: vertice[1].y * 100 + "%",
            right: (1 - vertice[1].x) * 100 + "%",
            bottom: (1 - vertice[3].y) * 100 + "%",
            left: vertice[3].x * 100 + "%",
          }}
        >
          {index + 1}
        </div>
      );
    });
    vertices.forEach((vertice, index) => {
      boxes.push(
        <div
          key={index}
          className={classes.boundingBox}
          style={{
            top: (vertice[1].y / h) * 100 + "%",
            right: (1 - vertice[1].x / w) * 100 + "%",
            bottom: (1 - vertice[3].y / h) * 100 + "%",
            left: (vertice[3].x / w) * 100 + "%",
          }}
        >
          {index + 1}
        </div>
      );
    });
    return (objectBoxes = boxes);
  };

  return (
    <div className={classes.container}>
      <img
        className={classes.image}
        src={props.textDetectionResult.imageURL}
        alt="Uploaded image"
        ref={imgElement}
        onLoad={() => setImageSize()}
        // console.log(
        //   "image size",
        //   imgElement.current.naturalHeight,
        //   imgElement.current.naturalWidth
        //   //   imgElement.height,
        //   //   imgElement.width
        // )
      ></img>
      {boundingBoxes()}
    </div>
  );
}
