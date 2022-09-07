import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../REDUX/actions/productActions'
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Products from './Products'
import Loading from "./Loading";
import Message from "./Message";
import {useNavigate} from 'react-router-dom'

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList;
  const userDetail = useSelector(state => state.userDetail)
  const {user} = userDetail;

  useEffect(() => {
    dispatch(listProducts(dispatch))
  }, [dispatch])

  return (
    <main>
      <h3>Latest Products</h3>
      {
        error ? <Message varient={"danger"} message={error}/> : loading ? <Loading /> : <Row>
          {products?.map((product) => (
            <Col md={3} key={product._id}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      }

    </main>
  );
};

export default HomeScreen;
