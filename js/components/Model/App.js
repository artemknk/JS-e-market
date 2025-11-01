/**
 * Main application state management class
 */
export default class App {
  catalog = [];
  cartProducts = [];
  categorys = [];
  user = {};
  order = {
    userId: '',
    products: []
  };
  newProduct = {};
  editProfileValues = {};

  /**
   * Sets order data
   * @param {string} userId - User ID
   * @param {Array} products - Array of products
   */
  setOrder(userId, products) {
    this.order = {
      userId,
      products: products.map((product) => ({
        id: product.id,
        quantity: product.count
      }))
    };
  }

  /**
   * Sets product catalog
   * @param {Array} catalog - Array of products
   */
  setCatalog(catalog) {
    this.catalog = catalog;
  }

  /**
   * Sets cart products
   * @param {Array} cartProducts - Array of cart products
   */
  setCartProducts(cartProducts) {
    this.cartProducts = cartProducts;
  }

  /**
   * Sets product categories
   * @param {Array} categorys - Array of category names
   */
  setCategorys(categorys) {
    this.categorys = categorys;
  }

  /**
   * Sets user data
   * @param {Object} data - User data object
   */
  setUser(data = {}) {
    this.user.firstName = data.firstName || '';
    this.user.lastName = data.lastName || '';
    this.user.email = data.email || '';
    this.user.phone = data.phone || '';
    this.user.id = data.id || '';
  }

  /**
   * Sets product data for updating
   * @param {Object} data - Product data object
   */
  setUpdateProduct(data = {}) {
    this.updateProduct = {
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      images: data.images
    };
  }

  /**
   * Sets edit profile form values
   * @param {HTMLFormElement} editProfileForm - Edit profile form element
   */
  setEditProfileValues(editProfileForm) {
    this.editProfileValues = {
      firstName: editProfileForm.elements['name'].value,
      lastName: editProfileForm.elements['surname'].value,
      email: editProfileForm.elements['email'].value,
      phone: editProfileForm.elements['phone'].value
    };
  }
}
