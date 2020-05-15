// const functions = require("firebase-functions");

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// // exports.helloWorld = functions.https.onRequest((request, response) => {
// //  response.send("Hello from Firebase!");
// // });

// const admin = require("firebase-admin");
// const vision = require("@google-cloud/vision");
// // const visionClient = new vision.ImageAnnotatorClient();
// const visionClient = Vision();
// let Promise = require("promise");
// const cors = require("cors")({ origin: true });
// const request = require("request");
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

// exports.callVision = functions.storage.object().onFinalize((event) => {
//   const obj = event.data;

//   const photoUrl = "gs://" + obj.bucket + "/" + obj.name;
//   const userId = obj.name.substring(0, obj.name.indexOf("/"));
//   userRef = db.ref("users").child(userId);

//   //     return Promise.resolve()
//   //       .then(() => {
//   //         if (obj.resourceState === 'not_exists') {
//   //           // This was a deletion event, we don't want to process this
//   //           return;
//   //         }
//   //         if (!obj.bucket) {
//   //           throw new Error('Bucket not provided. Make sure you have a "bucket" property in your request');
//   //         }
//   //         if (!obj.name) {
//   //           throw new Error('Filename not provided. Make sure you have a "name" property in your request');
//   //         }

//   //         let visionReq = {
//   //           "image": {
//   //             "source": {
//   //               "imageUri": gcsUrl
//   //             }
//   //           },
//   //           "features": "Text detection"
//   //         //     {
//   //         //       "type": "FACE_DETECTION"
//   //         //     },
//   //         //     {
//   //         //       "type": "LABEL_DETECTION"
//   //         //     },
//   //         //     {
//   //         //       "type": "LANDMARK_DETECTION"
//   //         //     },
//   //         //     {
//   //         //       "type": "WEB_DETECTION"
//   //         //     },
//   //         //     {
//   //         //       "type": "IMAGE_PROPERTIES"
//   //         //     },
//   //         //     {
//   //         //       "type": "SAFE_SEARCH_DETECTION"
//   //         //     }
//   //         //   ]
//   //         };

//   //         return vision.annotate(visionReq);
//   //       })
//   //       .then(([visionData]) => {
//   //         let imgMetadata = visionData[0];
//   //         console.log('got vision data: ',imgMetadata);
//   //         imageRef.push(imgMetadata);
//   //         userRef.child('visionData').set(imgMetadata);
//   //         latestImgDataRef.set(imgMetadata);
//   //         return detectFacesAndLabels(imgMetadata.faceAnnotations, imgMetadata.webDetection.webEntities);
//   //       })
//   //       .then(() => {
//   //         console.log(`Parsed vision annotation and wrote to Firebase`);
//   //       });
//   //   });

//   //   return Promise.resolve()
//   //     .then(() => {
//   //       return visionClient.textDectection(photoUrl);
//   //     })
//   //     .then((results) => {
//   //       console.log("Text data is: ", results);
//   //       const textDetection = results.textAnnotations;
//   //       console.log("Text:");
//   //       textDetection.forEach((text) => console.log(text));
//   //       // let similarImages = [];
//   //       // if (webDetection.visuallySimilarImages.length) {
//   //       // 	webDetection.visuallySimilarImages.forEach(image => {
//   //       // 	 	similarImages.push(image);
//   //       // 	 });
//   //       // }

//   //       //console.log('similarImages', similarImages)

//   //       db.collection("texts")
//   //         .doc(context.params.document)
//   //         .update({ textDetection })
//   //         .then((res) => console.log("text added to Firestore"))
//   //         .catch((err) => console.error(err));
//   //     })
//   //     .catch((err) => console.error(err));
//   // });

//   detectText(photoUrl).then((data) => {
//     console.log(data);
//   });

//   async function detectText(imageURL) {
//     const [result] = await visionclient.textDetection(imageURL);
//     return result.textAnnotations;
//   }
// });

// const vision = require("@google-cloud/vision");
// const visionClient = new vision.ImageAnnotatorClient();
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const vision = require("@google-cloud/vision");
const visionClient = new vision.ImageAnnotatorClient();
//let Promise = require("promise");
const cors = require("cors")({ origin: true });
//const request = require("request");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

console.log("testing!!!!");
exports.callVision = functions.storage.object().onFinalize((event) => {
  // const object = event.data;
  // const fileBucket = object.bucket;
  // const filePath = object.name;
  // const gcsPath = `gs://${fileBucket}/${filePath}`;
  console.log("testing after!!!!");
  const obj = event.data;
  console.log("BUcket" + obj.bucket);
  const gcsUrl = "gs://" + obj.bucket + "/" + obj.name;
  // Prepare the request object
  var req = {
    image: { source: { imageUri: gcsUrl } },
    features: { type: Vision.v1.types.Feature.Type.TEXT_DETECTION },
    //   { type: Vision.v1.types.Feature.Type.SAFE_SEARCH_DETECTION }],
  };
  console.log("vision api image " + gcsUrl);
  // Call the Vision API's web detection and safe search detection endpoints
  return visionClient
    .textDetection(req)
    .then((response) => {
      let textDetection = response.textAnnotations;
      //let safeSearch = response[0].safeSearchAnnotation;
      return { text: textDetection };
    })
    .then((visionResp) => {
      //var db = admin.firestore();
      let imageRef = db.collection("images").doc(filePath.slice(7));
      return imageRef.set(visionResp);
    })
    .catch((err) => {
      console.log("vision api error", err);
    });
});
