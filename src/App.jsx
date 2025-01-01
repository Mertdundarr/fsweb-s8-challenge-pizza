// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import OrderForm from "./OrderForm";
import ConfirmationPage from "./ConfirmationPage";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/order" component={OrderForm} />
        <Route path="/confirmation" component={ConfirmationPage} />
      </Switch>
    </Router>
  );
};

export default App;

