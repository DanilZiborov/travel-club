export function runLeadAnimation() {

  const welcomeOverlay = document.querySelector('.welcome__overlay');

  function showLeadElements(element, delay) {
    setTimeout(() => {
      element.classList.add('animated')
    }, delay);
  }


  let delay = 1000;
  Array.from(welcomeOverlay.children).forEach(element => {
    showLeadElements(element, delay);
    delay += 500;
  })
}

export function hideHeader() {
  const header = document.querySelector('.header');
  const welcome = document.querySelector('.welcome');

  if (window.scrollY > welcome.scrollHeight - header.scrollHeight) {
    header.style.transform = `translateY(-${header.scrollHeight}px`;
  }
  else {
    header.style.transform = `none`;
  }
}

function runFeedbackAnimation(entries, observer) {

  const entry = entries[0];
  const target = entry.target;

  const firstContainerText = Array.from(target.querySelector('.feedback__text-wrapper_type_first').children);
  const secondContainerText = Array.from(target.querySelector('.feedback__text-wrapper_type_second').children);
  const animatedNumber = target.querySelector('#js-number-of-tourists');

  if (entry.isIntersecting) {
    console.log('обсёрвер начал работу!');
    let delay = 1000;
    firstContainerText.forEach((el, index) => {
      setTimeout(() => {
        console.log(el);
        (index + 1) % 2 === 0 ? el.classList.add('animation_type_top-bottom') : el.classList.add('animation_type_left-right');
        if (index === 2) animatedNumber.classList.add('animation_type_scale-text');
      }, delay);
      delay += 500;
    })

    setTimeout(() => {
      secondContainerText.forEach((el) => {
        setTimeout(() => {
          el.classList.add('animation_type_popup-and-move');
        }, delay);
        delay += 500;
      })
    }, 1000);

  }
}

export const intersectionObserver = new IntersectionObserver(runFeedbackAnimation, { threshold: 0.3 });




