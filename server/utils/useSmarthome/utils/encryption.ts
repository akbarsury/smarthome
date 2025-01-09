import crypto from 'node:crypto'

export default () => {
    const encrypt = (text: string, key: string) => {
        let encryptedText: string | undefined = undefined
        try {
            const keyHash = crypto.createHash('sha256').update(String(key)).digest('base64');
            const iv = crypto.randomBytes(16);
            let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(keyHash, 'base64'), iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            encryptedText = iv.toString('hex').concat(".", encrypted.toString('hex'));
        } catch (e) { console.error(e) }
        return encryptedText
    }

    const decrypt = (text: string, key: string) => {
        let decryptedText: string | undefined = undefined
        try {
            const textArray = text.split('.')
            const keyHash = crypto.createHash('sha256').update(String(key)).digest('base64');
            let iv = Buffer.from(textArray[0], 'hex');
            let encryptedText = Buffer.from(textArray[1], 'hex');
            let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(keyHash, 'base64'), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        } catch (e) { console.error(e) }
        return decryptedText
    }

    return { encrypt, decrypt }
}