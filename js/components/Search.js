import Modal from "./Modal.js";

/**
 * Search component
 */
export default class Search extends Modal {
  /**
   * Creates search instance
   * @param {HTMLElement} container - Search container element
   */
  constructor(container) {
    super(container);
  }

  /**
   * Opens search input
   */
  openSearchInput() {
    this.container.classList.remove('hidden__search-overlay');
  }

  /**
   * Closes search input
   */
  closeSearchInput() {
    this.container.classList.add('hidden__search-overlay');
  }

  /**
   * Toggles search input visibility
   */
  toggleSearchInput() {
    this.container.classList.toggle('hidden__search-overlay');
  }
}