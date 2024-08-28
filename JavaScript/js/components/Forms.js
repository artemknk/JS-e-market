import Modal from "./Modal.js";
export default class Forms extends Modal {
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

  getFormValues() {
    return {
      id: this.id,
      title: this.titleField.value,
      description: this.descriptionField.value,
      category: this.categoryField.value,
      price: this.priceField.value,
      images: [this.imageField.value]
    }
  }
  resetForm() {
    this.titleField.value = '';
    this.descriptionField.value = '';
    this.categoryField.value = '';
    this.priceField.value = '';
    this.imageField.value = '';
  }
}