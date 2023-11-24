import { aboutPhotos } from "../scripts/utils/constants.js";
import { tourCards } from "../scripts/utils/constants.js";
import { feedbackCards } from "../scripts/utils/constants.js";
import { faqCards } from "../scripts/utils/constants.js";
import { teamCards } from "../scripts/utils/constants.js";

import { Carousel } from "../scripts/components/Carousel.js";
import { CarouselWithLoader } from "../scripts/components/CarouselWithLoader.js";

import { Section } from "../scripts/components/Section.js";

import { AboutPhotoCard } from "../scripts/components/AboutPhotoCard.js";
import { TourCard } from "../scripts/components/TourCard.js";
import { FeedbackCard } from "../scripts/components/FeedbackCard.js";
import { FaqCard } from "../scripts/components/FaqCard.js";
import { TeamCard } from "../scripts/components/TeamCard.js";

import { runLeadAnimation } from "../scripts/utils/animations.js";
import { hideHeader } from "../scripts/utils/animations.js";

import { feedbackSection } from "../scripts/utils/constants.js";
import { intersectionObserver } from "../scripts/utils/animations.js";

// import { preventUpdate } from "../scripts/utils/animations.js";+

import { DaysPicker } from "../scripts/components/DaysPicker.js";

//Инициализация классов секций и каруселей

const toursSection = new Section({containerSelector: '.tours__cards', data: tourCards, renderer: tourCardRenderer});
const faqSection = new Section({containerSelector: '.faq__cards', data: faqCards, renderer: faqCardRenderer});
const teamSection = new Section({containerSelector: '.team__grid', data: teamCards, renderer: teamCardRenderer});

const aboutPhotosCarousel = new CarouselWithLoader({carouselName: 'about', cardsData: aboutPhotos, cardRenderer: aboutPhotoCardRenderer});
const feedbackCarousel = new Carousel({carouselName: 'feedback', cardsData: feedbackCards, cardRenderer: feedbackCardRenderer});

// Функции-рендереры карточек
// сделано для сохранения слабой связи между классами

function aboutPhotoCardRenderer(cardData) {
  const aboutPhotoCard = new AboutPhotoCard({templateId: '#about-photo-card', cardData});
  return aboutPhotoCard.generateCard();
}

function tourCardRenderer(cardData) {
  const tourCard = new TourCard({templateId: '#tour-card', cardData});
  return tourCard.generateCard();
}

function feedbackCardRenderer(cardData) {
  const feedbackCard = new FeedbackCard({templateId: "#feedback-card", cardData });
  return feedbackCard.generateCard();
}

function faqCardRenderer(cardData) {
  const faqCard = new FaqCard({templateId: '#faq-card', cardData});
  return faqCard.generateCard();
}

function teamCardRenderer(cardData) {
  const teamCard = new TeamCard({templateId: '#team-card', cardData});
  return teamCard.generateCard();
}

// Добавление глобальных слушателей

document.addEventListener('scroll', () => {
  hideHeader();
})

// Активация слушателей классов

aboutPhotosCarousel.addEventListeners();
feedbackCarousel.addEventListeners();

// Активация лоадера фотокарусели

aboutPhotosCarousel.showLoader();

// Отрисовка карточек в секциях

toursSection.renderData();
faqSection.renderData();
teamSection.renderData();

// Включение анимации на первом экране

runLeadAnimation();

intersectionObserver.observe(feedbackSection);

const daysPicker = new DaysPicker({localDaysNames: ['сегодня', 'завтра'], weekStart: 'monday', container: '.lead-form__call-day'});

daysPicker.start();






