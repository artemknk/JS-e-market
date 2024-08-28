export default class Api {
  url = 'https://dummyjson.com'

  getProducts(){
    return fetch(`${this.url}/products`)
    .then(res => res.json())
  }
  updateUser(body, id) {
    return fetch(`${this.url}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
  }
  async userAuth(){
    return await fetch(`${this.url}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'), 
      }, 
    })
  }
  createOrder(body) {
    return fetch(`${this.url}/carts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
  }
  addNewProduct(body) {
    return fetch(`${this.url}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        body
      )
    })
    .then(res => res.json())
  }
  async updateProduct(body, id) {
  return await fetch(`https://dummyjson.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      body
    )
  })
  .then(res => res.json())
}
}