export default class Header {
  constructor(body) {
    this.body = body;
    this.headerButtons = body.querySelector('.header__buttons');
    this.header = body.querySelector('.header');
  }
  openHeader() {
    this.headerButtons.classList.add('header__buttons--active');
    this.header.classList.add('header__view');
  }
  closeHeader() {
    this.headerButtons.classList.remove('header__buttons--active');
    this.header.classList.remove('header__view');
  }
  toggleHeader() {
    this.headerButtons.classList.toggle('header__buttons--active');
    this.header.classList.toggle('header__view');
  }
}
