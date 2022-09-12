import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Form, FormGroup, Table } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import {
  userDetailAction,
  userUpdateProfileAction,
  userLogout,
} from "../../REDUX/actions/authActions";
import Loading from "../Screens/Loading";
import { getMyOrder } from "../../REDUX/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const RegisterForm = () => {
  const [profileData, setProfileData] = useState();
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfileData({ ...data, [e.target.name]: e.target.value });
  };

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;
  const LoginUser = useSelector((state) => state.LoginUser);
  const { userInfo } = LoginUser;
  const updatedUser = useSelector((state) => state.updatedUser);
  const { status } = updatedUser;
  const getMyOrders = useSelector((state) => state.getMyOrders);
  const {
    loading: myOrderLoading,
    error: myOrderError,
    myOrders,
  } = getMyOrders;
  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn");
    } else {
      if (!user || !user.name) {
        dispatch(getMyOrder());
        dispatch(userDetailAction("profile"));
      } else {
        setProfileData({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [navigate, userInfo, dispatch, user]);
  useEffect(() => {
    if (error === "Session has expired Please Login First") {
      dispatch(userLogout());
    }
  }, [user, userInfo]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileData?.password !== profileData?.confirmPassword)
      setMessage("Password do not Match");
    else
      dispatch(userUpdateProfileAction({ ...profileData, id: userDetail.id }));
  };
  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <h2>User Profile</h2>
          {message && <Message varient={"danger"} message={message} />}
          {status && (
            <Message varient={"success"} message={"User Data Updated"} />
          )}
          {error && <Message varient={"danger"} message={error} />}
          {loading && <Loading />}
          <FormGroup controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={profileData?.name}
              type="name"
              placeholder="Enter Name"
              name="name"
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={profileData?.email}
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
          <Button className="my-4" type="submit" varient="dark">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {myOrderError ? (
          <Message varient={"danger"} message={myOrderError} />
        ) : myOrderLoading ? (
          <Loading />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>&#x20B9;{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <i className="fa-lg fa-solid fa-circle-info"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default RegisterForm;
