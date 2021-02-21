export default class NewsCardList {

  constructor(container, api, createCardFunction) {
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  addCard(date, title, text, source, link) {
    const card = this.createCardFunction(date, title, text, source, link);
    this.container.appendChild(card);
  }


  renderResults(words){
    this.removeContainer();
    this.renderLoader();
    this.api.getNews(words)
    .then((res)=>{
      res.articles.forEach((source) => {
        this.addCard(source.publishedAt, source.title, source.description, source.source.name, source.urlToImage)
      })
    })
    .then(() => {
      this.renderLoader();
      this.addContainer();
    })
    .catch(err => {
      this.renderLoader();
      console.log(err)
    })
  }


  renderLoader(){
    const loader = document.querySelector('.preloader');
    loader.classList.toggle('preloader_none');
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

  }



}