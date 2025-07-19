import { useState } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Home from "./pages/Home";

import { Dashboard } from "./pages/Dashboard";
import Layout from "./components/ui/Layout";

function App() {
  const [open, setOpened] = useState(false);

  const [openBrandItem, setopenBrandItem] = useState(false);

  const handleClicked = () => {
    setOpened(!open);
  };

  const handleClickedForBrandItem = () => {
    setopenBrandItem(!openBrandItem);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>

            <Route index element={<Home />} />

            <Route path="login" element={<Login />} />

            <Route path="register" element={<Register />} />

            <Route path="cart" element={<Cart />} />

            <Route path="product" element={<Product />} />

            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
