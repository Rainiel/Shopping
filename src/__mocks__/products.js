import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';

// export const productsContext = React.createContext({}); //Initialise

export default class Controller {
  static instance = null;

  products = [];
  cart = [];
  purchaseHistory = [];

  static getInstance() {
    if (Controller.instance == null) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }

  getPurchaseHistory() {
    return this.purchaseHistory;
  }

  purchaseProduct(products) {
    this.purchaseHistory.push(products);
  }

  getCart() {
    return this.cart;
  }

  addToCart(product) {
    if (!this.cart.includes(product)) {
      this.cart.push(product);
      return true;
    }
  }

  removeFromCart(product) {
    this.cart = this.cart.filter(item => item !== product);
  }

  emptyCart() {
    this.cart = [];
  }

  getProducts() {
    return this.products;
  }

  addProducts(setproducts) {
    this.products = setproducts.map((val, index) => {
      if (!this.products.includes(val)) {
        return val;
      }
    });
  }

}
