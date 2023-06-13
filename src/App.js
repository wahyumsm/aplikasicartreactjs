import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Cart from "./pages/Cart";

import store from "./store/store";



const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Cart />
         
      </Router>
    </Provider>
  );
};

export default App;
