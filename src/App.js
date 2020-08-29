import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "views/LoginPage/Login.js";
import UploadImageView from "views/ImageUploadView/ImageUploadView.js";
import ResultView from "views/ResultView/ResultView.js";

toast.configure();

const App = () => {
  //this is how you make a functional component
  return (
    <div className={"App"}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/uploadImage" component={UploadImageView} />
        <Route path="/result" component={ResultView} />
        {/* <Route path="/login" component={Login} /> */}
      </Switch>
    </div>
  );
};

export default App;

// import React from "react";
// import { loadUserData } from "actions/index";
// import { connect } from "react-redux";
// import compose from "recompose/compose";
// import Login from "views/LoginPage/Login.js";
// import ContentPage from "views/ContentPage/ContentPage.js";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.props.loadUserData();
//   }

//   render() {
//     return (
//       <div>
//         {this.props.userInfo.isLoggedIn ? (
//           <ContentPage
//             isUserAuthenticated={this.props.userInfo.isLoggedIn}
//             userInfo={this.props.userInfo}
//           />
//         ) : (
//           <Login />
//         )}
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadUserData: () => dispatch(loadUserData()),
//   };
// };

// const mapStateToProps = (state) => {
//   return {
//     userInfo: state.userStore,
//   };
// };

// export default compose(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )
// )(App);
