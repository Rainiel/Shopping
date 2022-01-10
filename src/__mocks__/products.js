
export default class Controller {
  static instance = null;

  products = [];
  cart = [];
  category = [];
  purchaseHistory = [];
  selectedBrandFilter = [];
  selectedCategoryFilter = [];
  selectedBoxCategory = null;

  static getInstance() {
    if (Controller.instance == null) {
      Controller.instance = new Controller();
    }
    return Controller.instance;
  }

  getCategory() {
    return this.category;
  }

  setCategory(category) {
    this.category = category;
  }

  getSelectedBoxCategory() {
    return this.selectedBoxCategory;
  }

  setSelectedBoxCategory(category) {
    this.selectedBoxCategory = category;
  }

  getSelectedBrandFilter() {
    return this.selectedBrandFilter;
  }

  setSelectedBrandFilter(brands) {
    this.selectedBrandFilter = brands;
  }

  getSelectedCategoryFilter() {
    return this.selectedCategoryFilter;
  }

  setSelectedCategoryFilter(category) {
    this.selectedCategoryFilter = category;
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
