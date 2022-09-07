import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import { Link, NavLink } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {userLogout} from '../../REDUX/actions/authActions'

const Header = () => {
  const dispatch=useDispatch();
  const LoginUser=useSelector((state)=>state.LoginUser)
  const {userInfo}=LoginUser
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <NavLink
            style={{
              color: "whitesmoke",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
            to={"/"}
          >
            {" "}
            PROSHOP
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer
                to={"/cart"}
              >
                <Nav.Link>
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={"/profile"}>
                    <NavDropdown.Item ><i className="fa-solid fa-user"></i> Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={(e) => dispatch(userLogout())}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer
                  to="/signIn"
                >
                 <Nav.Link>
                      <i className="fa-solid fa-user"></i> Sign In/Up
                 </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
