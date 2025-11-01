/**
 * API client for communicating with DummyJSON API
 */
export default class Api {
  url = 'https://dummyjson.com';

  /**
   * Fetches all products
   * @returns {Promise<Object>} Products data
   */
  getProducts() {
    return fetch(`${this.url}/products`)
      .then(res => res.json());
  }

  /**
   * Updates user information
   * @param {Object} body - User data to update
   * @param {string} id - User ID
   * @returns {Promise<Object>} Updated user data
   */
  updateUser(body, id) {
    return fetch(`${this.url}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json());
  }

  /**
   * Authenticates user using stored token
   * @returns {Promise<Response>} Authentication response
   */
  async userAuth() {
    return await fetch(`${this.url}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  /**
   * Creates a new order
   * @param {Object} body - Order data
   * @returns {Promise<Object>} Created order data
   */
  createOrder(body) {
    return fetch(`${this.url}/carts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json());
  }

  /**
   * Adds a new product
   * @param {Object} body - Product data
   * @returns {Promise<Object>} Created product data
   */
  addNewProduct(body) {
    return fetch(`${this.url}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json());
  }

  /**
   * Updates an existing product
   * @param {Object} body - Product data to update
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Updated product data
   */
  async updateProduct(body, id) {
    return await fetch(`${this.url}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json());
  }
}