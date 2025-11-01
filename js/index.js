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

// Элементы DOM (DOM - Document Object Model)
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


// Инициализация компонентов приложения
const api = new Api();
const app = new App();
const profile = new Profile(userModal);
const viewCart = new Cart(cart);
const viewCategorys = new Categorys(categorysContainer);
const viewHeader = new Header(document.body);
const viewSearch = new Search(searchProductOverlay);
const formAddProduct = new Forms(addProductForm);
const formUpdateProduct = new Forms(updateProductForm);

// Загрузка товаров при открытии страницы
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
 * Аутентификация пользователя с использованием сохраненного токена
 * Проверяет наличие токена в localStorage и получает данные пользователя
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
 * Добавляет новый товар через API
 * @param {Object} body - Данные товара (название, описание, категория, цена, изображение)
 * @returns {Promise<Object>} Данные созданного товара
 */
async function addNewProduct(body) {
  return await api.addNewProduct(body);
}

/**
 * Открывает модальное окно профиля пользователя при клике на аватар
 */
userProfile.addEventListener('click', () => {
  profile.open();
  if (window.matchMedia("(max-width: 500px)").matches) {
    viewHeader.closeHeader();
  }
});

/**
 * Открывает форму редактирования профиля и заполняет её текущими данными пользователя
 */
function editUserProfileOpen() {
  overlayForm.querySelector('#name').value = app.user.firstName;
  overlayForm.querySelector('#surname').value = app.user.lastName;
  overlayForm.querySelector('#email').value = app.user.email;
  overlayForm.querySelector('#phone').value = app.user.phone;
  editProfileOverlay.classList.remove('hidden');
}

/**
 * Сохраняет отредактированный профиль пользователя
 * Отправляет данные на сервер и обновляет информацию в интерфейсе
 * @param {Event} event - Событие отправки формы
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
 * Сохраняет новый товар в каталог
 * Добавляет товар через API и обновляет список товаров на странице
 * @param {Event} event - Событие отправки формы
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
 * Заполняет форму обновления товара данными выбранного товара
 * @param {Object} obj - Объект товара с данными (id, название, цена, описание и т.д.)
 */
function updateProductFormData(obj) {
  formUpdateProduct.setFormValues(obj);
  app.setUpdateProduct(obj);
}

/**
 * Обновляет существующий товар в каталоге
 * Отправляет изменения на сервер и обновляет отображение товаров
 * @param {Event} event - Событие отправки формы
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
 * Выход пользователя из системы
 * Удаляет токен авторизации из localStorage и перезагружает страницу
 */
function logout() {
  localStorage.removeItem('token');
  window.location.reload();
}

/**
 * Закрывает модальное окно при нажатии на кнопку закрытия
 * @param {HTMLElement} btn - Элемент кнопки закрытия (крестик)
 */
function closeModal(btn) {
  const modal = btn.closest('.close');
  modal.classList.add('hidden');
}

/**
 * Отображает карточку товара на странице
 * Создает визуальный элемент товара и добавляет обработчики событий для кнопок
 * @param {Object} obj - Объект товара с данными (название, цена, описание, изображение и т.д.)
 * @param {string} method - Метод добавления ('appendFile' - в конец, 'prependFile' - в начало)
 * @returns {Product} Экземпляр компонента товара
 */
function renderProducts(obj, method) {
  const product = new Product();
  product.renderProduct(obj);
  product[method](productsSection);

  product.btn.addEventListener('click', () => {
    const existingProduct = app.cartProducts.find(el => el.id === obj.id);
    const objectCartElement = { ...obj, count: 1 };

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
 * Добавляет товар в корзину
 * Создает элемент товара в корзине с возможностью изменения количества и удаления
 * @param {Object} obj - Объект товара с количеством (count)
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
 * Вычисляет и отображает общую стоимость товаров в корзине
 * Суммирует цены всех товаров с учетом их количества
 */
function getTotal() {
  fullPrice.textContent = app.cartProducts.reduce((acc, el) => {
    return acc + el.price * el.count;
  }, 0).toFixed(2);
}

/**
 * Обрабатывает оплату товаров из корзины
 * Проверяет авторизацию, создает заказ и очищает корзину
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
 * Перенаправляет на страницу входа, если пользователь не авторизован
 */
function authLink() {
  window.location.href = './logPage.html';
}

/**
 * Отображает сообщение об успешном оформлении заказа
 * Показывает номер заказа и общую сумму, затем автоматически скрывает через 3 секунды
 * @param {Object} data - Данные заказа (id, общая сумма и т.д.)
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
 * Открывает поле поиска товаров
 * На мобильных устройствах просто открывает, на десктопе - переключает видимость
 */
function searchProductOpenInput() {
  if (!window.matchMedia('(max-width: 500px)').matches) {
    viewHeader.toggleHeader();
    viewSearch.toggleSearchInput();
  }
}

/**
 * Очищает поле поиска и сбрасывает фильтрацию товаров
 * Показывает все товары из каталога
 */
function clearSearchInput() {
  searchProductInput.value = '';
  searchProduct();
  viewSearch.closeSearchInput();
  viewHeader.closeHeader();
}

/**
 * Фильтрует и отображает товары по поисковому запросу
 * Сравнивает название товара с введенным текстом (без учета регистра)
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
 * Открывает меню фильтрации по категориям
 * Показывает список всех доступных категорий для фильтрации товаров
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
 * Очищает фильтр по категориям и показывает все товары
 * Снимает выделение с активной категории и отображает полный каталог
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
 * Открывает модальное окно для добавления нового товара
 * На мобильных устройствах также закрывает меню
 */
function addProductOpen() {
  if (window.matchMedia('(max-width: 500px)').matches) {
    viewHeader.closeHeader();
  }
  addProductOverlay.classList.remove('hidden');
}

/**
 * Переключает бургер-меню на мобильных устройствах
 * Открывает/закрывает меню и скрывает все открытые модальные окна
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

// Инициализация приложения - проверка авторизации пользователя
userAuth();

// Обработчики событий (слушатели событий)
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