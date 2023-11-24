import { Card } from "./Card.js";

export class FaqCard extends Card {
  constructor({templateId, cardData}) {
    super({templateId, cardData});
  }

  _showFaqText() {

    if(this._text.clientHeight === 0) {
      console.log(this._text.scrollHeight);
      this._text.style.height = `${this._text.scrollHeight}px`;
      this._text.classList.add('faq__text_active');
      this._button.style.transform = 'rotate(45deg)';
    }
    else if (this._text.clientHeight === this._text.scrollHeight) {
      this._text.style.height = '0';
      this._text.classList.remove('faq__text_active');
      this._button.style.transform = 'rotate(0)';
    }

  }

  _addEventListeners() {
    this._button = this._card.querySelector('.faq-card__button');
    this._text = this._card.querySelector('.faq-card__text');

    this._button.addEventListener('click', () => {
      this._showFaqText();
    });


  }



  generateCard() {
    super.generateCard();

    this._card = this._cardTemplate.querySelector('.faq-card');

    this._card.querySelector('.faq-card__title').textContent = this._cardData.title;
    this._card.querySelector('.faq-card__text').textContent = this._cardData.text;

    // тут можно немного кастомизировать стили карточек
    // if (this._cardData.index % 2 === 0) {
    //   this._card.style.backgroundColor = 'orange';
    // }

    this._addEventListeners();

    return this._card;

  }

}
