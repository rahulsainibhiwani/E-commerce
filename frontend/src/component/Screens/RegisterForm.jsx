import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Row, Col, Button, Form, FormGroup } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import Loading from "./Loading";
import { userRegist } from "../../REDUX/actions/authActions";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterForm = () => {
  const [data, setData] = useState();
  const [siteKey, setSiteKey] = useState();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  useEffect(() => {
    async function getSiteKey() {
      const { data: googleSiteKey } = await axios.get(
        "http://localhost:5911/api/config/GoogleSiteKey"
      );
      setSiteKey(googleSiteKey);
    }
    getSiteKey();
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword)
      setMessage("Password do not Match");
    else dispatch(userRegist(data));
  };
  return siteKey ? (
    <FormContainer>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <h1>Sign Up</h1>
        {message && <Message varient={"danger"} message={message} />}
        {error && <Message varient={"danger"} message={error} />}
        {loading && <Loading />}
        <FormGroup controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Name"
            name="name"
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <ReCAPTCHA sitekey={siteKey} />
        </FormGroup>
        <Button className="my-4" type="submit" varient="dark">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/signIn?redirect=${redirect}` : "/signIn"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  ) : (
    <Loading />
  );
};

export default RegisterForm;
