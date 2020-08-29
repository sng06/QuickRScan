// const { google } = require("googleapis");
// const keys = require("./googleClientKey.json");

// const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
//   "https://www.googleapis.com/auth/spreadsheets",
// ]);

// client.authorize(function(err, tokens) {
//   if (err) {
//     console.log("Error: ", err);
//     return;
//   } else {
//     console.log("Connected to google sheet!");
//     // gsrunGet(client);
//     gsrunUpdate(client);
//   }
// });

// async function gsrunGet(client) {
//   const gsapi = google.sheets({ version: "v4", auth: client });

//   const request = {
//     spreadsheetId: "16Gs2WyCznzpaw-9gdOtxn5C6Y4UrEC0vbZosNcfRffU",
//     range: "ShareholderExpenses!A8:C14",
//   };

//   let res = await gsapi.spreadsheets.values.get(request);
//   console.log(res.data.values);
// }

// async function gsrunUpdate(client) {
//   const gsapi = google.sheets({ version: "v4", auth: client });

//   const request = {
//     spreadsheetId: "16Gs2WyCznzpaw-9gdOtxn5C6Y4UrEC0vbZosNcfRffU",
//     range: "ShareholderExpenses!A69",
//     valueInputOption: "USER_ENTERED",
//     // resource: { values: [20, 30] },
//     resource: { values: [["1", "2", "3"]] },
//   };

//   let res = await gsapi.spreadsheets.values.update(request);
//   console.log(res);
// }

// use This
// const { google } = require("googleapis");
// const keys = require("./googleClientKey.json");
import google from "googleapis";
import keys from "./googleClientKey.json";

const connect = () => {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  client.authorize(function(err, tokens) {
    if (err) {
      console.log("Error: ", err);
      return;
    } else {
      console.log("Connected to google sheet!");
      return client;
    }
  });
};

const gsrunUpdate = async (client) => {
  const gsapi = google.sheets({ version: "v4", auth: client });

  const request = {
    spreadsheetId: "16Gs2WyCznzpaw-9gdOtxn5C6Y4UrEC0vbZosNcfRffU",
    range: "ShareholderExpenses!A69",
    valueInputOption: "USER_ENTERED",
    // resource: { values: [20, 30] },
    resource: { values: [["1", "2", "3"]] },
  };

  let res = await gsapi.spreadsheets.values.update(request);
  console.log(res);
};

// async function updateSheets() {
//   let client = await connect();
//   return await gsrunUpdate(client);
// };

export const updateSheets = async () => {
  let client = await connect();
  return await gsrunUpdate(client);
};
