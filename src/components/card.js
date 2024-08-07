import { deleteLikeApi, putAddLikeApi } from "../scripts/api";

const cardTemplate = document.querySelector("#card-template").content;

function sendLike(e, id, likeCountElement) {
    if (!e.target.classList.contains("card__like-button_is-active")) {
        putAddLikeApi(id).then(() => {
            e.target.classList.add("card__like-button_is-active");
            likeCountElement.textContent = Number(likeCountElement.textContent) + 1;
        }).catch(e => console.log(e));
    } else {
        deleteLikeApi(id).then(() => {
            e.target.classList.remove("card__like-button_is-active");
            likeCountElement.textContent = Number(likeCountElement.textContent) - 1;
        }).catch(e => console.log(e));
    }
}


export function createCard(props) {
    const {id, name, link, likes, funcDelete, openFunc, userId, ownerId} = props

    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const likeCount = cardElement.querySelector(".card__like-count");
    const cardDeleteButton = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector(".card__like-button");

    cardImage.src = link;
    cardImage.alt = name;

    cardElement.querySelector(".card__title").textContent = name;

    likeCount.textContent = likes.length;

    cardLikeButton.addEventListener("click", (e) => sendLike(e, id, likeCount));

    if (userId === ownerId) {
        cardDeleteButton.addEventListener('click', () => {
            funcDelete(id, cardDeleteButton);
        })
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