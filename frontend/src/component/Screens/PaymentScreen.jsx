import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Button, Form, FormGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../REDUX/actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as={"legend"}>Select Method</Form.Label>
        </Form.Group>
        <Col>
          <Form.Check
            type={"radio"}
            label={"Paypal or Credit Card"}
            id={"paypal"}
            name={"paymentMethod"}
            value={"Paypal"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type={"radio"}
            label={"Google Pay"}
            id={"Google Pay"}
            name={"paymentMethod"}
            value={"Google Pay"}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type={"radio"}
            label={"UPI"}
            id={"UPI"}
            name={"paymentMethod"}
            value={"UPI"}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        <Button type="submit" variant="primary" className="my-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
