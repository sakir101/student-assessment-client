import { authKey } from "@/constant/storageKey"
import { decodedToken } from "@/utils/jwt"
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage"

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken as string)
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey)

    if (authToken) {
        const decodeData = decodedToken(authToken)
        return decodeData
    }
    else {
        return ""
    }
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey)

    return !!authToken
}

export const removeUserInfo = (key: string) => {
    return localStorage.removeItem(key)
}