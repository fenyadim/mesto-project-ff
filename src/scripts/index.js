import { createCard, deleteCard, sendLike } from '../components/card';
import { closePopup, openPopup } from '../components/modal';
import '../pages/index.css';
import { clearValidation, enableValidation } from "./validation";
import { postCreateNewCard, patchEditUserInfo, getInitialCards, getUserInfo, patchUpdateAvatar } from "./api";

const placeListElement = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const popupEditWrapper = document.querySelector(".popup_type_edit");
const popupNewCardWrapper = document.querySelector(".popup_type_new-card");
const popupImageWrapper = document.querySelector(".popup_type_image");
const popupUpdateAvatar = document.querySelector(".popup_type_update_avatar");
const popupImage = popupImageWrapper.querySelector(".popup__image");
const popupCaption = popupImageWrapper.querySelector(".popup__caption");

const updateAvatarFormElement = document.forms["update-avatar"];
const updateAvatarInput = updateAvatarFormElement.elements["update-avatar-input"];
const updateAvatarButton = updateAvatarFormElement.elements.button;

const editFormElement = document.forms["edit-profile"];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.description;
const editFormButton = editFormElement.querySelector('.popup__button');

const createFormElement = document.forms["new-place"];
const cardNameInput = createFormElement.elements["place-name"];
const cardUrlInput = createFormElement.elements.link;
const createFormButton = createFormElement.querySelector('.popup__button');

export function openImagePopup(name, link) {
    openPopup(popupImageWrapper);
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
}

Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, user]) => {
        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent;

        cards.forEach(({name, link, likes, owner, _id}) => {
            if (owner._id === user._id) {
                placeListElement.append(
                    createCard(_id, name, link, likes, deleteCard, sendLike, openImagePopup, user._id)
                )
            } else {
                placeListElement.append(
                    createCard(_id, name, link, likes, undefined, sendLike, openImagePopup, user._id)
                )
            }
        })

    });

profileEditButton.addEventListener("click", () => {
    editFormButton.textContent = "Сохранить";
    openPopup(popupEditWrapper);
});

profileAddButton.addEventListener("click", () => {
    createFormButton.textContent = "Сохранить";
    openPopup(popupNewCardWrapper);
});

profileImage.addEventListener("click", () => {
    updateAvatarButton.textContent = "Сохранить";
    openPopup(popupUpdateAvatar);
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
    clearValidation(editFormElement, settings);
    editFormButton.textContent = "Сохранение...";
    patchEditUserInfo({
        name: nameInput.value,
        about: jobInput.value
    }).then(data => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(popupEditWrapper);
    })
}

editFormElement.addEventListener("submit", editFormSubmit);

function createNewCardSubmit(e) {
    e.preventDefault();
    createFormButton.textContent = "Сохранение...";
    postCreateNewCard({
        name: cardNameInput.value,
        link: cardUrlInput.value
    }).then(data => {
        placeListElement.prepend(
            createCard(data._id, data.name, data.link, data.likes, deleteCard, sendLike, openImagePopup)
        );
        createFormElement.reset();
        clearValidation(createFormElement, settings);
        closePopup(popupNewCardWrapper);
    });
}

createFormElement.addEventListener("submit", createNewCardSubmit);

function updateAvatarSubmit(e) {
    e.preventDefault();
    clearValidation(createFormElement, settings);
    updateAvatarButton.textContent = "Сохранение...";
    patchUpdateAvatar({
        avatar: updateAvatarInput.value
    }).then(data => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closePopup(popupUpdateAvatar);
    })
}

updateAvatarFormElement.addEventListener("submit", updateAvatarSubmit);