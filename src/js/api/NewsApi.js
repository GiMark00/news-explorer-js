export default class NewsApi {
  constructor(config) {
    this.url = config.url;
    this.apiKey = config.apiKey;
    this.from = config.from;
    this.to = config.to;
    this.pageSize = config.pageSize;
  }


  // getNews(words){
  //   return fetch(`${this.url}v2/everything?q=${words}&from=${this.from}&sortBy=publishedAt&apiKey=${this.apiKey}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //       'apiKey': this.apiKey
  //     },
  //   })
  //   .then ((res) => {
  //     if(res.ok) {
  //       return res.json()
  //     }
  //   })
  //   .catch(err => console.log(err))
  // }

  getNews(words){
    return fetch(`${this.url}v2/everything?q=${words}&from=${this.from}&sortBy=publishedAt&apiKey=${this.apiKey}&pageSize=${this.pageSize}`, {
      method: 'GET',
      Authorization: {
        'Content-type': 'application/json',
        'apiKey': this.apiKey
      },
    })
    .then((news) => {
      return news.json();
    })
    .catch(error => {
      console.log(error);
    });
  }

  printNews(){

  }

}



