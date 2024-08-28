export default class App {
  catalog = [];
  cartProducts = [];
  categorys = [];
  user = {};
  order = {
    userId: '',
    products: []
  }
  newProduct = {}
  editProfileValues = {}

  setOrder(userId, products) {
    this.order = { userId, products: products.map((product) => ({ id: product.id, quantity: product.count })) };
  }

  setCatalog(catalog) {
    this.catalog = catalog;
  }

  setCartProducts(cartProducts) {
    this.cartProducts = cartProducts;
  }

  setCategorys(categorys) {
    this.categorys = categorys;
  }

  setUser(data = {}) {
    this.user.firstName = data.firstName || '';
    this.user.lastName = data.lastName || '';
    this.user.email = data.email || '';
    this.user.phone = data.phone || '';
    this.user.id = data.id || '';
  }
  setUpdateProduct(data = {}) {
    this.updateProduct = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      images: data.images
    }
  }
  setEditProfileValues(editProfileForm) {
    this.editProfileValues = {
      firstName: editProfileForm.elements['name'].value,
      lastName: editProfileForm.elements['surname'].value,
      email: editProfileForm.elements['email'].value,
      phone: editProfileForm.elements['phone'].value
    }
  }
}

