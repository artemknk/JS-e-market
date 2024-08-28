export default class Profile {
  constructor(container) {
    this.container = container
    this.name = container.querySelector('.user__modal-name');
    this.email = container.querySelector('.user__modal-email');
    this.phone = container.querySelector('.user__modal-phone');
  }
  open(){
    this.container.classList.remove('hidden');
  }
  close(){
    this.container.classList.add('hidden');
  }
  setProfile(data = {}) {
    this.name.textContent = data.firstName + ' ' + data.lastName;
    this.email.textContent = data.email;
    this.phone.textContent = data.phone;
  }
}

