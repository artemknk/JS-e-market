export default class ProductCart {
  element = document.createElement('div');
  btn = null;
  render(obj) {
    this.element.classList.add('cart__item');
    this.element.innerHTML = `
      <p class="cart-item__name">Название: ${obj.title}</p>
      <p class="cart-item__price">Цена: ${obj.price}</p>
      <div class="cart-item__counter">
        <button class="cart-item__plus">+</button>
        <p class="cart-item__count">${obj.count}</p>
        <button class="cart-item__minus">-</button>
      </div>
      <button class="cart-item__remove">Remove</button>
    `;
    this.cartItemButtonPlus = this.element.querySelector('.cart-item__plus');
    this.cartItemButtonMinus = this.element.querySelector('.cart-item__minus');
    this.cartItemRemove = this.element.querySelector('.cart-item__remove');
    this.countElem = this.element.querySelector('.cart-item__count')
  }

  appendFile(parent) {
    parent.append(this.element);
  }
}