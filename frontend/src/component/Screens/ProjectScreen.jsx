import React, { useState, useEffect } from "react";
// import products from "../../products.js";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "./Rating.jsx";
import { listProductDetails } from "../../REDUX/actions/productActions.js";
import Loading from "./Loading.jsx";
import { useNavigate } from "react-router-dom";

const ProjectScreen = ({ }) => {
  const Navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const ID = useParams().id;
  const dispatch = useDispatch()
  const { error, loading, product } = useSelector(state => state.productDetails)

  useEffect(() => {
    dispatch(listProductDetails(ID))
  }, [dispatch, ID]);

  const addToCartHandler = (e) => {
    Navigate({
      pathname: `/cart/${ID}`,
      search: `qty=${qty}`
    })
  }
  //   let product = products?.find((p) => p._id === ID);

  return (
    <main>
      {error ? (
        <h3>{error}</h3>
      ) : loading ? (
        <Loading />
      ) : (
        <>
          <Link className="btn btn-light my-3" to={"/"}>
            <Button>Go Back</Button>
          </Link>
          <Row className="my-2">
            <Col md={6}>
              <Image src={product?.image} fluid rounded/>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem as={"h3"}>{product?.name}</ListGroupItem>
                <ListGroupItem as={"h3"}>&#8377;{product?.price}</ListGroupItem>
                <ListGroupItem>
                  <Rating value={product?.rating} text={product?.numReviews} />
                </ListGroupItem>
                <ListGroupItem>{product?.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant="">
                <ListGroupItem>Price:&#8377;{product?.price}</ListGroupItem>
                <ListGroupItem>
                  Status:
                  {product?.countInStock <= 0 ? " Out Of Stock" : " In Stock"}
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                          style={{ WebkitAppearance: " menulist" }}
                        >
                          {[...Array(product.countInStock).keys()].map((n) => (
                            <option key={n + 1} value={n + 1}>
                              {n + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    style={{ width: "100%" }}
                    type="button"
                    disabled={product?.countInStock <= 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </main>
  );
};

export default ProjectScreen;
