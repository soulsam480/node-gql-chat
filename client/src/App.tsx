import React from "react";
import { ApolloProvider } from "@apollo/client";
import "./App.scss";
import { Container } from "react-bootstrap";
import Register from "./views/Register";
import client from "./ApolloProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./views/Login";
import Home from "./views/Home";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container className="pt-5">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
