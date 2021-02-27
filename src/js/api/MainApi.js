export default class MainApi {
  constructor(config) {
    this.url = config.url;
  }


  signup(email, password, name){
    return fetch(`${this.url}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
  }

  signin(email, password){
    return fetch(`${this.url}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then((res) => {
      if(res.ok){
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          return res.json();
        }
    })
  }

  getUserData(){
    return fetch(`${this.url}/users/me`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
  }

  autoSignin(){
      if (localStorage.getItem('email') != '' && localStorage.getItem('password') != ''){
        this.signin(localStorage.getItem('email'), localStorage.getItem('password'))
        .then((res) => {
          localStorage.setItem('token', res.message);
          this.getUserData()
          .then((data) => {
            this.changePage(data)
          })
        })
      }
  }

  changePage(data){
    const loginButton = document.querySelector('#login');
    const logoutButton = document.querySelector('#logout');
    const savedPage = document.querySelector('#save_page');
    localStorage.setItem('name', data.data.name)


    logoutButton.textContent = `${localStorage.getItem('name')} [->`;
    savedPage.classList.toggle('header_none');
    loginButton.classList.toggle('header_none');
    logoutButton.classList.toggle('header_none');
  }


  createArticle (keyword, title, text, date, source, link, image){
    return fetch(`${this.url}/articles`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
  }

  getArticle(){
    return fetch(`${this.url}/articles`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
  }

  removeArticle(id){
    return fetch(`${this.url}/articles/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
    })
  }

}


