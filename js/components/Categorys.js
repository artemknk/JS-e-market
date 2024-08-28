import Modal from "./Modal.js";

export default class Categorys extends Modal {
  constructor(container) {
    super(container);
  }
  renderCategory(categorys) {
    const categoryName = document.createElement('p');
    categoryName.classList.add('category__name');
    categoryName.textContent = categorys;
    this.container.appendChild(categoryName);
  }
  deleteCategories() {
    const elementsToRemove = this.container.querySelectorAll('p.category__name');
    elementsToRemove.forEach(element => element.remove());
  }
  activeCategory(categorys) {
    categorys.classList.add('category__name--active');
  }
  clearCategorys() {
    const allCategoryNames = this.container.querySelectorAll('.category__name');
    allCategoryNames.forEach(category => category.classList.remove('category__name--active'));
  }
}