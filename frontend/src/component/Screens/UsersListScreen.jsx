import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  userDeleteAction,
  userListAction,
} from "../../REDUX/actions/authActions";
import Loading from "./Loading";
import Message from "../Screens/Message";
import { Link, useNavigate } from "react-router-dom";

const UsersListScreen = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(true);
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;
  const LoginUser = useSelector((state) => state.LoginUser);
  const { userInfo } = LoginUser;
  const deleteUser = useSelector((state) => state.deleteUser);
  const { loading: deleteLoading, status, msg } = deleteUser;

  setTimeout(() => {
    setTime(false);
  }, 700);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListAction());
    } else {
      navigate("/signIn");
    }
  }, [dispatch, userInfo, status]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDeleteAction(id));
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <h1>Users</h1>
      {status && time && <Message varient="success" message={msg} />}
      {loading ? (
        <Loading />
      ) : error ? (
        <Message varient={"danger"} message={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="d-flex justify-content-around align-items-center">
                  <Link
                    to={`/user/${user._id}/edit`}
                    style={{ color: "orange" }}
                  >
                    <i className="fa-bg fa-solid fa-user-pen"></i>
                  </Link>

                  <i
                    className=" fa-solid fa-trash"
                    style={{ color: "red" }}
                    onClick={(e) => handleDelete(user._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListScreen;
