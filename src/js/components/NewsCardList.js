export default class NewsCardList {

  constructor(container, api, createCardFunction) {
    this.container = container;
    this.api = api;
    this.createCardFunction = createCardFunction;
  }

  addCard(date, title, text, source, imageLink, cardUrl, cardID) {
    const card = this.createCardFunction(date, title, text, source, imageLink, cardUrl, cardID);
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
          this.addCard(source.publishedAt, source.title, source.description, source.source.name, source.urlToImage, source.url, "")
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
    this.api.getArticle()
    .then((res)=>{
        res.data.forEach((source) => {
          this.addCard(source.date, source.title, source.text, source.source, source.image, source.link, source._id)
        })
    })
    .catch(err => {
      console.log(err)
    })
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
    this.container.classList.add('results__container_more');
  }



}