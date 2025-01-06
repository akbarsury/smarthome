import crypto from 'node:crypto'

type signinCredential = {
    email: string
    password: string
}

type SignResponse = {
    status: 'valid' | 'invalid',
    message?: string,
    token?: string
}

export const encryptToken = (token: string, key: string) => {
    const keyHash = crypto.createHash('sha256').update(String(key)).digest('base64');
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(keyHash, 'base64'), iv);
    let encrypted = cipher.update(token);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex').concat(".", encrypted.toString('hex'));
}

export const decryptToken = (text: string, key: string) => {
    const textArray = text.split('.')
    const keyHash = crypto.createHash('sha256').update(String(key)).digest('base64');
    let iv = Buffer.from(textArray[0], 'hex');
    let encryptedText = Buffer.from(textArray[1], 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keyHash, 'base64'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export default defineEventHandler(async (event) => {
    let signResponse: SignResponse = {
        status: "invalid",
    }


    const csrfToken = getCookie(event, "next-auth.csrf-token")
    const { email, password } = await readBody(event) as signinCredential

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
            signResponse.token = encryptToken(userFetch.localId.concat('|', csrfToken), key)
            return signResponse;
        }
    }

    return setResponseStatus(event, 404, 'Not Found');
})