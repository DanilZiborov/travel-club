export class Card {
  constructor({templateId, cardData}) {
    this._templateId = templateId;
    this._cardData = cardData;
  }

  generateCard() {
    this._cardTemplate = document.querySelector(this._templateId).content.cloneNode(true);

  }

}
