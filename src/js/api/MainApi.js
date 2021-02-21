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
      return res.json();
    })
    .catch((err) => {
      return err.message;
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
        }
      return res.json();
    })
    .catch(err => console.log(err))
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
      return res.json();
    })
    .catch(err => console.log(err))
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
        .catch(err => console.log(err))
      }
  }

  changePage(data){
    const loginButton = document.querySelector('#login');
    const logoutButton = document.querySelector('#logout');
    const savedPage = document.querySelector('#saved_page');

    logoutButton.textContent = `${data.data.name} [->`;
    savedPage.classList.toggle('header_none');
    loginButton.classList.toggle('header_none');
    logoutButton.classList.toggle('header_none');
  }


  getArticles (email, password){
    return fetch(`${this.url}/articles`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((res) => {
      return res.json();
    })
    .catch(err => console.log(err))
  }

  createArticle (email, password){
    return fetch(`${this.url}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((res) => {
      return res.json();
    })
    .catch(err => console.log(err))
  }

  removeArticle (email, password){
    return fetch(`${this.url}/signin`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then((res) => {
      return res.json();
    })
    .catch(err => console.log(err))
  }

}


