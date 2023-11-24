import { Carousel } from "./Carousel.js";

export class CarouselWithLoader extends Carousel {
  constructor({ carouselName, cardsData, cardRenderer }) {
    super({ carouselName, cardsData, cardRenderer });
    this._loader = document.querySelector('.about__photos-loader');
    this._loaderIcon = document.querySelector('.about__photos-loader-icon');
    this._clickEvent = new Event("click");
    this._loaderCounter = 0;
  }

  _runLoader() {
    const image = document.getElementById('js-visible').querySelector('.about__photo-card');

    image.onload = () => {
      this._switchersRight[0].dispatchEvent(this._clickEvent);
      this._loaderCounter++;
      this._runLoader();
    }

    if (this._loaderCounter >= this._cardsData.length) {
      this._loader.classList.add('disabled');
      this._loaderIcon.classList.add('disabled');
      this._switchersRight.forEach(el => el.classList.remove('transparent'));
      this._switchersLeft.forEach(el => el.classList.remove('transparent'));
      this._bulletWrapper.classList.remove('transparent');
      return;
    }
  }


  showLoader() {

    this._loader.style.backgroundImage = `url(${this._cardsData[0].link})`;
    this._runLoader = this._runLoader.bind(this);

    this._runLoader();

  }

}
