import "./pages/index.css";
import Popup from './js/components/Popup'
import FormValidator from './js/components/FormValidator'
import Card from './js/components/Card'
import CardList from './js/components/CardList'
import MainApi from "./js/api/MainApi";



const placesList = document.querySelector('.results__container');
const signinButton = document.querySelector('.header__signin');
const closeForm = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const popupSigninWindow = document.querySelector('#popup_signin');
const popupRegistrationWindow = document.querySelector('#popup_registration');
const popupRegistrationLink = document.querySelector('#registration_link');

const popupSuccessWindow = document.querySelector('#popup_success');

const popupSigninLink = document.querySelector('#signin_link');

const findField = document.querySelector('.search-field__text');
const findButton = document.querySelector('.search-field__text_button');

const signupButton = document.querySelector('#signup__button');



const template = document.querySelector('.template').content;

const formRegistration = document.forms.registration;
const inputNameUser = formRegistration.elements.signup__name;
const inputEmailUser = formRegistration.elements.signup__email;
const inputPasswordUser = formRegistration.elements.signup__password;


const userApi = new MainApi({
    url:`https://api.goosenews.students.nomoreparties.space`,
    apiKey: 'd50fa49a7d074db38d0a434cf01763bb',
});



// const formSignin = document.forms.signin;
// const inputPasswordUser = formSignin.elements.password;
// const inputPasswordUser = formSignin.elements.password;

const sendFormUser= new FormValidator(formRegistration);
const popupSignin = new Popup(popupSigninWindow,'popup_is-opened');
const popupRegistration = new Popup(popupRegistrationWindow,'popup_is-opened');
const popupSuccess = new Popup(popupSuccessWindow,'popup_is-opened');

const createCardFunction = (date, title, text, source) => {
    const card = new Card(date, title, text, source, template);
    return card.create();
}







inputNameUser.addEventListener('input', sendFormUser.setEventListenersRegistration);
inputEmailUser.addEventListener('input', sendFormUser.setEventListenersRegistration);
inputPasswordUser.addEventListener('input', sendFormUser.setEventListenersRegistration);

sendFormUser.setEventListeners();


popupRegistrationLink.addEventListener("click",() => { popupSignin.close(); popupRegistration.open();});
popupSigninLink.addEventListener("click",() => { popupRegistration.close(); popupSignin.open();});

signinButton.addEventListener("click",() => { popupSignin.open();});
closeForm.addEventListener("click", () => { popupForm.reset(); sendFormUser.setSubmitButtonState(false);});



findButton.addEventListener("click", () => { popupForm.reset(); sendFormUser.setSubmitButtonState(false);});

formRegistration.addEventListener("submit", (event) => {
    event.preventDefault();
    userApi.signup(inputEmailUser.textContent, inputPasswordUser.textContent, inputNameUser.textContent)
      .then((res) => {

          popupRegistration.close();
          popupSuccess.open();
          // return res.json();
      })
      .catch((err) => console.log(err))

});

// cardList.render();