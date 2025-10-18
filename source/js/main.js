/* eslint-disable no-invalid-this */
import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  const fileInputs = document.querySelectorAll('.form__file input[type="file"]');
  const rangeInput = document.getElementById('progress');
  const progressValue = document.getElementById('progress-value');
  const registrationForm = document.getElementById('registration-form');

  registrationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // const formData = new FormData(this);
    // const data = Object.fromEntries(formData);
    // console.log('Данные формы:', data);
    // console.log('JSON данные:', JSON.stringify(data));
  });

  rangeInput.addEventListener('input', function () {
    progressValue.textContent = this.value;
  });

  fileInputs.forEach((input) => {
    input.addEventListener('change', function () {
      const label = this.closest('.form__file');
      const span = label.querySelector('span');

      if (this.files && this.files[0]) {
        span.textContent = this.files[0].name;
      } else {
        span.textContent = 'Прикрепить файл';
      }
    });
  });

  // скролл секций

  const sections = document.querySelectorAll('.scroll-section');
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // блок с точками

  const regItems = document.querySelectorAll('.registration__item');
  const count = regItems.length * 7;

  const regList = document.querySelector('.registration__list');
  const pointsBlock = document.createElement('div');
  pointsBlock.className = 'dots';

  for (let i = 1; i <= count; i++) {
    const div = document.createElement('div');
    div.className = 'dots__item';
    pointsBlock.appendChild(div);
  }

  regList.appendChild(pointsBlock);

  // навигация

  const navList = document.querySelector('.nav__list');
  const toggle = document.querySelector('.nav__toggle');
  toggle.addEventListener('click', (e) => {
    e.currentTarget.classList.toggle('active');
    navList.classList.toggle('active');
  });

  // Select

  // eslint-disable-next-line no-new, no-undef
  new TomSelect('#system', {
    create: true,
    sortField: 'text',
  });

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
