import { PUBLIC_BACKEND_API_URL } from "$env/static/public"

export const loginApi = async(email:string, password: string) => {
    const result  = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    if(!result.ok){
        throw new Error('Login failed')
    }
    
    return await result.json()
}