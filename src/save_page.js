import "./pages/index.css";
import Popup from './js/components/Popup'
import FormValidator from './js/components/FormValidator'
import NewsCardList from './js/components/NewsCardList'
import NewsCard from './js/components/NewsCard'
import MainApi from "./js/api/MainApi";

const saveList = document.querySelector('#saved_container');
const saveHeader = document.querySelector('#header_save');
const saveTitle = document.querySelector('.saved-cards__title');
const template = document.querySelector('.template_save').content;

const userApi = new MainApi({
  url:`https://api.gooseface.students.nomoreparties.space`
});



saveHeader.addEventListener("click", () => {
  localStorage.setItem('email', "");
  localStorage.setItem('password', "");

});

const createCard = (date, title, text, source, imageLink, cardUrl, cardID, keyword) => {
  const newsCard = new NewsCard(date, title, text, source, imageLink, cardUrl, cardID, keyword, template, userApi);
  return newsCard.renderIcon();
}

// const sortBy = [].reduce((reducer, article) => {
//   if(!reducer[article.keyword]) {
//     reducer[article.keyword] = 0;
//   }
//   reducer[article.keyword]++;
//   return reducer;
// }, {});


const saveNewsList = new NewsCardList(saveList, userApi, createCard);



saveNewsList.renderSaveResults()


// var jsonObj = {
//   members:
//          {
//           host: "hostName",
//           viewers:
//           {
//               user1: "value1",
//               user2: "value2",
//               user3: "value3"
//           }
//       }
// }

// var i;

// for(i=4; i<=8; i++){
//   var newUser = "user" + i;
//   var newValue = "value" + i;
//   jsonObj.members.viewers[newUser] = newValue ;

// }



// const target = localStorage.getItem('list');
// console.log(target)

// function count(array){
//   var names = {};
//   array.forEach(item => {
//     names[item] = (names[item] || 0) + 1;
//   });
//   return names;
// }

// count(target)

// const getCountIds = heh => {
// 	const result = new Object
//   const target = localStorage.getItem('list');

//   target.forEach(item => result[item] ? result[item]++ : result[item] = 1)

//   return Object.keys(result).map(item => {
//   	return {
//     	id: parseInt(item),
//       sum: result[item]
//     }
//   })
// }

// getCountIds(target)


saveHeader.textContent = `${localStorage.getItem('name')} [->`;
saveTitle.textContent = `${localStorage.getItem('name')}, у вас ${saveList.childElementCount} сохранённых статей`;



