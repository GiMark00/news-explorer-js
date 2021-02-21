export default class NewsCard {

  constructor(date, title, text, source, link, template) {
    this.title = title;
    this.link = link;
    this.text = text;
    this.date = date;
    this.source = source;

    this.template = template;
  }

  renderIcon() {
    const card = this.template.cloneNode(true).children[0];

    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const cardText = card.querySelector('.card__text');
    const cardDate = card.querySelector('.card__date');
    const cardSource = card.querySelector('.card__source');


    cardTitle.textContent = this.title;
    cardText.textContent = this.text;
    cardDate.textContent = this.date;
    cardSource.textContent = this.source;
    cardImage.src = this.link;

    this.cardElement = card;
    this.addListeners();
    return this.cardElement;
  }

  addListeners() {
    this.cardElement.querySelector('.card__flag').addEventListener('click', this.cardAdd);
    this.cardElement.querySelector('.card__image').addEventListener('mouseover', this.cardOpacity);
    this.cardElement.querySelector('.card__image').addEventListener('mouseout', this.cardOpacity);
  }

  removeCard = (event) => {
    event.stopPropagation();
    this.removeEventListeners(this.cardElement);
    this.cardElement.remove();
  }

  removeEventListeners = (card) => {
    card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    card.querySelector('.place-card__delete-icon').removeEventListener('click', this.removeCard);
  }

  cardAdd = (event) => {
    if (localStorage.getItem('email') != "" && localStorage.getItem('password') != "") {
      event.target.classList.toggle('card__flag_blue');
    }
  }


  cardOpacity = () => {
    if (localStorage.getItem('email') === "" || localStorage.getItem('password') === "") {
      const cardOpacity = this.cardElement.querySelector('.card__signin');
      cardOpacity.classList.toggle('card__signin_visible');
    }
  }


}