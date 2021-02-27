export default class NewsCardList {

  constructor(container, api, createCardFunction) {
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  addCard(date, title, text, source, imageLink, cardUrl, cardID, words) {
    const card = this.createCardFunction(date, title, text, source, imageLink, cardUrl, cardID, words);
    this.container.appendChild(card);
  }


  renderResults(words){
    this.container.classList.remove('results__container_more');
    this.removeContainer();
    this.removeNotFound();
    this.renderLoader();
    this.api.getNews(words)
    .then((res)=>{
      console.log(res)
      if (res.articles.length === 0){
        this.renderLoader();
        this.addNotFound();
      } else {
        res.articles.forEach((source) => {
          this.addCard(source.publishedAt, source.title, source.description, source.source.name, source.urlToImage, source.url, "", words)
        })
        this.renderLoader();
        this.addContainer();
      }
    })
    .catch(err => {
      this.renderLoader();
      console.log(err)
    })
  }


  renderSaveResults(){
    let list = [];
    this.api.getArticle()
    .then((res)=>{
        res.data.forEach((source) => {
          this.addCard(source.date, source.title, source.text, source.source, source.image, source.link, source._id, source.keyword)
          list.push(source.keyword)
        })
        return list;
    })
    .then((res) => {
      this.savePageHeader(res)
    })
    .catch(err => {
      console.log(err)
    })
  }


  savePageHeader(res){
    const saveTitle = document.querySelector('.saved-cards__title');
      const saveSubtitle = document.querySelector('.saved-cards__subtitle');
      saveTitle.textContent = `${localStorage.getItem('name')}, у вас ${res.length} сохранённых статей`;

      let firstWord = res[0];
      let firstLength = 0;
      let secondWord = 0;
      let secondLength = 0;
      let key = '';
      let amount = 0;


      for( let i = 0; i <= res.length; i++){

        if (res[i] != key){
          let list = res.filter(word => word == res[i]);
          key = res[i];
          amount++

          if (list.length > firstLength){
            secondWord = firstWord;
            secondLength = firstLength;
            firstWord = list[0];
            firstLength = list.length;
          }

          if (list.length > secondLength && list[0] != firstWord){
            secondWord = list[0];
            secondLength = list.length;
          }
        }
      }

      saveSubtitle.textContent = `По ключевым словам: ${firstWord}, ${secondWord} и ${amount - 3}-м другим`;
  }


  renderLoader(){
    const loader = document.querySelector('.preloader');
    loader.classList.toggle('preloader_none');
  }

  addNotFound(){
    const notFound = document.querySelector('.not-found');
    notFound.classList.remove('not-found_none');
  }

  removeNotFound(){
    const notFound = document.querySelector('.not-found');
    notFound.classList.add('not-found_none');
  }

  addContainer(){
    const results = document.querySelector('.results');
    results.classList.remove('results_none');
  }

  removeContainer(){
    const results = document.querySelector('.results');
    results.classList.add('results_none');
  }



  showMore(){
    if (screen.width>=310 && screen.width<760) {
      document.querySelector('.results__container').style.height = document.querySelector('.results__container').offsetHeight + 1350 + 'px';

    }
    if (screen.width>=760 && screen.width<1430) {
      document.querySelector('.results__container').style.height = document.querySelector('.results__container').offsetHeight + 428 + 'px';

    }
    else {
      document.querySelector('.results__container').style.height = document.querySelector('.results__container').offsetHeight + 592 + 'px';
    }
  }

}