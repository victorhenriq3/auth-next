import {useContext, useEffect} from 'react'
import { Can } from '../components/Can'
import { AuthContext } from '../contexts/AuthContext'
import { setUpApiCliente } from '../services/api'
import { api } from '../services/apiCliente'
import { withSSRAuth } from '../utils/withSSRAuth'

export default function DashBoard(){
    const { user, signOut } = useContext(AuthContext)

    useEffect(() => {
        api.get('/me').then(response => {
            console.log(response);
        }).then(response => console.log(response))
          .catch(err => console.log(err))
    }, [])
    
    return (
        <>
            <h1>DashBoard: {user?.email}</h1>

            <button onClick={signOut}>Signout</button>

            <Can permissions={['metrics.list']}>
                <div>Metricas</div>
            </Can>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setUpApiCliente(ctx)
        
    
    return {
        props: {}
    }
})