import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import { cartSaveShippingAddress } from "../../REDUX/actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState({
    address: shippingAddress.address,
    country: shippingAddress.country,
    city: shippingAddress.city,
    pincode: shippingAddress.pincode,
    mobile: shippingAddress.mobile,
    state: shippingAddress.state,
  });
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cartSaveShippingAddress(address));
    navigate("/payment");
  };
  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <FormGroup controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Country"
              name="country"
              required
              value={address.country}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter State"
              name="state"
              required
              value={address.state}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              name="address"
              required
              value={address.address}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
              name="city"
              required
              value={address.city}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="pincode">
            <Form.Label>Pincode</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Pincode"
              name="pincode"
              minLength={6}
              maxLength={6}
              required
              value={address.pincode}
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="mobile">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Mobile Number"
              name="mobile"
              minLength={10}
              maxLength={10}
              required
              value={address.mobile}
            ></Form.Control>
          </FormGroup>
          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default Shipping;
