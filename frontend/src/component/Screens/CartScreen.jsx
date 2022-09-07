import React, { useEffect, useState } from 'react'
import Message from './Message'
import { Row, Col, ListGroup, Image, Form, Button, Card, Alert, NavDropdown } from 'react-bootstrap'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart ,removeFromCart} from '../../REDUX/actions/cartActions'
import { RiArrowDropDownLine } from 'react-icons/ri'

const CartScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const search = useLocation().search;
    const qty = new URLSearchParams(search).get('qty');
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart;
    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty))
        }
    }, [dispatch, qty, id])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    console.log(Number(cartItems.reduce((acc, item) => acc + item.qty, 0)), typeof (cartItems.reduce((acc, item) => acc + item.qty, 0)))

    const checkOutHandler = (e) => {
        navigate('/signIn?redirect=/shipping')
    }

    return (
      <Row>
        <Col md={8}>
          <h1>Shoping Cart</h1>
          {cartItems.length == 0 ? (
            <Alert variant="info" style={{ fontWeight: "400" }}>
              Your Cart is Empty Please add some products to Cart{" "}
              <Link to="/" style={{ color: "orangered" }}>
                Go Back
              </Link>
            </Alert>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/${item.product}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2}>&#8377; {item.price}</Col>

                    <Col md={2}>
                      <Form.Control
                        as={"select"}
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                         
                        }
                         style={{WebkitAppearance: " menulist"}}
                      >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                  Items
                </h2>
                &#8377;{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  style={{ width: "100%" }}
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    );
}

export default CartScreen