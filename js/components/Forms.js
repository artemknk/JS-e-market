import Modal from "./Modal.js";

/**
 * Form component for product management
 */
export default class Forms extends Modal {
  /**
   * Creates forms instance
   * @param {HTMLElement} container - Form container element
   */
  constructor(container) {
    super(container);

    this.titleField = container.querySelector('#title');
    this.descriptionField = container.querySelector('#description');
    this.categoryField = container.querySelector('#category');
    this.priceField = container.querySelector('#price');
    this.imageField = container.querySelector('#image');

    this.title = this.titleField.value;
    this.description = this.descriptionField.value;
    this.category = this.categoryField.value;
    this.price = this.priceField.value;
    this.images = [this.imageField.value];
  }

  /**
   * Sets form field values
   * @param {Object} data - Form data object
   * @param {string} data.title - Product title
   * @param {string} data.description - Product description
   * @param {string} data.category - Product category
   * @param {number} data.price - Product price
   * @param {string|Array} data.images - Product image URL or array
   */
  setFormValues({ title, description, category, price, images }) {
    this.titleField.value = title;
    this.descriptionField.value = description;
    this.categoryField.value = category;
    this.priceField.value = price;
    this.imageField.value = images;

    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.images = images;
  }

  /**
   * Gets form field values
   * @returns {Object} Form data object
   */
  getFormValues() {
    return {
      id: this.id,
      title: this.titleField.value,
      description: this.descriptionField.value,
      category: this.categoryField.value,
      price: this.priceField.value,
      images: [this.imageField.value]
    };
  }

  /**
   * Resets form to empty values
   */
  resetForm() {
    this.titleField.value = '';
    this.descriptionField.value = '';
    this.categoryField.value = '';
    this.priceField.value = '';
    this.imageField.value = '';
  }
}