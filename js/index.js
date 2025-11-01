import App from './components/Model/App.js';
import Product from './components/Product.js';
import ProductCart from './components/ProductCart.js';
import Api from './components/Model/Api.js';
import Cart from './components/Cart.js';
import Categorys from './components/Categorys.js';
import Profile from './components/Profile.js';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Forms from './components/Forms.js';

// DOM Elements
const productsSection = document.querySelector('.products');
const cartButton = document.querySelector('.cart__button');
const cart = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart__container');
const fullPrice = document.querySelector('.full__price');
const payButton = document.querySelector('.cart__pay');
const loginLink = document.querySelector('.header__login');
const userProfile = document.querySelector('.userProfile');
const userModal = document.querySelector('.user__modal');
const userPic = userProfile.querySelector('.user__pic');
const userLogoutButton = userModal.querySelector('.user__modal-logout');
const closeButtons = document.querySelectorAll('.user__modal-close');
const userEditButton = userModal.querySelector('.user__modal-edit');
const editProfileOverlay = document.querySelector('.overlay');
const overlayForm = editProfileOverlay.querySelector('.form__edit-profile');
const addProductButton = document.querySelector('.add__product');
const addProductOverlay = document.querySelector('.add__product-modal');
const updateProductOverlay = document.querySelector('.update__product-modal');
const addProductForm = addProductOverlay.querySelector('.form__add-product');
const updateProductForm = updateProductOverlay.querySelector('.form__update-product');
const productUpdateButton = updateProductOverlay.querySelector('.product__update-button');
const productSaveButton = addProductForm.querySelector('.product__save-button');
const searchProductButton = document.querySelector('.search__product-button');
const searchProductOverlay = document.querySelector('.search__container');
const searchProductInput = document.querySelector('.search__product-input');
const searchProductClearButton = document.querySelector('.search__product-clear');
const searchProductByCategoryButton = document.querySelector('.products__category');
const categorysContainer = document.querySelector('.categorys__container');
const categorysClearButton = document.querySelector('.categorys__clear-button');
const burgerMenuButton = document.querySelector('.burger__menu');


// Initialize components
const api = new Api();
const app = new App();
const profile = new Profile(userModal);
const viewCart = new Cart(cart);
const viewCategorys = new Categorys(categorysContainer);
const viewHeader = new Header(document.body);
const viewSearch = new Search(searchProductOverlay);
const formAddProduct = new Forms(addProductForm);
const formUpdateProduct = new Forms(updateProductForm);

// Load products on page load
api.getProducts()
  .then(data => {
    app.catalog = data.products;
    app.setCatalog(data.products);
    app.setCategorys([...new Set(app.catalog.map(product => product.category))]);
    app.categorys.forEach(viewCategorys.renderCategory.bind(viewCategorys));
    data.products.forEach((product) => renderProducts(product, 'appendFile'));
  })
  .catch(error => {
    console.error('Error loading products:', error);
  });

/**
 * Authenticates user using stored token
 */
async function userAuth() {
  try {
    const res = await api.userAuth();
    if (res.ok) {
      const data = await res.json();
      userProfile.classList.add('userProfile__open');
      loginLink.classList.add('hidden__link');
      app.setUser(data);
      userPic.src = data.image;
      profile.setProfile(data);
    } else {
      loginLink.classList.remove('hidden__link');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    loginLink.classList.remove('hidden__link');
  }
}

/**
 * Adds a new product to the API
 * @param {Object} body - Product data
 * @returns {Promise<Object>} New product data
 */
async function addNewProduct(body) {
  return await api.addNewProduct(body);
}

/**
 * Opens user profile modal
 */
userProfile.addEventListener('click', () => {
  profile.open();
  if (window.matchMedia("(max-width: 500px)").matches) {
    viewHeader.closeHeader();
  }
});

/**
 * Opens edit profile form with current user data
 */
function editUserProfileOpen() {
  overlayForm.querySelector('#name').value = app.user.firstName;
  overlayForm.querySelector('#surname').value = app.user.lastName;
  overlayForm.querySelector('#email').value = app.user.email;
  overlayForm.querySelector('#phone').value = app.user.phone;
  editProfileOverlay.classList.remove('hidden');
}

/**
 * Saves edited user profile
 * @param {Event} event - Form submit event
 */
async function saveEditProfile(event) {
  event.preventDefault();
  app.setEditProfileValues(overlayForm);
  const data = await api.updateUser(app.editProfileValues, app.user.id);
  profile.setProfile(data);
  app.setUser(data);
  editProfileOverlay.classList.add('hidden');
}

/**
 * Saves a new product
 * @param {Event} event - Form submit event
 */
async function saveNewProduct(event) {
  event.preventDefault();
  try {
    const newProductData = await addNewProduct(formAddProduct.getFormValues());
    app.setCatalog([...app.catalog, newProductData]);
    app.setCategorys([...new Set(app.catalog.map(product => product.category))]);
    renderProducts(newProductData, 'prependFile');
    viewCategorys.renderCategory(newProductData.category);
    formAddProduct.resetForm();
    addProductOverlay.classList.add('hidden');
  } catch (error) {
    console.error('Error adding product:', error);
  }
}

/**
 * Fills update product form with product data
 * @param {Object} obj - Product object
 */
function updateProductFormData(obj) {
  formUpdateProduct.setFormValues(obj);
  app.setUpdateProduct(obj);
}

/**
 * Updates an existing product
 * @param {Event} event - Form submit event
 */
async function updateProduct(event) {
  event.preventDefault();
  try {
    const id = app.updateProduct.id;
    const index = app.catalog.findIndex((product) => product.id === id);
    const updatedProduct = await api.updateProduct(formUpdateProduct.getFormValues(), id);
    app.catalog[index] = updatedProduct;
    app.categorys = [...new Set(app.catalog.map((product) => product.category))];
    app.setCategorys(app.categorys);
    app.setUpdateProduct(updatedProduct);
    viewCategorys.deleteCategories();
    app.categorys.forEach(viewCategorys.renderCategory.bind(viewCategorys));
    productsSection.innerHTML = '';
    app.catalog.forEach((productData) => {
      renderProducts(productData, 'appendFile');
    });
    updateProductOverlay.classList.add('hidden');
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

/**
 * Logs out user and reloads page
 */
function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

/**
 * Closes modal window
 * @param {HTMLElement} btn - Close button element
 */
function closeModal(btn) {
  const modal = btn.closest('.close');
  modal.classList.add('hidden');
}

/**
 * Renders a product card
 * @param {Object} obj - Product object
 * @param {string} method - Method to add product ('appendFile' or 'prependFile')
 * @returns {Product} Product instance
 */
function renderProducts(obj, method) {
  const product = new Product();
  product.renderProduct(obj);
  product[method](productsSection);

  product.btn.addEventListener('click', () => {
    const existingProduct = app.cartProducts.find(el => el.id === obj.id);
    const objectCartElement = {...obj, count: 1};
    
    if (existingProduct) {
      existingProduct.count++;
      existingProduct.countItem.textContent = existingProduct.count;
    } else {
      addToCart(objectCartElement);
      app.setCartProducts([...app.cartProducts, objectCartElement]);
    }
    getTotal();
  });

  product.btnEdit.addEventListener('click', () => {
    updateProductOverlay.classList.remove('hidden');
    updateProductFormData(obj);
  });
  
  return product;
}

/**
 * Adds product to cart
 * @param {Object} obj - Product object with count
 */
function addToCart(obj) {
  const cartItem = new ProductCart();
  cartItem.render(obj);
  cartItem.appendFile(cartContainer);
  obj.countItem = cartItem.countElem;

  function updateCartItem() {
    cartItem.countElem.textContent = obj.count;
    getTotal();
  }
  
  cartItem.cartItemButtonPlus.addEventListener('click', () => {
    obj.count++;
    updateCartItem();
  });
  
  cartItem.cartItemButtonMinus.addEventListener('click', () => {
    if (obj.count === 0) return;
    obj.count--;
    updateCartItem();
  });

  cartItem.cartItemRemove.addEventListener('click', () => {
    app.cartProducts.splice(app.cartProducts.indexOf(obj), 1);
    cartItem.element.remove();
    app.setCartProducts(app.cartProducts.filter(el => el.id !== obj.id));
    getTotal();
  });
}

/**
 * Calculates and displays total cart price
 */
function getTotal() {
  fullPrice.textContent = app.cartProducts.reduce((acc, el) => {
    return acc + el.price * el.count;
  }, 0).toFixed(2);
}

/**
 * Processes cart payment
 */
async function cartPay() {
  if (!app.user.id) return authLink();
  
  try {
    app.setOrder(app.user.id, app.cartProducts);
    const data = await api.createOrder(app.order);
    app.setCartProducts([]);
    viewCart.cartPayButton();
    orderSuccess(data);
  } catch (error) {
    console.error('Error processing payment:', error);
  }
}

/**
 * Redirects to login page
 */
function authLink() {
  window.location.href = './logPage.html';
}

/**
 * Displays order success message
 * @param {Object} data - Order data
 */
function orderSuccess(data) {
  const orderOverlay = document.querySelector('.order__overlay');
  const orderOverlayPrice = orderOverlay.querySelector('.order__price');
  const orderId = orderOverlay.querySelector('.order__id');
  
  orderId.textContent = `Order number ${data.id}`;
  orderOverlayPrice.textContent = `Total price: ${Math.floor(data.total)}`;
  orderOverlay.classList.remove('hidden');
  
  setTimeout(() => {
    orderOverlay.classList.add('hidden');
  }, 3000);
}
/**
 * Opens search input
 */
function searchProductOpenInput() {
  if (!window.matchMedia('(max-width: 500px)').matches) {
    viewHeader.toggleHeader();
    viewSearch.toggleSearchInput();
  }
}

/**
 * Clears search input and resets product display
 */
function clearSearchInput() {
  searchProductInput.value = '';
  searchProduct();
  viewSearch.closeSearchInput();
  viewHeader.closeHeader();
}

/**
 * Filters and displays products by search query
 */
function searchProduct() {
  const allProducts = productsSection.querySelectorAll('.product');
  allProducts.forEach(product => product.remove());
  
  const searchValue = searchProductInput.value.toLowerCase();
  const searchProducts = app.catalog.filter(product => 
    product.title.toLowerCase().includes(searchValue)
  );
  
  searchProducts.forEach(productData => {
    renderProducts(productData, 'appendFile');
  });
}

/**
 * Opens category filter menu
 */
function searchProductByCategorys() {
  viewCategorys.toggle();
  const allCategoryNames = categorysContainer.querySelectorAll('.category__name');
  
  allCategoryNames.forEach(category => {
    category.addEventListener('click', () => {
      const allProducts = productsSection.querySelectorAll('.product');
      allProducts.forEach(product => product.remove());
      
      const searchProducts = app.catalog.filter(
        product => product.category === category.textContent
      );
      
      searchProducts.forEach(productData => {
        renderProducts(productData, 'appendFile');
      });
      
      viewCategorys.clearCategorys();
      viewCategorys.activeCategory(category);
      viewCategorys.close();
    });
  });
  
  if (window.matchMedia('(max-width: 500px)').matches) {
    viewHeader.closeHeader();
  }
}

/**
 * Clears category filter and shows all products
 */
function clearCategorysSearch() {
  viewCategorys.close();
  viewCategorys.clearCategorys();
  const allProducts = productsSection.querySelectorAll('.product');
  allProducts.forEach(product => product.remove());
  app.catalog.forEach(productData => {
    renderProducts(productData, 'appendFile');
  });
}

/**
 * Opens add product modal
 */
function addProductOpen() {
  if (window.matchMedia('(max-width: 500px)').matches) {
    viewHeader.closeHeader();
  }
  addProductOverlay.classList.remove('hidden');
}

/**
 * Toggles burger menu on mobile
 */
function openBurgerMenu() {
  if (window.matchMedia('(max-width: 500px)').matches) {
    viewHeader.toggleHeader();
    viewSearch.closeSearchInput();
    profile.close();
    viewCart.close();
    viewCategorys.close();
    updateProductOverlay.classList.add('hidden');
    addProductOverlay.classList.add('hidden');
  }
}

// Initialize application
userAuth();

// Event Listeners
cartButton.addEventListener('click', () => {
  viewCart.open();
  viewHeader.closeHeader();
  viewSearch.closeSearchInput();
});

closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal(btn)));
userLogoutButton.addEventListener('click', logout);
userEditButton.addEventListener('click', editUserProfileOpen);
overlayForm.addEventListener('submit', saveEditProfile);
productSaveButton.addEventListener('click', saveNewProduct);
productUpdateButton.addEventListener('click', updateProduct);
payButton.addEventListener('click', cartPay);
addProductButton.addEventListener('click', addProductOpen);
searchProductButton.addEventListener('click', searchProductOpenInput);
searchProductInput.addEventListener('input', searchProduct);
searchProductClearButton.addEventListener('click', clearSearchInput);
searchProductByCategoryButton.addEventListener('click', searchProductByCategorys);
categorysClearButton.addEventListener('click', clearCategorysSearch);
burgerMenuButton.addEventListener('click', openBurgerMenu);