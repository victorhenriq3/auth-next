import { createContext, ReactNode, useState, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import Router from 'next/router'
import { api } from "../services/apiCliente";

type User = {
    email: string
    permissions: string[]
    roles: string[]
}

type SignInCredentials = {
    email: string
    password: string
}

type AuthContextData ={ 
    signIn: (credentials: SignInCredentials) => Promise<void>
    user: User
    isAuthenticated: boolean
    signOut(): void
}   

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext ({} as AuthContextData)

// let auhtChannel: BroadcastChannel

export function signOut(){
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.refreshToken')

    // auhtChannel.postMessage('signOut')

    Router.push('/')
}

export function AuthProvider({children}: AuthProviderProps ){
    // useEffect(() => {
    //     auhtChannel = new BroadcastChannel('auth')

    //     auhtChannel.onmessage = (message) => {
    //         switch (message.data){
    //             case 'signOut':
    //                 signOut();
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }, [])

    const [user, setUser] =  useState<User>(null)
    const isAuthenticated = !!user

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        if(token){
            api.get('/me').then(response => {
                const {email, permissions, roles} = response.data

                setUser({email, permissions, roles})
            })
            .catch(error => {
                signOut()
            })
        }
    }, [])

    async function signIn({email, password}: SignInCredentials){
        try {
            const response = await api.post("/sessions", {
                email, 
                password
            })
            
            const {token, refreshToken, permissions, roles} = response?.data

            // localstorage
            // session storage
            // cookies

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })
            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, //30 dias
                path: '/'
            })

            setUser({
                email,
                permissions,
                roles
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            

            Router.push("/dashboard")

        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated, user, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}