import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
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

export default function ImageDropZone(props) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

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

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

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

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "1px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {!isDragActive && "Click here or drag & drop a file to upload!"}
        {isDragActive && !isDragReject && "Drop it like it's hot!"}
        {isDragReject && "File type not accepted, sorry!"}
      </div>
      {/* {image ? (
        <img src={imagePreview} alt="dummy" width="200" height="200" />
      ) : null} */}
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
