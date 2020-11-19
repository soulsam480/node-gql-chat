import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
//imports

interface Props {}
interface RegForm {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      createdAt
      token
    }
  }
`;

const Login: React.FC<Props> = () => {
  const route = useHistory();
  const [form, setForm] = useState<RegForm>({
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<any>({
    errors: {},
  });
  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (res) => {
      localStorage.setItem("token", res.login.token);
      route.push("/");
    },
    onError(err) {
      console.log(err);

      setErrors(err.graphQLErrors[0].extensions!);
    },
  });

  const submitLoginForm = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ variables: form });
  };
  return (
    <Container>
      <div>
        <Row className="d-flex justify-content-center">
          <Col md={7} xs={12} lg={5} className="reg-card">
            <h1 className="text-center">Login</h1>

            <Form onSubmit={submitLoginForm}>
              <Form.Group
                controlId="formBasicText"
                className={errors.errors.username && "error"}
              >
                <Form.Label>
                  {errors.errors.username ? errors.errors.username : "Username"}
                </Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicPassword"
                className={errors.errors.password && "error"}
              >
                <Form.Label>
                  {errors.errors.password ? errors.errors.password : "Password"}
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="warning" type="submit">
                  Login
                </Button>{" "}
                <br />
                <small>
                  Dont have an account ? <Link to="/register">register</Link>
                </small>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
