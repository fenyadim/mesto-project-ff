import { createCard } from '../components/card';
import { closePopup, openPopup } from '../components/modal';
import '../pages/index.css';
import { clearValidation, enableValidation } from "./validation";
import {
    deleteCardApi,
    getInitialCardsApi,
    getUserInfoApi,
    patchEditUserInfoApi,
    patchUpdateAvatarApi,
    postCreateNewCardApi
} from "./api";

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
const popupDeleteWrapper = document.querySelector(".popup_type_delete");
const popupImage = popupImageWrapper.querySelector(".popup__image");
const popupCaption = popupImageWrapper.querySelector(".popup__caption");

const popupFormDelete = popupDeleteWrapper.querySelector(".popup__form");

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

function onClickDeleteButton(e, id, buttonElement) {
    e.preventDefault();
    deleteCardApi(id).then(() => {
        buttonElement.parentElement.remove()
        closePopup(popupDeleteWrapper);
    }).catch(e => console.log(e));
}

function deleteCardEvent(id, deleteButtonElement) {
    openPopup(popupDeleteWrapper);

    popupFormDelete.onsubmit = (e) => {
        onClickDeleteButton(e, id, deleteButtonElement);
    }
}

Promise.all([getInitialCardsApi(), getUserInfoApi()])
    .then(([cards, user]) => {
        profileName.textContent = user.name;
        profileDescription.textContent = user.about;
        profileImage.style.backgroundImage = `url(${user.avatar})`;

        cards.forEach(({name, link, likes, owner, _id}) => {
            placeListElement.append(
                createCard({
                    id: _id,
                    name,
                    link,
                    likes,
                    funcDelete: deleteCardEvent,
                    openFunc: openImagePopup,
                    userId: user._id,
                    ownerId: owner._id
                })
            )
        })

    }).catch(e => console.log(e));

profileEditButton.addEventListener("click", () => {
    editFormButton.textContent = "Сохранить";
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(editFormElement, settings);
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
    editFormButton.textContent = "Сохранение...";
    patchEditUserInfoApi({
        name: nameInput.value,
        about: jobInput.value
    }).then(data => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(popupEditWrapper);
    }).catch(e => console.log(e));
}

editFormElement.addEventListener("submit", editFormSubmit);

function createNewCardSubmit(e) {
    e.preventDefault();
    createFormButton.textContent = "Сохранение...";
    postCreateNewCardApi({
        name: cardNameInput.value,
        link: cardUrlInput.value
    }).then(data => {
        placeListElement.prepend(
            createCard({
                id: data._id,
                name: data.name,
                link: data.link,
                likes: data.likes,
                funcDelete: deleteCardEvent,
                openFunc: openImagePopup,
            })
        );
        createFormElement.reset();
        clearValidation(createFormElement, settings);
        closePopup(popupNewCardWrapper);
    }).catch(e => console.log(e));
}

createFormElement.addEventListener("submit", createNewCardSubmit);

function updateAvatarSubmit(e) {
    e.preventDefault();
    clearValidation(createFormElement, settings);
    updateAvatarButton.textContent = "Сохранение...";
    patchUpdateAvatarApi({
        avatar: updateAvatarInput.value
    }).then(data => {
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        closePopup(popupUpdateAvatar);
    }).catch(e => console.log(e));
}

updateAvatarFormElement.addEventListener("submit", updateAvatarSubmit);
