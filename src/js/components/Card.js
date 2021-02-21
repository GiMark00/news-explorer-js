
export default class Card {

  constructor(date, title, text, source, template) {
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.template = template;
  }

  create(title, date, text, source) {
    const card = this.template.cloneNode(true).children[0];
    const cardTitle = card.querySelector('.card__title');
    const cardDate = card.querySelector('.card__date');
    const cardText = card.querySelector('.card__text');
    const cardSource = card.querySelector('.card__source');

    cardTitle.textContent = title;
    cardDate.textContent = date;
    cardText.textContent = text;
    cardSource.textContent = source;

    // cardImage.style.backgroundImage = `url(${this.link})`;

    this.cardElement = card;
    this.addListeners();
    return this.cardElement;
  }

  addListeners() {
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.card__flag').addEventListener('click', this.add);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.openPopup);
  }

  remove = (event) => {
    event.stopPropagation();
    this.removeEventListeners( this.cardElement);
    this.cardElement.remove();
  }

  removeEventListeners = (card) => {
    card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    card.querySelector('.place-card__image').removeEventListener('click', this.openPopup);
    card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
  }

  add = (event) => {
    event.target.classList.toggle('card__flag_blue');
  }

}





