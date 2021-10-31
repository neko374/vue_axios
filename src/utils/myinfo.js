import jwt from "jwt-decode"
export const getuser = () => {
    if (sessionStorage.getItem("mytoken")) {
        return jwt(sessionStorage.getItem("mytoken"))
    }
}