import { Card } from "./Card.js";

export class TeamCard extends Card {
  constructor({templateId, cardData}) {
    super({templateId, cardData});
  }

  generateCard() {
    super.generateCard();

    // console.log('nen');

    this._card = this._cardTemplate.querySelector('.team-card');

    this._card.querySelector('.team-card__photo').src = this._cardData.photo;
    this._card.querySelector('.team-card__name').textContent = this._cardData.name;
    this._card.querySelector('.team-card__about').textContent = this._cardData.about;
    this._card.querySelector('.team-card__text').textContent = this._cardData.text;

    // if((this._cardData.index + 1) % 3 === 0) {
    //   this._card.style.backgroundColor = '#ffb273';
    //   this._card.style.borderColor = '#bf7130';
    // }

    return this._card;

  }

}
