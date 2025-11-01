/**
 * Header component
 */
export default class Header {
  /**
   * Creates header instance
   * @param {HTMLElement} body - Body element
   */
  constructor(body) {
    this.body = body;
    this.headerButtons = body.querySelector('.header__buttons');
    this.header = body.querySelector('.header');
  }

  /**
   * Opens header menu
   */
  openHeader() {
    this.headerButtons.classList.add('header__buttons--active');
    this.header.classList.add('header__view');
  }

  /**
   * Closes header menu
   */
  closeHeader() {
    this.headerButtons.classList.remove('header__buttons--active');
    this.header.classList.remove('header__view');
  }

  /**
   * Toggles header menu visibility
   */
  toggleHeader() {
    this.headerButtons.classList.toggle('header__buttons--active');
    this.header.classList.toggle('header__view');
  }
}
