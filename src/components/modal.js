export function closePopup(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByButton(e) {
    if (e.target.classList.contains('popup__close')) {
        closePopup(e.target.closest('.popup'));
    }
}

function closePopupByOverlay(e) {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target)
    }
}

function closePopupByEsc(e) {
    const openedPopup = document.querySelector('.popup_is-opened');

    if (e.key === 'Escape') {
        closePopup(openedPopup);
    }
}

export function openPopup(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', closePopupByButton);
    element.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEsc);
}