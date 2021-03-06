import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import ProductDetail from "./components/ProductDetail";

import "./App.css";

class App extends Component {
  state = {
    cartItems: [],
    products: [],
  };

  constructor(props) {
    super(props);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
  }

  addItemToCart(item) {
    const items = this.state.cartItems.slice();
    items.push(item);
    this.setState({
      cartItems: items,
    });
  }

  submitOrder() {
    const order = {
      date: Date(),
      items: this.state.cartItems,
    };
    return fetch("/orders", {
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
  }

  componentDidMount() {
    fetch("/products")
      .then((response) => {
        return response.json();
      })
      .then((products) => {
        this.setState({
          products,
        });
      });
  }

  render() {
    const productDetails = this.state.products.map((p) => {
      return (
        <ProductDetail
          key={p.id}
          product={p}
          onAddItemToCart={this.addItemToCart}
        />
      );
    });

    return (
      <div className="App">
        <Header
          numberOfItemsInCart={this.state.cartItems.length}
          onSubmitOrder={this.submitOrder}
        />

        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <p className="lead">Shop Name</p>
              <div className="list-group">
                <a href="#" className="list-group-item">
                  Category 1
                </a>
                <a href="#" className="list-group-item">
                  Category 2
                </a>
                <a href="#" className="list-group-item">
                  Category 3
                </a>
              </div>
            </div>

            <div className="col-md-9">
              <Carousel />
              <div className="row">
                {productDetails}
                {/*
                    <div className="col-sm-4 col-lg-4 col-md-4">
                        <h4><a href="#">Like this template?</a>
                        </h4>
                        <p>If you like this template, then check out <a target="_blank" href="http://maxoffsky.com/code-blog/laravel-shop-tutorial-1-building-a-review-system/">this tutorial</a> on how to build a working review system for your online store!</p>
                        <a className="btn btn-primary" target="_blank" href="http://maxoffsky.com/code-blog/laravel-shop-tutorial-1-building-a-review-system/">View Tutorial</a>
                    </div>
*/}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <hr />

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
