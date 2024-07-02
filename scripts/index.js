// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placeListElement = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(name, link, funcDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name

    cardElement.querySelector('.card__delete-button').addEventListener('click', funcDelete);

    return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(e) {
    e.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(({name, link}) => placeListElement.append(createCard(name, link, deleteCard)));
