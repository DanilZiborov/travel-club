import { Card } from "./Card.js";

export class AboutPhotoCard extends Card {
  constructor({templateId, cardData}) {
    super({templateId, cardData})
  }

  generateCard() {
    super.generateCard();

    this._card = this._cardTemplate.querySelector('.about__photo-card');
    this._card.src = this._cardData.link;

    return this._card;

  }

}
