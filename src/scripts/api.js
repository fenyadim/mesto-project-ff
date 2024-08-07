const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-20',
    headers: {
        authorization: 'bd5b6b1d-41bf-4071-bb02-fd34c13ba292',
        'Content-Type': 'application/json'
    }
}

const responseHandler = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

export const getInitialCardsApi = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(responseHandler)
}

export const getUserInfoApi = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(responseHandler)
}

export const patchEditUserInfoApi = (data) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(responseHandler)
}

export const postCreateNewCardApi = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(responseHandler)
}

export const patchUpdateAvatarApi = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(data)
    }).then(responseHandler)
}

export const putAddLikeApi = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: config.headers
    }).then(responseHandler)
}

export const deleteLikeApi = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(responseHandler)
}

export const deleteCardApi = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: config.headers
    }).then(responseHandler)
}