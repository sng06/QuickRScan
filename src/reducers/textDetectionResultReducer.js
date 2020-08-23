const initialState = {
  imageURL: "",
  textResult: "",
  loading: false,
};

export default function textDetectionResultReducer(
  state = initialState,
  action
) {
  if (action.type === "LOAD_TEXT_DETECTION_RES") {
    console.log(
      "checking text data: ",
      action.payload.imageURL,
      action.payload.textResult.description
    );
    return {
      ...state,
      imageURL: action.payload.imageURL,
      textResult: action.payload.textResult.description,
      loading: false,
    };
  }
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }
  return state;
}
