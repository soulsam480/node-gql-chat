import React from "react";
import { ApolloProvider } from "@apollo/client";
import "./App.scss";
import { Container } from "react-bootstrap";
import Register from "./views/Register";
import client from "./ApolloProvider";

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className="pt-5">
        <Register></Register>
      </Container>
    </ApolloProvider>
  );
}

export default App;
