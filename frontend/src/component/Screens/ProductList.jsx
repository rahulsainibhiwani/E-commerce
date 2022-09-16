import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Button, Table, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Loading from "./Loading";
import Message from "../Screens/Message";
import { Link, useNavigate } from "react-router-dom";
import { listProducts } from "../../REDUX/actions/productActions";

const ProductsListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const LoginUser = useSelector((state) => state.LoginUser);
  const { userInfo } = LoginUser;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      navigate("/signIn");
    }
  }, [dispatch, userInfo, navigate]);

  const handleDelete = (id) => {
    console.log("Deleted");
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end my-3">
          <Button>
            <i class="fa-lg fa-solid fa-circle-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message varient={"danger"} message={error} />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>IMAGE</th>
              <th>PRODUCT NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <Image
                    thumbnail
                    style={{ width: "80px" }}
                    src={product.image}
                    alt={product.name}
                    rounded
                    fluid
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>&#8377; {product.price}</td>
                <td>{product.brand}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.3rem",
                  }}
                >
                  <div>
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      style={{ color: "orange", fontSize: "1.1rem" }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </div>
                  <div>
                    <i
                      className=" fa-solid fa-trash"
                      style={{ color: "red" }}
                      onClick={(e) => handleDelete(product._id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductsListScreen;
