import { setUpApiCliente } from '../services/api'
import { withSSRAuth } from '../utils/withSSRAuth'


export default function DashBoard(){
   
    
    return (
        <>
            <h1>Metricas</h1>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setUpApiCliente(ctx)
    const response = await apiClient.get('/me')
     
    return {
        props: {}
    }
}, {
    permissions: ['metrics.list'],
    roles: ['administrator'],
})