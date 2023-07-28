import { deleteShoppingCart, getShoppingCart } from "../utilities/fakedb";
import Wrapper from "../components/Wrapper";
import React, { useEffect, useState } from "react";

const shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://ecommerce-admin-server.vercel.app/product")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step: 1, get id from cart
    for (const id in storedCart) {
      // step: 2, get the product by using id
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        // get the quantity from product
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;

        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  // clear cart data in UI and local storage
  const handleClearCart = () => {
    // clear cart data in UI
    setCart([]);
    // clear cart data in localStorage
    deleteShoppingCart();
  };
  return (
    <section>
      <Wrapper>
        <h2>shop</h2>
      </Wrapper>
    </section>
  );
};

export default shop;