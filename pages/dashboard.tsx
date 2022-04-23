import { destroyCookie } from 'nookies'
import {useContext, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { AuthTokenError } from '../errors/AuthTokenError'
import { setUpApiCliente } from '../services/api'
import { api } from '../services/apiCliente'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function DashBoard(){
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me').then(response => {
            console.log(response);
        }).then(response => console.log(response))
          .catch(err => console.log(err))
    }, [])
    
    return (
        <h1>DashBoard: {user?.email}</h1>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setUpApiCliente(ctx)
        
    
    return {
        props: {}
    }
})