// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient();
const db = admin.firestore();

// resize process image
console.log("Testing outside function");
exports.callVision = functions.storage
  .object("images")
  .onFinalize(async (object) => {
    console.log("inside function");
    // file path acquired
    const filePath = `gs://${object.bucket}/${object.name}`;
    console.log("file" + filePath);
    // Get ContentType
    const contentType = object.contentType;

    // return client
    //   .textDetection(filePath)
    //   .then((response) => {
    //     // let textDetection = response.textAnnotations;
    //     // return { text: textDetection };
    //     return response.textAnnotations;
    //   })
    //   .then((visionResp) => {
    //     //var db = admin.firestore();
    //     console.log("result is: " + visionResp);
    //     console.log("Text:");
    //     console.log("data", visionResp[0]);
    //     console.log("description ", visionResp.descriptions);

    //     let imageRef = db.collection("images").doc(visionResp[0].descriptions);
    //   })
    //   .then((res) => console.log("success"))
    //   .catch((err) => {
    //     console.log("vision api error", err);
    //   });

    return (async () => {
      const [data] = await client.textDetection(filePath);
      const detections = data.textAnnotations;

      db.collection("result").add(detections[0]);
      console.log("Text:");
      console.log("data", detections[0]);
      console.log("description ", detections.descriptions);
      //   console.log("Data", detections);
      //   detections.forEach((text) => console.log(text));
      //   console.log(data[0].textAnnotations);
    })()
      .then(() => console.log("success"))
      .catch((err) => console.log(" An error has occurred "));
  });
