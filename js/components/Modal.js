/**
 * Base modal component class
 */
export default class Modal {
  /**
   * Creates modal instance
   * @param {HTMLElement} container - Modal container element
   */
  constructor(container) {
    this.container = container;
  }

  /**
   * Opens modal
   */
  open() {
    this.container.classList.remove('hidden');
  }

  /**
   * Closes modal
   */
  close() {
    this.container.classList.add('hidden');
  }

  /**
   * Toggles modal visibility
   */
  toggle() {
    this.container.classList.toggle('hidden');
  }
}