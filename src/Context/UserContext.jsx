import { createContext } from 'react'
import axios from 'axios'
export const UserContext = createContext()


export default function UserContextProvider(props) {


    async function sendDataToSignUp(values) {
        const { data } = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
        return data
    }

    return <UserContext.Provider value={{ sendDataToSignUp }} >
        {props.children}
    </UserContext.Provider>
}