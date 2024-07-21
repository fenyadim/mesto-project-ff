const cardTemplate = document.querySelector('#card-template').content;

export function createCard(name, link, funcDelete, funcLike, openFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name

    cardElement.querySelector('.card__like-button').addEventListener('click', funcLike);

    cardElement.querySelector('.card__delete-button').addEventListener('click', funcDelete);

    openFunc(cardImage, link, name);

    return cardElement;
}

export function sendLike(e) {
    e.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(e) {
    e.target.parentElement.remove();
}