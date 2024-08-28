export default class Product {
  element = document.createElement('div');
  btn = null;
  btnEdit = null;
  renderProduct(obj) {
    this.element.classList.add('product');
    this.element.innerHTML = `
      <img src="${obj.images[0]}" alt="${obj.description}" class="product__image">
      <h3 class="product__title">${obj.title.toUpperCase()}</h3>
      <p class="product__category">${obj.category ? obj.category : ''}</p>
      <p class="product__description">${obj.description}</p>
      <div class="product__buttons">
        <button class="product__button">Add to cart</button>
        <button class="update__button">Update product</button>
      </div>
    `;
    this.btn = this.element.querySelector('.product__button');
    this.btnEdit = this.element.querySelector('.update__button');
  }
  appendFile(parent) {
    parent.append(this.element);
  }
  prependFile(parent) {
    parent.prepend(this.element);
  }
  updateFile(parent) {
    parent.replaceWith(this.element);
  }
}

