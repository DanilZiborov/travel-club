import { Card } from "./Card.js";

export class FeedbackCard extends Card {
  constructor({templateId, cardData}) {
    super({templateId, cardData});
  }

  generateCard() {
    super.generateCard();

    this._card = this._cardTemplate.querySelector('.feedback__card');

    this._card.querySelector('.feedback__card-photo').src = this._cardData.photo;
    this._card.querySelector('.feedback__card-author-name').textContent = this._cardData.authorName;
    this._card.querySelector('.feedback__card-author-job').textContent = this._cardData.authorJob;
    this._card.querySelector('.feedback__card-text').textContent = `${this._cardData.text}`;

    // if (this._cardData.index % 2 === 0) {
    //   console.log(this._card);
    //   this._card.style.backgroundColor = 'green';};

    return this._card;

  }

}
