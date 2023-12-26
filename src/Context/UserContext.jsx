import { createContext, useState } from 'react'
import axios from 'axios'
export const UserContext = createContext()


export default function UserContextProvider(props) {
    const [token, setToken] = useState(localStorage.getItem('token'))

    async function sendDataToSignUp(values) {
        const { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
        return data
    }
    async function sendDataToSignIn(values) {
        const { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values)

        return data
    }

    function logOut(values) {
        localStorage.removeItem('token')
        setToken(null)
    }

    return <UserContext.Provider value={{ sendDataToSignUp, sendDataToSignIn, token, setToken, logOut }} >
        {props.children}
    </UserContext.Provider>
}