document.addEventListener('DOMContentLoaded', function() {
    const homeSection = document.getElementById('homeSection');
    const slider = document.getElementById('slider');
    const heart = document.getElementById('heart');
    const header = document.getElementById('header');
    const originalText = document.getElementById('originalText');
    const newText = document.getElementById('newText');

    let isScrolled = false;

    // Функция для обработки скролла
    function handleScroll() {
        const scrollPosition = window.scrollY;
        //const homeHeight = homeSection.offsetHeight;

        // Активируем анимацию при скролле более 50px
        if (scrollPosition > 50 && !isScrolled) {
            isScrolled = true;

            // Применяем изменения
            homeSection.classList.add('scrolled');
            slider.classList.add('hidden');
            heart.classList.add('scrolled');
            header.classList.add('scrolled');

            // Анимация текста - fadeout исходного
            originalText.style.opacity = '0';
            originalText.style.transform = 'translateX(-30px)';

            // Анимация текста - fadein нового с задержкой
            setTimeout(() => {
                newText.classList.add('visible');
            }, 400);
        }

        // Возвращаем обратно при скролле вверх
        else if (scrollPosition <= 50 && isScrolled) {
            isScrolled = false;

            // Убираем изменения
            homeSection.classList.remove('scrolled');
            slider.classList.remove('hidden');
            heart.classList.remove('scrolled');
            header.classList.remove('scrolled');

            // Анимация текста - fadeout нового
            newText.classList.remove('visible');

            // Анимация текста - fadein исходного с задержкой
            setTimeout(() => {
                originalText.style.opacity = '1';
                originalText.style.transform = 'translateX(0)';
            }, 400);
        }
    }

    // Слайдер
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;

        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            }
        });
    }

    // Запускаем автоматическую смену слайдов
    setInterval(nextSlide, 5000);

    // Инициализируем начальное состояние слайдов
    slides.forEach((slide, index) => {
        if (index === 1) {
            slide.classList.add('next');
        }
    });

    // Слушаем событие скролла
    window.addEventListener('scroll', handleScroll);
});


// ФОРМЫ
const documentBody = document.body
const form= document.getElementById('form');
const formFon= document.getElementById('form_fon');
const formDescription= document.getElementById('form_description');
const formTitle= document.getElementById('form_title');
const formShow= document.querySelectorAll('.form_show');
const formElements= document.querySelectorAll('form input, form select, form textarea');

// Тип мероприятия
const formEvent= document.getElementById('form_event');
let allEvent = [
    {selected: false, value: 'Прочее', xml: "MICE"},
    {selected: false, value: 'Экскурсионные программы', xml: "EXCURSION"},
    {selected: false, value: 'Спортивные сборы и соревнования', xml: "SPORT"},
    {selected: false, value: 'Размещение во время фестивалей и других мероприятий', xml: "MN"},
    {selected: false, value: 'Конференции и семинары', xml: "SEMINAR"},
    {selected: false, value: 'Тимбилдинги и корпоративные праздники', xml: "TIMBILDING"},
    {selected: false, value: 'Выездные свадебные мероприятия и дни рождения', xml: "SEMEINY"},
    {selected: false, value: 'Санаторно-курортные и оздоровительные мероприятия', xml: "SANATORY"}
]

// Уровень комфорта
const formComfort= document.getElementById('form_comfort');
let allComfort = [
    {selected: false, value: 'хостел', xml: "level1"},
    {selected: false, value: '2* и менее', xml: "level2"},
    {selected: false, value: '3*', xml: "level3"},
    {selected: false, value: '4*', xml: "level4"},
    {selected: false, value: '5*', xml: "level5"}
]

// Тип питания
const formPower = document.getElementById('form_power');
let allPower = [
    {selected: false, value: 'Завтрак (BB)', xml: ""},
    {selected: false, value: 'Полупансион(HB)', xml: ""},
    {selected: false, value: 'Полный пансион(FB)', xml: ""}
]

// Услуги
const formServices= document.getElementById('form_services');
const formServicesTag= document.getElementById('form_tag');
let allServices = [
    {selected: false, value: 'авиабилеты'},
    {selected: false, value: 'жд билеты'},
    {selected: false, value: 'отель'},
    {selected: false, value: 'аэроэкспресс'},
    {selected: false, value: 'автобусные билеты'},
    {selected: false, value: 'трансфер'},
    {selected: false, value: 'VIP зал'},
    {selected: false, value: 'страховка'}
]

// Выпадающий список
function isSelected(selected, start, formInput, arrSelected) {
    const input =  formInput.querySelector('input');
    const choice =  formInput.querySelector('.choice');

    choice.innerHTML = '';

    if(start) {
        input.classList.add('is-value');
        input.value = arrSelected[selected].value;
    }

    arrSelected.forEach((el, index) => {
        const active = selected === index
        arrSelected[index].selected = active

        const listItem = document.createElement('li');

        listItem.innerHTML = `<span class="${active ? 'active' : ''}">${el.value}</span>`;

        listItem.addEventListener('click', function () {
            input.value = el.value;
            input.classList.add('is-active', 'is-value');
            isSelected(index, start, formInput, arrSelected)
        });

        choice.appendChild(listItem);
    });
}

// Тип мероприятия
function listEvent(selected = -1, start = false) {
    isSelected(selected, start, formEvent, allEvent)
}

// Уровень комфорта
function listComfort(selected = -1, start = false) {
    isSelected(selected, start, formComfort, allComfort)
}

// Тип питания
function listPower(selected = -1, start = false) {
    isSelected(selected, start, formPower, allPower)
}


// Услуги
function listServices(search = '') {
    formServices.innerHTML = ''
    formServicesTag.innerHTML = ''

    allServices.forEach((el, index) => {

        const searchIndex = el.value.indexOf(search)

        // Выпадающий список с поиском
        if(searchIndex !== -1) {

            function textSearch(search, text) {
                const pattern = '('+search+')'
                const re = new RegExp(pattern, 'ig')
                return text !== '' ? search !== '' ? text.replace(re, '<mark>$1</mark>') : text : ''
            }

            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <span class="form_input_choice_selected ${el.selected ? 'selected' : ''}"><i></i></span>
            <span>${textSearch(search, el.value)}</span>`;

            listItem.addEventListener('click', function () {
                allServices[index].selected = !allServices[index].selected;
                listServices(search)
            });

            formServices.appendChild(listItem);
        }

        // Выбранные теги
        if(el.selected) {
            const listTags = document.createElement('span');
            listTags.classList.add('form_tag_service');

            const boxSpan = document.createElement('span');
            const delTag = document.createElement('i');
            delTag.classList.add('form_tag_service_del');

            delTag.addEventListener('click', function () {
                allServices[index].selected = false;
                listServices(search)
            });

            boxSpan.appendChild(delTag);
            listTags.innerHTML = `<span>${el.value}</span>`;
            listTags.appendChild(boxSpan);

            formServicesTag.appendChild(listTags);
        }
    });

    if(formServices.textContent.trim() === '') formServices.innerHTML = `<li><span>Ничего нет!</span></li>`
}

// Открытие формы
function openForm(description, type, img, position) {
    documentBody.classList.remove(position === 'left' ? 'right' : 'left');
    documentBody.classList.add('no-scroll', position);

    formFon.innerHTML = `<picture class="form_fon_picture">
            <source srcset="./assets/${img}.png" />
            <img class="form_fon_picture_img" src="./assets/${img}.png" alt="${description}" />
        </picture>`;
    formDescription.innerText = description;
    formTitle.innerText = type === 'services' ? 'Рассчитайте стоимость услуг' : 'Стать клиентом';
    form.classList.remove(position === 'left' ? 'right' : 'left');
    form.classList.add('open', 'animation', position);

    // Показываем нужные поля для формы, другие скрываем
    const elementArray = Array.from(formShow);
    elementArray.forEach(el => {
        if(el.dataset.show.indexOf(type) !== -1) {
            el.classList.remove('form_hidden');

            // Тип мероприятия - Подгружаем список
            if(el.hasAttribute('data-event')) listEvent(1, true);

            // Уровень комфорта - Подгружаем список
            if(el.hasAttribute('data-comfort')) listComfort();

            // Тип питания - Подгружаем список
            if(el.hasAttribute('data-comfort')) listPower();


            // Список услуг
            if(el.hasAttribute('data-services')) {

                // Очищаем поле поиска
                const elm = el.querySelector('input');
                elm.value = '';
                elm.classList.remove('is-value');

                // Подгружаем список
                listServices();
            }

            // Телефон - Применяем маску
            if(el.dataset.phone === 'false') {
                el.setAttribute('data-phone', 'true');

                IMask(
                  document.getElementById('phone-mask'),
                  {
                      mask: '+{7} 000 000 00 00'
                  }
                )
            }

            // Количество человек - Применяем маску
            if(el.dataset.people === 'false') {
                el.setAttribute('data-people', 'true');

                IMask(
                  document.getElementById('people-mask'),
                  {
                      mask: Number,
                      min: 1,
                      max: 100000,
                      thousandsSeparator: ' '
                  }
                )
            }

            // Количество человек - Применяем маску
            if(el.dataset.budget === 'false') {
                el.setAttribute('data-budget', 'true');

                IMask(
                  document.getElementById('budget-mask'),
                  {
                      mask: 'num ₽',
                      blocks: {
                          num: {
                              mask: Number,
                              thousandsSeparator: ' '
                          }
                      },
                  }
                )
            }
        }
        else el.classList.add('form_hidden');
    });
}

// Закрытие формы
function closedForm() {
    documentBody.classList.remove('no-scroll');
    form.classList.remove('open');
}


formElements.forEach(el => {

    document.addEventListener('click', (event) => {

        // Типы услуг - открыие списка
        if(el.dataset.services) {
            if (el.contains(event.target) && !el.classList.contains('is-show')) el.classList.add('is-show');
            else el.classList.remove('is-show');
        }

        // (Тип мероприятия | Уровень комфорта | Тип питания) - открыие списка
        if(el.dataset.event || el.dataset.comfort || el.dataset.power) {
            if (el.classList.contains('is-active')) el.classList.remove('is-active');
            else if (el.contains(event.target) && !el.classList.contains('is-show')) el.classList.add('is-show');
            else el.classList.remove('is-show');
        }
    });

    // placeholder - Смотрим что поле заполнено
    el.addEventListener('input', () => {
        if(el.value.length > 0) el.classList.add('is-value', 'is-show');
        else el.classList.remove('is-value');

        // Поиск услуг
        if(el.dataset.services) {
            listServices(el.value)
        }
    });
});

