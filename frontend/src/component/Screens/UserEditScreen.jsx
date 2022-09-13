import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Message from "./Message";
import Loading from "./Loading";
import {
  getUserByAdminAction,
  updateUserByAdminAction,
} from "../../REDUX/actions/authActions";
import { useParams } from "react-router-dom";
import { RESET_UPDATE_USER_BY_ADMIN } from "../../REDUX/constants/authConstants";

const UserEditForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [check, setCheck] = useState();
  const dispatch = useDispatch();
  const userId = useParams().id;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setCheck({ ...check, [e.target.name]: e.target.checked });
  };

  const AUserByAdmin = useSelector((state) => state.AUserByAdmin);
  const { loading, error, userByAdmin } = AUserByAdmin;

  const AUpdatedUser = useSelector((state) => state.AUpdatedUser);
  const { loading: Aloading, status, error: Aerror } = AUpdatedUser;

  useEffect(() => {
    if (status) {
      dispatch({ type: RESET_UPDATE_USER_BY_ADMIN });
      navigate("/admin/usersList");
    } else {
      if (userByAdmin?._id !== userId) {
        dispatch(getUserByAdminAction(userId));
      } else {
        setData({
          name: userByAdmin.name,
          email: userByAdmin.email,
        });
        setCheck({
          isAdmin: userByAdmin.isAdmin,
          isVerified: userByAdmin.isVerified,
        });
      }
    }
  }, [dispatch, userId, userByAdmin, status, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserByAdminAction(userId, {
        name: data.name,
        email: data.email,
        isAdmin: check.isAdmin,
        isVerified: check.isVerified,
      })
    );
  };
  return (
    <>
      <Link to={"/admin/usersList"}>
        <Button className="btn btn-light my-3">Go Back</Button>
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {Aerror && <Message varient={"danger"} message={Aerror} />}
        {Aloading && <Loading />}
        {status && <Message varient={"success"} message="User Updated" />}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message varient={"danger"} message={error} />
        ) : (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <FormGroup controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                name="name"
                value={data?.name}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={data?.email}
              ></Form.Control>
            </FormGroup>
            <FormGroup controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                name="isAdmin"
                checked={check?.isAdmin}
              ></Form.Check>
            </FormGroup>
            <FormGroup controlId="isVerified">
              <Form.Check
                type="checkbox"
                label="Is Verified"
                name="isVerified"
                checked={check?.isVerified}
              ></Form.Check>
            </FormGroup>
            <Button className="my-4" type="submit" varient="dark">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditForm;
