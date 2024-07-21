import { initialCards } from "./cards";
import { createCard, deleteCard, sendLike } from '../components/card';
import { closePopup, openPopup } from '../components/modal';
import '../pages/index.css';

const placeListElement = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editFormElement = document.forms['edit-profile'];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.description;

const createFormElement = document.forms['new-place'];
const cardNameInput = createFormElement.elements['place-name'];
const cardUrlInput = createFormElement.elements.link;

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

initialCards.forEach(({name, link}) => placeListElement.append(createCard(name, link, deleteCard, sendLike)));

profileEditButton.addEventListener('click', () => {
    openPopup('.popup_type_edit')
})

profileAddButton.addEventListener('click', () => {
    openPopup('.popup_type_new-card')
})

function handleFormSubmit(e) {
    e.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopup(e);
}

editFormElement.addEventListener('submit', handleFormSubmit)

function createNewCard(e) {
    e.preventDefault();
    const cardName = cardNameInput.value;
    const link = cardUrlInput.value;
    placeListElement.prepend(createCard(cardName, link, deleteCard, sendLike));
    createFormElement.reset();
    closePopup(e);
}

createFormElement.addEventListener('submit', createNewCard)