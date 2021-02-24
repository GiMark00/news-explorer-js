import "./pages/index.css";
import Popup from './js/components/Popup'
import FormValidator from './js/components/FormValidator'
import NewsCardList from './js/components/NewsCardList'
import NewsCard from './js/components/NewsCard'
import MainApi from "./js/api/MainApi";

const saveList = document.querySelector('#saved_container');
const saveHeader = document.querySelector('#header_save');
const template = document.querySelector('.template_save').content;

const userApi = new MainApi({
  url:`https://api.gooseface.students.nomoreparties.space`
});



saveHeader.addEventListener("click", () => {
  localStorage.setItem('email', "");
  localStorage.setItem('password', "");

});

const createCard = (date, title, text, source, imageLink, cardUrl, cardID) => {
  const newsCard = new NewsCard(date, title, text, source, imageLink, cardUrl, cardID, template, userApi);
  return newsCard.renderIcon();
}

const saveNewsList = new NewsCardList(saveList, userApi, createCard);

saveNewsList.renderSaveResults();
saveHeader.textContent = `${localStorage.getItem('name')} [->`

