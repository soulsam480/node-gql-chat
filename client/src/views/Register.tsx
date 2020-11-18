import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import "../App.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
//imports

interface Props {}
interface RegForm {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const REGISTER_USER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      email: $email
      username: $username
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

const Register: React.FC<Props> = () => {
  const [form, setForm] = useState<RegForm>({
    confirmPassword: "",
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState<any>({
    errors: {},
  });
  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, res) {
      console.log(res);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions!);
    },
  });

  const submitRegisterForm = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ variables: form });
  };
  return (
    <Container>
      <div>
        <br />
        <Row className="d-flex justify-content-center">
          <Col md={7} xs={12} lg={5} className="reg-card">
            <h1 className="text-center">Register</h1>

            <Form onSubmit={submitRegisterForm}>
              <Form.Group
                controlId="formBasicText"
                className={errors.errors.username && "error"}
              >
                <Form.Label>
                  {errors.errors.username ? errors.errors.username : "Username"}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group
                controlId="formBasicEmail"
                className={errors.errors.email && "error"}
              >
                <Form.Label>
                  {errors.errors.email ? errors.errors.email : "Email address"}
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="warning" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Register;
