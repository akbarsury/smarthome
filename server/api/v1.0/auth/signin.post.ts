type SigninCredential = {
    email: string
    password: string
}

type SignResponse = {
    status: 'valid' | 'invalid',
    message?: string,
    token?: string
}

export default defineEventHandler(async (event) => {
    let signResponse: SignResponse = {
        status: "invalid",
    }

    const csrfToken = getCookie(event, "next-auth.csrf-token")
    const { email, password } = await readBody(event) as SigninCredential

    if (csrfToken && email && password) {
        const userFetch = await $fetch<{
            email: string,
            localId: string,
            registered: boolean
        }>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${useRuntimeConfig(event).firebaseApiKey}`, {
            method: 'POST',
            body: {
                email,
                password
            }
        })

        if (userFetch.registered && userFetch.localId) {
            const key = useRuntimeConfig().authSecret;
            signResponse.status = 'valid'
            signResponse.token = useSmarthome().encryption.encrypt(userFetch.localId.concat('|', csrfToken), key)
            return signResponse;
        }
    }

    return setResponseStatus(event, 404, 'Not Found');
})