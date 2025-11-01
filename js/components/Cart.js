import Modal from "./Modal.js";

/**
 * Cart component
 */
export default class Cart extends Modal {
  /**
   * Creates cart instance
   * @param {HTMLElement} container - Cart container element
   */
  constructor(container) {
    super(container);
    this.cartContainer = this.container.querySelector('.cart__container');
    this.fullPrice = this.container.querySelector('.full__price');
    this.btnPay = this.container.querySelector('.cart__pay');
    this.btnClose = this.container.querySelector('.user__modal-close');
  }

  /**
   * Clears cart after payment
   */
  cartPayButton() {
    this.fullPrice.textContent = 0;
    this.cartContainer.innerHTML = '';
    this.close();
  }
}