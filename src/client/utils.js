export const signup = async (data) => {
    if (data.username === '' ||
        data.password === '' ||
        data.first_name === '' ||
        data.second_name === '' ||
        data.email === '' ||
        data.post_code === '' ||
        data.additional === '') {
        return false
    }

    const rawResponse = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await rawResponse.json()
}

export const remember_me = async (data) => {
    const rawResponse = await fetch('/remember_me', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await rawResponse.json()
}

export const login = async (data) => {
    if (data.username === '' ||
        data.password === '') {
        return false
    }

    const rawResponse = await fetch('/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return await rawResponse.json()
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const isLoggedIn = () => {
    return getCookie('username') === '' ? false : true
}

export const getLoggedInUser = () => {
    return getCookie('username')
}