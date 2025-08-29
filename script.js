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
        const homeHeight = homeSection.offsetHeight;

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
const formServices= document.getElementById('form_services');
const formFon= document.getElementById('form_fon');
const formDescription= document.getElementById('form_description');
const formTitle= document.getElementById('form_title');
const formShow= document.querySelectorAll('.form_show');
const formElements= document.querySelectorAll('form input, form select, form textarea');

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
    formServices.classList.remove(position === 'left' ? 'right' : 'left');
    formServices.classList.add('open', 'animation', position);

    // Показываем нужные поля для формы, другие скрываем
    const elementArray = Array.from(formShow);
    elementArray.forEach(el => {
        if(el.dataset.show.indexOf(type) !== -1) el.classList.remove('form_hidden');
        else el.classList.add('form_hidden');
    })
}

// Закрытие формы
function closedForm(event) {
    documentBody.classList.remove('no-scroll');

    formServices.classList.remove('open');
}

// placeholder - Смотрим что поле заполнено
formElements.forEach(el => {
    el.addEventListener('input', () => {
        if(el.value.length > 0) el.classList.add('is-value');
        else el.classList.remove('is-value');
    });
});
