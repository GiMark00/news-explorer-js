export default class FormValidator {
    constructor(formV) {
        this.formV = formV;
        this.setEventListeners = this.setEventListeners.bind(this);
    }


    checkInputValidity (inputElement, errorMessageElement) {
        if (inputElement.value.length === 0) {
            errorMessageElement.textContent = 'Это обязательное поле';
            return false;
        }
        if (inputElement.value.length < 2 || inputElement.value.length > 30) {
            errorMessageElement.textContent = 'Должно быть от 2 до 30 символов';
            return false;
        }
        if (inputElement.typeMismatch && inputElement.type === 'email') {
            errorMessageElement.textContent = 'Здесь должен быть email';
            return false;
        } else {
            errorMessageElement.textContent = '';
            return true;
        }
    }

    setSubmitButtonState(state) {
        const button = this.formV.querySelector('button');
        if (state) {
        button.removeAttribute('disabled', true);
        button.classList.add('popup__button_active');
        }
        else {
        button.setAttribute('disabled', true);
        button.classList.remove('popup__button_active');
        }
    }

    isFieldValid(input) {
        const errorElem = this.formV.querySelector(`#${input.id}__valid`);
        const valid = this.checkInputValidity(input, errorElem);
        return valid;
    }

    setEventListeners() {
        const inputs = [...this.formV.querySelectorAll('input')];
        this.formV.addEventListener('input', (event)=>{
            const inputForValidation = event.target;
            this.isFieldValid(inputForValidation);

            // if (inputs.every((input) => input.validity.valid)) {
            //     this.setSubmitButtonState(true);
            // } else {
            //     this.setSubmitButtonState(false);
            // }
        });
    }


    setEventListenersRegistration(){
        const formRegistration = document.forms.registration;
        const registrationName = formRegistration.elements.signup__name;
        const registrationEmail = formRegistration.elements.signup__email;
        const registrationdPassword = formRegistration.elements.signup__password;
        const registrationButton = document.querySelector("#registration_button")

        if (registrationEmail.value.length === 0 || registrationName.value.length === 0 || registrationdPassword.value.length === 0) {
            registrationButton.setAttribute('disabled', true);
            registrationButton.classList.remove('popup__button_active');
        } else {
            registrationButton.removeAttribute('disabled', true);
            registrationButton.classList.add('popup__button_active');
        }
    }

    setEventListenersSignin(){
      const formSignin = document.forms.signin;
      const signinEmail = formSignin.elements.signin__email;
      const signinPassword = formSignin.elements.signin__password;
      const signinButton = document.querySelector("#signin_button")

      if (signinEmail.value.length === 0 || signinPassword.value.length === 0) {
          signinButton.setAttribute('disabled', true);
          signinButton.classList.remove('popup__button_active');
      } else {
          signinButton.removeAttribute('disabled', true);
          signinButton.classList.add('popup__button_active');
      }
  }

}