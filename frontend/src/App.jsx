import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/Header/Header";
import HomeScreen from "../src/component/Screens/HomeScreen";
import Footer from "./component/Footer/Footer";
import { Container } from "react-bootstrap";
import ProjectScreen from "./component/Screens/ProjectScreen";
import CartScreen from "./component/Screens/CartScreen";
import Login from "./component/Screens/Login";
import RegisterForm from "./component/Screens/RegisterForm";
import Profile from "./component/Screens/Profile";
import Shipping from "./component/Screens/Shipping";
import PaymentScreen from "./component/Screens/PaymentScreen";
import PlaceOrder from "./component/Screens/PlaceOrder";
import { GetOrderDetails } from "./component/Screens/OrderScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" />
            <Route index element={<HomeScreen />} />
            <Route path="/:id" element={<ProjectScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/signIn" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/order/:id" element={<GetOrderDetails />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
