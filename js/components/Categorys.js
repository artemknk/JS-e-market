import Modal from "./Modal.js";

/**
 * Categories component
 */
export default class Categorys extends Modal {
  /**
   * Creates categories instance
   * @param {HTMLElement} container - Categories container element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Renders a category
   * @param {string} categorys - Category name
   */
  renderCategory(categorys) {
    const categoryName = document.createElement('p');
    categoryName.classList.add('category__name');
    categoryName.textContent = categorys;
    this.container.appendChild(categoryName);
  }

  /**
   * Removes all category elements
   */
  deleteCategories() {
    const elementsToRemove = this.container.querySelectorAll('p.category__name');
    elementsToRemove.forEach(element => element.remove());
  }

  /**
   * Marks category as active
   * @param {HTMLElement} categorys - Category element
   */
  activeCategory(categorys) {
    categorys.classList.add('category__name--active');
  }

  /**
   * Removes active state from all categories
   */
  clearCategorys() {
    const allCategoryNames = this.container.querySelectorAll('.category__name');
    allCategoryNames.forEach(category => {
      category.classList.remove('category__name--active');
    });
  }
}