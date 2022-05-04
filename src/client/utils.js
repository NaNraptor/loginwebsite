export const signup = async (data) => {
    if (data.username === '' ||
        data.password === '' ||
        data.first_name === '' ||
        data.last_name === '' ||
        data.email === '' ||
        data.post_code === '' ||
        data.additional === '') {
        return false
    }

    const rawResponse = await fetch('/signup', {
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

export const logout = async () => {
    const rawResponse = await fetch('/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })

    return await rawResponse.json()
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
}

export const deleteAllCookies = () => {
    var cookies = document.cookie.split(';')

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[ i ]
        var eqPos = cookie.indexOf('=')
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
}

const deleteCookie = (name) => {
    document.cookie = name+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

export const isLoggedIn = () => {
    const username = getCookie('username')
    return username === '' || typeof username === 'undefined' ? false : true
}

export const getAccessRank = () => {
    const rank = getCookie('access_rank')
    return rank
}

export const isBanned = () => {
    const banned = getCookie('banned')
    return banned === 'true'
}

export const getBanReason = () => {
    const banned_reason = getCookie('banned_reason')
    return banned_reason
}

export const getLoggedInUser = () => {
    return getCookie('username')
}

export const is404 = () => {
    return getCookie('404') === 'true'
}

export const reset404 = () => {
    deleteCookie('404')
}