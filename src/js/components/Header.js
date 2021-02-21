export default class Header {
    constructor(color) {
        this.color = color;
    }
  
    
    render(props) {
        if (props.isLoggedIn === true) {

        }

    } 

    


    setEventListenersRegistration(){
        const formCard = document.forms.registration;
        const RegistrationName = formCard.elements.name;
        const RegistrationEmail = formCard.elements.email;
        const RegistrationdPassword = formCard.elements.password;
        const RegistrationButton = document.querySelector("#registration_button")

        if (RegistrationEmail.value.length === 0 || RegistrationName.value.length === 0) {
            RegistrationButton.setAttribute('disabled', true);
            RegistrationButton.classList.remove('popup__button_active');
        } else {
            RegistrationButton.removeAttribute('disabled', true);
            RegistrationButton.classList.add('popup__button_active');
        }
    }
  
}