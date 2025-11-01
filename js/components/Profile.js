/**
 * User profile component
 */
export default class Profile {
  /**
   * Creates profile instance
   * @param {HTMLElement} container - Profile container element
   */
  constructor(container) {
    this.container = container;
    this.name = container.querySelector('.user__modal-name');
    this.email = container.querySelector('.user__modal-email');
    this.phone = container.querySelector('.user__modal-phone');
  }

  /**
   * Opens profile modal
   */
  open() {
    this.container.classList.remove('hidden');
  }

  /**
   * Closes profile modal
   */
  close() {
    this.container.classList.add('hidden');
  }

  /**
   * Sets profile data
   * @param {Object} data - User data
   */
  setProfile(data = {}) {
    this.name.textContent = `${data.firstName} ${data.lastName}`;
    this.email.textContent = data.email;
    this.phone.textContent = data.phone;
  }
}