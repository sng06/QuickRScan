export const createSheet = (token, title) => {
  return fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      properties: {
        title: title,
      },
    }),
  });
};

const sheetId = "16Gs2WyCznzpaw-9gdOtxn5C6Y4UrEC0vbZosNcfRffU";

// need rowNum, values
export const updateSheetValue = (
  token,
  sheetRowNum,
  selectedCellforTotal,
  description,
  date,
  grossAmount,
  gst,
  total
) => {
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchUpdate`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: [
          {
            majorDimension: "ROWS",
            range: `ShareholderExpenses!A${sheetRowNum}`,
            values: [[date, description, total]],
          },
          {
            majorDimension: "ROWS",
            range: `ShareholderExpenses!F${sheetRowNum}`,
            values: [[gst]],
          },
          {
            majorDimension: "ROWS",
            range: `ShareholderExpenses!${selectedCellforTotal}`,
            values: [[grossAmount]],
          },
        ],
        includeValuesInResponse: false,
        responseDateTimeRenderOption: "SERIAL_NUMBER",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "USER_ENTERED",
      }),
    }
  );
};
