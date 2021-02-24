import "./pages/index.css";
import Popup from './js/components/Popup'
import FormValidator from './js/components/FormValidator'
import NewsCardList from './js/components/NewsCardList'
import NewsCard from './js/components/NewsCard'
import MainApi from "./js/api/MainApi";
import NewsApi from "./js/api/NewsApi";
import from from "./js/constants/Date";



const placesList = document.querySelector('.results__container');

const showMore = document.querySelector('.results__button');

const closeForm = document.querySelector('.popup__close');
const popupForm = document.querySelector('.popup__form');
const popupSigninWindow = document.querySelector('#popup_signin');
const popupRegistrationWindow = document.querySelector('#popup_registration');
const popupRegistrationLink = document.querySelector('#registration_link');

const popupSuccessWindow = document.querySelector('#popup_success');

const popupSigninLink = document.querySelector('#signin_link');
const popupSuccessLink = document.querySelector('#success_link');

const findField = document.querySelector('.search-field__text');
const findButton = document.querySelector('.search-field__text_button');

const loginButton = document.querySelector('#login');
const logoutButton = document.querySelector('#logout');
const savedPage = document.querySelector('#save_page');

const template = document.querySelector('.template').content;

const formRegistration = document.forms.registration;
const inputNameUser = formRegistration.elements.signup__name;
const inputEmailUser = formRegistration.elements.signup__email;
const inputPasswordUser = formRegistration.elements.signup__password;


const formSignin = document.forms.signin;
const signinEmailUser = formSignin.elements.signin__email;
const signinPasswordUser = formSignin.elements.signin__password;


const userApi = new MainApi({
    url:`https://api.gooseface.students.nomoreparties.space`
});

const newsApi = new NewsApi({
  url:`https://nomoreparties.co/news/`,
  apiKey: 'd50fa49a7d074db38d0a434cf01763bb',
  from: from,
  pageSize: 100,
});


const sendFormRegistration = new FormValidator(formRegistration);
const sendFormSignin= new FormValidator(formSignin);
const popupSignin = new Popup(popupSigninWindow,'popup_is-opened');
const popupRegistration = new Popup(popupRegistrationWindow,'popup_is-opened');
const popupSuccess = new Popup(popupSuccessWindow,'popup_is-opened');



const createCard = (date, title, text, source, link, url, id) => {
  const newsCard = new NewsCard(date, title, text, source, link, url, id, template, userApi);
  return newsCard.renderIcon();
}



const newsList = new NewsCardList(placesList, newsApi, createCard)

inputNameUser.addEventListener('input', sendFormRegistration.setEventListenersRegistration);
inputEmailUser.addEventListener('input', sendFormRegistration.setEventListenersRegistration);
inputPasswordUser.addEventListener('input', sendFormRegistration.setEventListenersRegistration);
sendFormRegistration.setEventListeners();


signinEmailUser.addEventListener('input', sendFormSignin.setEventListenersSignin);
signinPasswordUser.addEventListener('input', sendFormSignin.setEventListenersSignin);


popupRegistrationLink.addEventListener("click",() => {
  popupSignin.close();
  popupRegistration.open();
});

popupSigninLink.addEventListener("click",() => {
  popupRegistration.close();
  popupSignin.open();
});

popupSuccessLink.addEventListener("click",() => {
  popupSuccess.close();
  popupSignin.open();
});

loginButton.addEventListener("click",() => { popupSignin.open();});
closeForm.addEventListener("click", () => {
  popupForm.reset();
  sendFormRegistration.setSubmitButtonState(false);
  sendFormSignin.setSubmitButtonState(false);
});



findButton.addEventListener("click", () => {
  placesList.querySelectorAll('*').forEach(n => n.remove());
  newsList.renderResults(findField.value)
});



formRegistration.addEventListener("submit", (event) => {

    event.preventDefault();
    userApi.signup(inputEmailUser.value, inputPasswordUser.value, inputNameUser.value)
      .then((res) => {

          popupRegistration.close();
          popupSuccess.open();
          return res;
      })
      .catch((err) => console.log(err))

});

formSignin.addEventListener("submit", (event) => {

  event.preventDefault();
  userApi.signin(signinEmailUser.value, signinPasswordUser.value)
    .then((res) => {
        localStorage.setItem('token', res.message);
        popupSignin.close();
        userApi.getUserData()
        .then((data) => {
          userApi.changePage(data)
        })

    })
    .catch((err) => console.log(err))

});

logoutButton.addEventListener("click", () => {
  localStorage.setItem('email', "");
  localStorage.setItem('password', "");

  savedPage.classList.toggle('header_none');
  loginButton.classList.toggle('header_none');
  logoutButton.classList.toggle('header_none');
});

showMore.addEventListener("click", () => {
  newsList.showMore();
});

userApi.autoSignin();

