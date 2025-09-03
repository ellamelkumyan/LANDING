let calendar;

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

    // Calendar
    const { Calendar } = window.VanillaCalendarPro;
    const calendar_start = document.getElementById('calendar_start');
    const calendar_end = document.getElementById('calendar_end');

    const options = {
        inputMode: true,
        positionToInput: ['bottom'],
        styles: {
            calendar: 'vc form_calendar',
            content: 'vc-content form_calendar_content',
        },
        locale: 'ru-RU',
        type: 'multiple',
        selectedTheme: "alean",
        selectionDatesMode: 'multiple-ranged',
        displayMonthsCount: 2,
        enableDateToggle: false,
        themeAttrDetect: 'html[data-theme]',
        onClickDate(self) {
            const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

            const context = self.context

            context.inputElement.classList.add('is-value');

            const inputBox = context.inputElement.closest('.form_input');
            inputBox.classList.remove('form-error')

            context.inputElement.value = context.selectedDates.map((el, index) => {
                if(index > 0) self.hide();

                const date = new Date(el);

                const day = date.getDate();
                const monthName = months[date.getMonth()];
                const year = String(date.getFullYear()).slice(-2);

                return `${day} ${monthName}, ${year}`;
            }).join(' - ');

            const period = context.selectedDates.map(el => {
                const date = new Date(el);

                const day = String(date.getDate()).padStart(2, '0');
                const monthName = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                return `${day}.${monthName}.${year}`;
            })

            calendar_start.value = period[0]
            calendar_end.value = period[1] || period[0]
        },
        onUpdate(self) {},
    };

    calendar = new Calendar('#calendar', options);
    calendar.init();
    // END. Calendar
});

// ФОРМЫ
const documentBody = document.body
const form= document.getElementById('form');
const formFon= document.getElementById('form_fon');
const formDescription= document.getElementById('form_description');
const formTitle= document.getElementById('form_title');
const formContent= document.getElementById('form_content');
const formCalendarPlaceholder= document.getElementById('form_calendar_placeholder');
const formSelectServices= document.getElementById('form_select_services');
const formSend= document.getElementById('form-send');
const formInfoSend= document.getElementById('form_info_send');
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
    {selected: false, value: 'Завтрак (BB)', xml: "BB"},
    {selected: false, value: 'Полупансион(HB)', xml: "HB"},
    {selected: false, value: 'Полный пансион(FB)', xml: "FB"}
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

    if(start && selected !== -1) {
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
            isSelected(index, start, formInput, arrSelected);
            formInput.classList.remove('form-error');
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

    formSelectServices.classList.remove('form-error');

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
    formInfoSend.innerHTML = '';
    formContent.classList.remove('form_hidden');

    documentBody.classList.remove(position === 'left' ? 'right' : 'left');
    documentBody.classList.add('no-scroll', position);

    formFon.innerHTML = `<picture class="form_fon_picture">
            <source srcset="./assets/${img}.png" />
            <img class="form_fon_picture_img" src="./assets/${img}.png" alt="${description}" />
        </picture>`;
    formDescription.innerText = description;
    formTitle.innerText = type === 'CLIENTS' ? 'Стать клиентом' : 'Рассчитайте стоимость услуг';
    formCalendarPlaceholder.innerText = type === 'BUSINESS' ? 'Период проживания' : 'Период мероприятия';
    form.classList.remove(position === 'left' ? 'right' : 'left');
    form.classList.add('open', 'animation', position);

    // Указываем кнопке отправить, чот у нас за форма
    formSend.setAttribute('data-form', type);

    // Обновляем календарь (Сбрасываем)
    calendar.update();

    // Показываем нужные поля для формы, другие скрываем
    const elementArray = Array.from(formShow);
    elementArray.forEach(el => {
        if(el.dataset.show.indexOf(type) !== -1) {
            el.classList.remove('form_hidden');

            // Очищаем поля
            const elm = el.querySelector('input, textarea');
            if(elm) {
                elm.value = '';
                elm.checked = false;
                elm.classList.remove('is-value', 'is-show');
                el.classList.remove('form-error');
            }

            // Тип мероприятия - Подгружаем список
            if(el.hasAttribute('data-event')) {

                // Выставляем нужный тип мроприятия
                const indexType = allEvent.findIndex(el => el.xml === type);

                listEvent(indexType, true);
            }

            // Уровень комфорта - Подгружаем список
            if(el.hasAttribute('data-comfort')) listComfort();

            // Тип питания - Подгружаем список
            if(el.hasAttribute('data-comfort')) listPower();

            // Список услуг - Подгружаем список
            if(el.hasAttribute('data-services')) listServices();

            // Телефон - Применяем маску
            if(el.dataset.phone === 'false') {
                el.setAttribute('data-phone', 'true');

                IMask(
                  document.getElementById('phone-mask'),
                  {
                      mask: '+{7}(000)000-00-00'
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
                      mask: Number,
                      min: 1,
                      max: 100000000,
                      thousandsSeparator: ' '
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
    formSend.setAttribute('data-form', '');
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
        const inputBox = el.closest('.form_input');
        const checkboxBox = el.closest('.form_checkbox');

        if(inputBox) inputBox.classList.remove('form-error');
        if(checkboxBox) checkboxBox.classList.remove('form-error');

        if(el.value.length > 0) el.classList.add('is-value', 'is-show');
        else el.classList.remove('is-value', 'is-show');

        // Поиск услуг
        if(el.dataset.services) {
            listServices(el.value)
        }
    });
});


// Validate
function validateEmail(email) {
    const re = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
    return re.test(email);
}

function validateForm() {
    let error = false
    let json = {}

    const calendar_start = document.getElementById('calendar_start');
    const calendar_end = document.getElementById('calendar_end');

    const elementArray = Array.from(formShow);
    elementArray.forEach(el => {
        if(!el.classList.contains('form_hidden')) {
            const elm = el.querySelector('input, textarea');
            if(elm) {

                // (Имя, Название компании, Города ...) - Минимум 2 символа
                if((
                    elm.name === 'region' ||
                    elm.name === 'name' ||
                    elm.name === 'company' ||
                    elm.name === 'city1' ||
                    elm.name === 'city2'
                  ) && elm.value.length <= 1) {
                        el.classList.add('form-error');
                        error = true;
                }

                // Количество человек
                if(elm.name === 'people' && !(typeof elm.value === 'number' || elm.value > 0)) {
                    el.classList.add('form-error');
                    error = true;
                }

                // Бюджет
                /*
                if(elm.name === 'budget' && !(typeof elm.value === 'number' || elm.value > 0)) {
                    el.classList.add('form-error');
                    error = true;
                }
                */

                // Телефон
                if(elm.name === 'phone' && elm.value.length !== 16) {
                    el.classList.add('form-error');
                    error = true;
                }

                // E-mail
                if(elm.name === 'email' && !validateEmail(elm.value)) {
                    el.classList.add('form-error');
                    error = true;
                }

                // Calendar
                if(elm.name === 'calendar' && !elm.value) {
                    el.classList.add('form-error');
                    error = true;
                }

                // Типы услуг
                if(elm.name === 'services' && !allServices.find(el => el.selected === true)) {
                    el.classList.add('form-error');
                    error = true;
                }

                // Типы мероприятия
                if(elm.name === 'event' && !allEvent.find(el => el.selected === true)) {
                    el.classList.add('form-error');
                    error = true;
                }

                // Уровень комфорта
                if(elm.name === 'comfort' && !allComfort.find(el => el.selected === true)) {
                    el.classList.add('form-error');
                    error = true;
                }

                // Тип питания
                /*
                if(elm.name === 'power' && !allPower.find(el => el.selected === true)) {
                    el.classList.add('form-error');
                    error = true;
                }
                */

                // Checkbox
                if(elm.name === 'checkbox' && !elm.checked) {
                    el.classList.add('form-error');
                    error = true;
                }


                // ------ json
                if(
                  elm.name === 'region' ||
                  elm.name === 'name' ||
                  elm.name === 'city1' ||
                  elm.name === 'city2' ||
                  elm.name === 'company' ||
                  elm.name === 'phone' ||
                  elm.name === 'email' ||
                  elm.name === 'comment'
                ) {
                    json[elm.name] = elm.value;
                }

                if(
                  elm.name === 'budget' ||
                  elm.name === 'people'
                ) {
                    json[elm.name] = elm.value.replace(/[^0-9]/g, "");
                }

                if((elm.name === 'calendar')) {
                    json['calendar_start'] = calendar_start.value;
                    json['calendar_end'] = calendar_end.value;
                }

                if((elm.name === 'services')) {
                    const arrServices= allServices.filter(el => el.selected === true);
                    const services= arrServices.map(el => el.value);

                    json[elm.name] = services || [];
                }

                if((elm.name === 'event')) {
                    const arrServices= allEvent.filter(el => el.selected === true);
                    const services = arrServices.length ? arrServices[0].xml : '';

                    json[elm.name] = services || '';
                }

                if((elm.name === 'comfort')) {
                    const arrComfort= allComfort.filter(el => el.selected === true);
                    const comfort = arrComfort.length ? arrComfort[0].xml : '';

                    json[elm.name] = comfort || '';
                }

                if((elm.name === 'power')) {
                    const arrPower= allPower.filter(el => el.selected === true);
                    const power = arrPower.length ? arrPower[0].xml : '';

                    json[elm.name] = power || '';
                }

                if((elm.name === 'checkbox')) {
                    json[elm.name] = elm.checked;
                }

            }
        }
    });

    return {error, json};
}

function sendInfo(error = false, hidden = true) {
    if(hidden) formContent.classList.add('form_hidden');

    formInfoSend.innerHTML = `<div class="form_content_box_send">
        <div class="${error ? 'form_info_send form_info_send_error' : 'form_info_send'}">
            <div class="form_info_send_left"><span><i></i></span></div>
            <div>
                <div class="form_info_send_title">${error ? 'Что-то пошло не так' : 'Ваша заявка успешно отправлена'}</div>
                <div class="form_info_send_description">${error ? 'Попробуйте повторить попытку через некоторое время' : 'В ближайшее время наш менеджер свяжется с Вами.'}</div>
            </div>
        </div>
    </div>`;
}

// Отправка данных
function sendJSON(event) {
    const isForm = event.dataset.form
    let dataToSend = {}

    // Данные лендинга
    const UF_APPEAL_SOURCE = 'LP'
    const UF_APPEAL_UTM = ''
    const UF_UTM = ''
    const UF_LETTER_NAME = 'ЛЕНДИНГ'

    // Проверяем на ошибки и получаем данные из формы
    const obj = validateForm();

    if (!obj.error) {
        const json = obj.json

        if (isForm === 'CLIENTS') {

            // ЛЕНДИНГ. CRM-форма. Контакты - [CLIENTS]
            dataToSend = {
                NAME: json.name,                  // Имя
                PHONE: json.phone,                // Телефон
                EMAIL: json.email,                // Email
                TITLE: json.company,              // Наименование компании
                UF_MICE_COMMENT: json.comment,    // Пожелания
                UF_OBRABOTKA_PERS: json.checkbox, // Согласие на обработку
                UF_APPEAL_SOURCE,                 // Источник
                UF_APPEAL_UTM,                    // UTM-метки
                UF_LETTER_NAME                    // Название формы → заголовок письма
            };
        }

        if (isForm === 'BUSINESS') {

            // ЛЕНДИНГ. CRM-форма. БизнесТревел - [BUSINESS]
            dataToSend = {
                DATE_START: json.calendar_start,        // Дата начала поездки/проживания
                DATE_END: json.calendar_end,            // Дата окончания поездки/проживания
                UF_CARRIER_CITY_DEPARTURE: json.city1,  // Город отправления
                UF_CARRIER_CITY_STAY: json.city2,       // Город прибытия
                ORDER_TYPE: json.services,              // Типы услуг
                NAME: json.name,                        // Имя
                PHONE: json.phone,                      // Телефон
                EMAIL: json.email,                      // Email
                UF_MICE_COMMENT: json.comment,          // Пожелания
                UF_OBRABOTKA_PERS: json.checkbox,       // Согласие на обработку
                UF_APPEAL_SOURCE,                       // Источник
                UF_UTM,                                 // UTM-метки
                UF_LETTER_NAME,                         // Название формы →  заголовок письма
                UF_APPEAL_TYPE: 'BUSINESS_TRIP',        // Тип мероприятия
            };
        }

        if (isForm === 'MICE' || isForm === 'SPORT' || isForm === 'SANATORY') {

            // ЛЕНДИНГ. CRM-форма.MICE -  [MICE, SPORT, SANATORY]
            dataToSend = {
                UF_MICE_CITY: json.region,               // Регион проведения
                UF_ORDER_RATING: json.comfort,           // Уровень комфорта
                UF_ACCOMMODATION_EAT: json.power,        // Тип питания
                UF_MICE_DATE_START: json.calendar_start, // Начало мероприятия
                UF_MICE_DATET_END: json.calendar_end,    // Окончание мероприятия
                UF_NUMBER_ADL: json.people,              // Количество взрослых
                UF_NUMBER_CHL: 0,                        // Количество детей
                UF_MICE_SOSTAV: '',                      // Возраст детей
                UF_MICE_BUDJET: json.budget,             // Бюджет на 1 человека
                TITLE: json.company,                     // Наименование компании
                NAME: json.name,                         // Имя
                PHONE: json.phone,                       // Телефон
                EMAIL: json.email,                       // Email
                UF_MICE_COMMENT: json.comment,           // Пожелания
                UF_OBRABOTKA_PERS: json.checkbox,        // Согласие на обработку
                UF_APPEAL_SOURCE,                        // Источник
                UF_UTM,                                  // UTM-метки
                UF_LETTER_NAME,                          // Название формы →  заголовок письма
                UF_APPEAL_TYPE: json.event,              // Тип мероприятия
            };
        }


        console.log(dataToSend);
    }



    // Сообщение об успешной или не успешной отправке
    /*
        Удалить после подключение fetch (api)
    */
    sendInfo(obj.error, false);

/*

    fetch('/api/users', { // Замените '/api/users' на ваш адрес сервера
        method: 'POST', // Или другой метод, например, PUT
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataToSend) // Преобразуем объект в строку JSON
    })
      .then(response => response.json()) // Обрабатываем ответ сервера (парсим JSON)
      .then(data => {
          sendInfo(true);
          console.log('Успешно:', data)
      })
      .catch(error => {
          sendInfo(false);
          console.error('Ошибка:', error)
      });

*/

}

