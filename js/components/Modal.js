export default class Modal {

  constructor(container) {
    this.container = container
  }

  open(){
    this.container.classList.remove('hidden');
  }
  close(){
    this.container.classList.add('hidden');
  }
  toggle() {
    this.container.classList.toggle('hidden');
  }
}