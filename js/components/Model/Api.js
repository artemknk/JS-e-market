/**
 * Клиент для работы с API DummyJSON
 * Выполняет запросы к серверу для получения и обновления данных
 */
export default class Api {
  url = 'https://dummyjson.com';

  /**
   * Получает все товары из каталога
   * @returns {Promise<Object>} Данные товаров с сервера
   */
  getProducts() {
    return fetch(`${this.url}/products`)
      .then(res => res.json());
  }

  /**
   * Обновляет информацию о пользователе на сервере
   * @param {Object} body - Данные пользователя для обновления
   * @param {string} id - ID пользователя
   * @returns {Promise<Object>} Обновленные данные пользователя
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
   * Проверяет авторизацию пользователя с помощью сохраненного токена
   * Использует токен из localStorage для получения данных пользователя
   * @returns {Promise<Response>} Ответ сервера с данными пользователя или ошибкой
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
   * Создает новый заказ на сервере
   * @param {Object} body - Данные заказа (ID пользователя и список товаров)
   * @returns {Promise<Object>} Данные созданного заказа
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
   * Добавляет новый товар в каталог
   * @param {Object} body - Данные товара (название, описание, категория, цена, изображение)
   * @returns {Promise<Object>} Данные созданного товара
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
   * Обновляет существующий товар в каталоге
   * @param {Object} body - Данные товара для обновления
   * @param {string} id - ID товара
   * @returns {Promise<Object>} Обновленные данные товара
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