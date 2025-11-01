/**
 * Основной класс для управления состоянием приложения
 * Хранит данные о каталоге товаров, корзине, пользователе и заказах
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
   * Устанавливает данные заказа
   * Преобразует товары из корзины в формат для отправки на сервер
   * @param {string} userId - ID пользователя
   * @param {Array} products - Массив товаров из корзины
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
   * Устанавливает каталог товаров
   * @param {Array} catalog - Массив товаров
   */
  setCatalog(catalog) {
    this.catalog = catalog;
  }

  /**
   * Устанавливает товары в корзине
   * @param {Array} cartProducts - Массив товаров в корзине
   */
  setCartProducts(cartProducts) {
    this.cartProducts = cartProducts;
  }

  /**
   * Устанавливает список категорий товаров
   * @param {Array} categorys - Массив названий категорий
   */
  setCategorys(categorys) {
    this.categorys = categorys;
  }

  /**
   * Устанавливает данные пользователя
   * Сохраняет информацию о текущем авторизованном пользователе
   * @param {Object} data - Объект с данными пользователя (имя, фамилия, email, телефон, id)
   */
  setUser(data = {}) {
    this.user.firstName = data.firstName || '';
    this.user.lastName = data.lastName || '';
    this.user.email = data.email || '';
    this.user.phone = data.phone || '';
    this.user.id = data.id || '';
  }

  /**
   * Устанавливает данные товара для обновления
   * Сохраняет данные товара, который будет редактироваться
   * @param {Object} data - Объект с данными товара (id, название, цена, описание, категория, изображения)
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
   * Извлекает значения из формы редактирования профиля
   * Получает данные из полей формы и сохраняет их для отправки на сервер
   * @param {HTMLFormElement} editProfileForm - Элемент формы редактирования профиля
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
