import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import reducers from "./reducers";

import LandingPage from "views/LandingPage/LandingPage.js";
import Login from "views/LoginPage/Login.js";
import ContentPage from "views/ContentPage/ContentPage.js";

const store = createStore(reducers, applyMiddleware(thunk));
export const hist = createBrowserHistory();

// ReactDOM.render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//       <div className={"App"}>
//         <Switch>
//           <Route path="/landing-page" component={LandingPage} />
//           <Route path="/content-page" component={ContentPage} />
//           <Route path="/login-page" component={Login} />
//           {/* <Route path="/" component={Templates} /> */}
//         </Switch>
//       </div>
//     </Provider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <Router history={hist}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
