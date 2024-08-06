import { closePopup, openPopup } from "./modal";

const cardTemplate = document.querySelector("#card-template").content;
const popupDeleteWrapper = document.querySelector(".popup_type_delete");
const popupFormDelete = popupDeleteWrapper.querySelector(".popup__form");

export function createCard(id, name, link, likes, funcDelete, funcLike, openFunc, userId = '') {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const likeCount = cardElement.querySelector(".card__like-count");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = link;
    cardImage.alt = name;

    cardElement.querySelector(".card__title").textContent = name;

    likeCount.textContent = likes.length;

    cardLikeButton.addEventListener("click", (e) => funcLike(e, id, likeCount));

    if (funcDelete) {
        cardDeleteButton.addEventListener("click", (e) => funcDelete(e, id));
    } else {
        cardDeleteButton.remove();
    }

    if (userId) {
        if (likes.some((like) => like._id === userId)) {
            cardLikeButton.classList.add("card__like-button_is-active");
        }
    }

    cardImage.addEventListener("click", () => {
        openFunc(name, link);
    });

    return cardElement;
}

export function sendLike(e, id, likeCountElement) {
    if (!e.target.classList.contains("card__like-button_is-active")) {
        fetch(`https://nomoreparties.co/v1/wff-cohort-20/cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: 'bd5b6b1d-41bf-4071-bb02-fd34c13ba292',
            },
        }).then(res => {
            if (res.ok) {
                e.target.classList.add("card__like-button_is-active");
            }
        })
    } else {
        fetch(`https://nomoreparties.co/v1/wff-cohort-20/cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'bd5b6b1d-41bf-4071-bb02-fd34c13ba292',
            },
        }).then(res => {
            if (res.ok) {
                e.target.classList.remove("card__like-button_is-active");
            }
        })
    }
    likeCountElement.textContent = Number(likeCountElement.textContent) + (e.target.classList.contains("card__like-button_is-active") ? -1 : 1);
}

export function deleteCard(event, id) {
    openPopup(popupDeleteWrapper);

    function onClickDeleteButton(e) {
        e.preventDefault();
        fetch(`https://nomoreparties.co/v1/wff-cohort-20/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: 'bd5b6b1d-41bf-4071-bb02-fd34c13ba292',
            },
        })
        event.target.parentElement.remove();
        closePopup(popupDeleteWrapper);
    }

    popupFormDelete.addEventListener('submit', onClickDeleteButton);
}
