import {useContext} from 'react'
import { AuthContext } from '../contexts/AuthContext'

export default function DashBoard(){
    const { user } = useContext(AuthContext)
    
    return (
        <h1>DashBoard: {user?.email}</h1>
    )
}