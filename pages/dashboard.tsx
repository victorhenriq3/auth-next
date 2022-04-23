import {useContext, useEffect} from 'react'
import { Can } from '../components/Can'
import { AuthContext } from '../contexts/AuthContext'
import { useCan } from '../hooks/useCan'
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
        <>
            <h1>DashBoard: {user?.email}</h1>

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