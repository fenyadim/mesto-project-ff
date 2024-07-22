const popupImageWrapper = document.querySelector('.popup_type_image');
const popupImage = popupImageWrapper.querySelector('.popup__image');
const popupCaption = popupImageWrapper.querySelector('.popup__caption');

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
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
}

export function openPopup(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', closePopupByButton);
    element.addEventListener('click', closePopupByOverlay);
    document.addEventListener('keydown', closePopupByEsc);
}

export function openImagePopup(element, link, name) {
    element.addEventListener('click', () => {
        openPopup(popupImageWrapper);
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name
    });
}
