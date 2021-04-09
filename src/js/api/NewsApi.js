export default class NewsApi {
  constructor(config) {
    this.url = config.url;
    this.apiKey = config.apiKey;
    this.from = config.from;
    this.pageSize = config.pageSize;
  }


  getNews(words){
    return fetch(`${this.url}v2/everything?q=${words}&from=${this.from}&sortBy=publishedAt&apiKey=${this.apiKey}&pageSize=${this.pageSize}&page=1`, {
      method: 'GET',
      Authorization: {
        'Content-type': 'application/json',
        'apiKey': this.apiKey
      },
    })
    .then((news) => {
      if (news.ok){
        return news.json();
      }
    })
  }

}



