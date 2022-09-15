import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Row, Col, Button, Form, FormGroup } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import Loading from "./Loading";
import { userLOGIN } from "../../REDUX/actions/authActions";
import ReCAPTCHA from "react-google-recaptcha";
import Swal from "sweetalert2";
import { httpGet } from "../../config/axiosConfig";
import axios from "axios";
import Reaptcha from "reaptcha";

const Login = () => {
  const captchaRef = useRef(null);
  const [data, setData] = useState();
  const [captchaToken, setCaptchaToken] = useState();
  const [msg, setMsg] = useState();
  const [siteKey, setSiteKey] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaToken) {
      dispatch(userLOGIN(data));
    } else {
      setMsg("Please check Recaptcha");
    }
    // captchaToken &&
    //   (await httpGet
    //     .post("/recaptcha/post", captchaToken)
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data === true) {
    //         dispatch(userLOGIN(data));
    //       }
    //     })
    //     .catch((er) => setMsg(er.message)));
  };

  const verify = () => {
    captchaRef.current
      .getResponse()
      .then((res) => setCaptchaToken(res))
      .catch((er) => console.log("VERIFY FUNCTION--" + er.message));
    console.log("Verify Called");
  };

  const LoginUser = useSelector((state) => state.LoginUser);
  const { loading, error, userInfo } = LoginUser;
  const userDetail = useSelector((state) => state.userDetail);
  const { user } = userDetail;
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

  useEffect(() => {
    if (!user) {
      Swal.fire("Please Login!", "Session has expied!", "warning");
    }
  }, []);
  return siteKey ? (
    <FormContainer>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <h1>Sign IN</h1>
        {error && <Message varient={"danger"} message={error} />}
        {msg && <Message varient={"danger"} message={msg} />}
        {userDetail.error && (
          <Message varient={"warning"} message={userDetail.error} />
        )}
        {loading && <Loading />}
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
        <FormGroup className="mt-3">
          <Reaptcha onVerify={verify} sitekey={siteKey} ref={captchaRef} />
        </FormGroup>
        <Button
          disabled={captchaToken ? false : true}
          className="my-4"
          type="submit"
          varient="dark"
        >
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  ) : (
    <Loading />
  );
};

export default Login;
