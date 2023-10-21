/* URL */
const URL = 'https://take-home-test-api.nutech-integrasi.app';
const axios = require('axios');

const register = async (data) => {
    const regis = await fetch(`${URL}/registration`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return await regis.json();
}

const login = async (data) => {
    const sign = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return await sign.json();
}

const getProfile = async (token) => {
    const profile = await fetch(`${URL}/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    });
    return await profile.json()
}

const udpateProfile = async (token, data) => {
    const profileUpdate = await fetch(`${URL}/profile/update`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return await profileUpdate.json()
}

const updateImage = async (token, formData) => {
    const profileImage = await axios.put(`${URL}/profile/image`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            ...formData.getHeaders(),
        },
    })
    return await profileImage;
}

const getSaldo = async (token) => {
    const saldo = await fetch(`${URL}/balance`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    });
    return await saldo.json()
}

const getServices = async (token) => {
    const services = await fetch(`${URL}/services`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    });
    return await services.json()
}

const getBanner = async (token) => {
    const banner = await fetch(`${URL}/banner`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    });
    return await banner.json()
}

const historyTransaction = async (token) => {
    const history = await fetch(`${URL}/transaction/history`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
    })
    return await history.json()
}

const topup = async (token, data) => {
    const tp = await fetch(`${URL}/topup`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return await tp.json()
}

const addTransaction = async (token, data) => {
    const addTrans = await fetch(`${URL}/transaction`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    return await addTrans.json()
}

module.exports = { register, login, getProfile, udpateProfile, updateImage, getSaldo, getServices, getBanner, historyTransaction, topup, addTransaction }