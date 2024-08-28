import Modal from "./Modal.js";

export default class Search extends Modal {
  constructor(container) {
    super(container);
  }
  openSearchInput() {
    this.container.classList.remove('hidden__search-overlay');
  }
  closeSearchInput() {
    this.container.classList.add('hidden__search-overlay');
  }
  toggleSearchInput() {
    this.container.classList.toggle('hidden__search-overlay');
  }
}