import { initialCards } from "./cards";
import { createCard, deleteCard, sendLike } from '../components/card';
import { closePopup, openImagePopup, openPopup } from '../components/modal';
import '../pages/index.css';
import { clearValidation, enableValidation } from "./validation";

const placeListElement = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupEditWrapper = document.querySelector('.popup_type_edit');
const popupNewCardWrapper = document.querySelector('.popup_type_new-card');

const editFormElement = document.forms['edit-profile'];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.description;

const createFormElement = document.forms['new-place'];
const cardNameInput = createFormElement.elements['place-name'];
const cardUrlInput = createFormElement.elements.link;

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

initialCards.forEach(({
                          name,
                          link
                      }) => placeListElement.append(createCard(name, link, deleteCard, sendLike, openImagePopup)));

profileEditButton.addEventListener('click', () => {
    openPopup(popupEditWrapper)
})

profileAddButton.addEventListener('click', () => {
    openPopup(popupNewCardWrapper)
})

const settings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(settings);

function editFormSubmit(e) {
    e.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopup(popupEditWrapper);
    clearValidation(editFormElement, settings);
}

editFormElement.addEventListener('submit', editFormSubmit)

function createNewCardSubmit(e) {
    e.preventDefault();
    const cardName = cardNameInput.value;
    const link = cardUrlInput.value;
    placeListElement.prepend(createCard(cardName, link, deleteCard, sendLike, openImagePopup));
    createFormElement.reset();
    clearValidation(createFormElement, settings);
    closePopup(popupNewCardWrapper);
}

createFormElement.addEventListener('submit', createNewCardSubmit);
