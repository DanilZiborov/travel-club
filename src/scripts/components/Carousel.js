export class Carousel {
  constructor({carouselName, cardsData, cardRenderer}) {
    this._carouselName = carouselName;
    this._firstContainer = document.querySelector(`.${this._carouselName}__first-container`);
    this._secondContainer = document.querySelector(`.${this._carouselName}__second-container`);

    this._switchersRight = document.querySelectorAll(`.${this._carouselName}__switcher_type_right`);
    this._switchersLeft = document.querySelectorAll(`.${this._carouselName}__switcher_type_left`);

    this._bulletTemplate = document.querySelector('#carousel-bullet-template').content;
    this._bulletWrapper = document.querySelector(`.${this._carouselName}__bullet-wrapper`);

    this._cardsData = cardsData;
    this._cardRenderer = cardRenderer;

    this._counter = 0;
  }

  _getCards() {
    this._cards = this._cardsData.map((el, index) => {
      el.index = index;
      return this._cardRenderer(el);
    })
  }

  _renderCarouselCard() {
    if (this._secondContainer.classList.contains('transparent')) {
      if (this._secondContainer.children[0]) {
        this._secondContainer.children[0].remove()
      };
      const card = this._cards[this._counter];
      this._secondContainer.append(card);
      this._firstContainer.classList.add('transparent');
      this._firstContainer.id = '';
      this._secondContainer.classList.remove('transparent');
      this._secondContainer.id = 'js-visible';

    }
    else {
      if (this._firstContainer.children[0]) {
        this._firstContainer.children[0].remove()
      };
      const card = this._cards[this._counter];
      this._firstContainer.append(card);
      this._secondContainer.classList.add('transparent');
      this._secondContainer.id = '';
      this._firstContainer.classList.remove('transparent');
      this._firstContainer.id = 'js-visible';

    }
  }

  _checkCounter() {
    if (this._counter >= this._cards.length) {
      this._counter = 0;
    }
    if (this._counter < 0) {
      this._counter = this._cards.length - 1;
    }
  }

  _turnCarouselRight() {
    this._counter++;
    this._checkCounter();
    this._renderCarouselCard();
  };

  _turnCarouselLeft() {
    this._counter = this._counter - 1;
    this._checkCounter();
    this._renderCarouselCard();
  };

  _renderCarouselBullets() {
    for(let i = 0; i < this._cards.length; i++) {
      const bullet = this._bulletTemplate.cloneNode(true).querySelector('#bullet-li');
      bullet.classList.add(`${this._carouselName}__bullet`);
      const bulletButton = bullet.querySelector('#bullet-button');
      bulletButton.classList.add(`${this._carouselName}__bullet-button`);
      bulletButton.id = i;
      if (bulletButton.id === '0'){
        bulletButton.classList.add(`${this._carouselName}__bullet-button_active`);
      }

      this._bulletWrapper.append(bullet);
    }
  }

  _changeCounterByBullet(evt) {
    const activeBullet = this._bulletWrapper.querySelector(`.${this._carouselName}__bullet-button_active`);
    activeBullet.classList.remove(`${this._carouselName}__bullet-button_active`);
    evt.target.classList.add(`${this._carouselName}__bullet-button_active`);
    this._counter = Number(evt.target.id);
  }

  _renderCardByBullet(evt) {
    if (evt.target.classList.contains(`${this._carouselName}__bullet-button_active`)) return;
    if (evt.target.classList.contains(`${this._carouselName}__bullet-button`)) {
      this._changeCounterByBullet(evt);
      this._renderCarouselCard();
    }
    else return;
  }

  _changeActiveBullet() {
    const carouselBullets = Array.from(this._bulletWrapper.querySelectorAll(`.${this._carouselName}__bullet-button`));
    const activeBullet = this._bulletWrapper.querySelector(`.${this._carouselName}__bullet-button_active`);
    activeBullet.classList.remove(`${this._carouselName}__bullet-button_active`);
    carouselBullets.forEach(item => {
      if (Number(item.id) === this._counter) {
        item.classList.add(`${this._carouselName}__bullet-button_active`);
      }
    })
  }

  _changeClientCounter() {
    if(!document.querySelector(`#js-${this._carouselName}-chosen`)) return;

    const chosen = document.querySelector(`#js-${this._carouselName}-chosen`);
    const all = document.querySelector(`#js-${this._carouselName}-all`);

    if(all.textContent === '') all.textContent = this._cardsData.length;

    chosen.textContent = this._counter + 1;
  }

  addEventListeners() {

    this._getCards();
    this._renderCarouselCard();
    this._renderCarouselBullets();
    this._changeClientCounter();


    this._switchersRight.forEach(el => {
      el.addEventListener('click', () => {
        this._turnCarouselRight();
        this._changeActiveBullet();
        this._changeClientCounter();
      });
    });

    this._switchersLeft.forEach(el => {
      el.addEventListener('click', () => {
        this._turnCarouselLeft();
        this._changeActiveBullet();
        this._changeClientCounter();
      });
    });

    this._bulletWrapper.addEventListener('click', evt => {
      this._renderCardByBullet(evt);
    });
  }

}







