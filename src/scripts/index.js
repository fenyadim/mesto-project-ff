import { initialCards } from "./cards";
import { createCard, deleteCard, sendLike } from "../components/card";
import { closePopup, openPopup } from "../components/modal";
import "../pages/index.css";

const placeListElement = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupEditWrapper = document.querySelector(".popup_type_edit");
const popupNewCardWrapper = document.querySelector(".popup_type_new-card");
const popupImageWrapper = document.querySelector(".popup_type_image");
const popupImage = popupImageWrapper.querySelector(".popup__image");
const popupCaption = popupImageWrapper.querySelector(".popup__caption");

const editFormElement = document.forms["edit-profile"];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.description;

const createFormElement = document.forms["new-place"];
const cardNameInput = createFormElement.elements["place-name"];
const cardUrlInput = createFormElement.elements.link;

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

export function openImagePopup(name, link) {
    openPopup(popupImageWrapper);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
}

initialCards.forEach(({ name, link }) =>
    placeListElement.append(
        createCard(name, link, deleteCard, sendLike, openImagePopup)
    )
);

profileEditButton.addEventListener("click", () => {
    openPopup(popupEditWrapper);
});

profileAddButton.addEventListener("click", () => {
    openPopup(popupNewCardWrapper);
});

function editFormSubmit(e) {
    e.preventDefault();
    const name = nameInput.value;
    const job = jobInput.value;
    profileName.textContent = name;
    profileDescription.textContent = job;
    closePopup(popupEditWrapper);
}

editFormElement.addEventListener("submit", editFormSubmit);

function createNewCardSubmit(e) {
    e.preventDefault();
    const cardName = cardNameInput.value;
    const link = cardUrlInput.value;
    placeListElement.prepend(
        createCard(cardName, link, deleteCard, sendLike, openImagePopup)
    );
    createFormElement.reset();
    closePopup(popupNewCardWrapper);
}

createFormElement.addEventListener("submit", createNewCardSubmit);
