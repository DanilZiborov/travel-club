import { Card } from "./Card.js";

export class TourCard extends Card {
  constructor({templateId, cardData}) {
    super({templateId, cardData});
  }

  generateCard() {
    super.generateCard();

    this._card = this._cardTemplate.querySelector('.tour-card');

    this._card.style.backgroundImage = `url(${this._cardData.image})`;
    this._card.querySelector('.tour-card__title').textContent = this._cardData.title;
    this._card.querySelector('.tour-card__duration').textContent = this._cardData.duration;
    this._card.querySelector('.tour-card__about').textContent = this._cardData.about;

    if (this._cardData.index % 3 === 0) {
      this._card.classList.add('tour-card_big');
      this._card.querySelector('.tour-card__title').classList.add('tour-card__title_big');
      this._card.querySelector('.tour-card__duration').classList.add('tour-card__duration_big');
      this._card.querySelector('.tour-card__about').classList.add('tour-card__about_big');
    }

    return this._card;

  }

}
