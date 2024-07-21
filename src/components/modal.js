export function closePopup() {
    const popup = document.querySelector('.popup_is-opened');
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopupByOverlay);
    document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByOverlay(e) {
    if (e.target.classList.contains('popup')) {
        closePopup()
    }
}

function closePopupByEsc(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
}

export function openPopup(selector) {
    const popup = document.querySelector(selector);
    const popupCloseButton = popup.querySelector('.popup__close');

    popup.classList.add('popup_is-opened');
    popupCloseButton.addEventListener('click', closePopup);
    popup.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEsc);
}