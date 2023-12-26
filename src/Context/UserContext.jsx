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



    return <UserContext.Provider value={{ sendDataToSignUp, sendDataToSignIn, token, setToken }} >
        {props.children}
    </UserContext.Provider>
}