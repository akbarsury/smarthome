import admin, { type ServiceAccount } from "firebase-admin";
import serviceAccount from "~/service-account.json"

class FirebaseAdmin {
    private app = admin.apps.length === 0 ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount)
    }, 'default') : admin.app('default')

    public auth = this.app.auth()
    public firestore = this.app.firestore()
}

class SmarthomeStorage {
    private storage = useStorage('db')
    auth = new FirebaseAdmin().auth
    firestore = new FirebaseAdmin().firestore
    user = () => {
        const get = () => this.auth.listUsers()
        const getByEmail = (email: string) => this.auth.getUserByEmail(email)
        const add = ({ email, password, name }: { email: string, password: string, name: string }) => this.auth.createUser({
            email,
            password,
            displayName: name
        })
        return { get, getByEmail, add }
    }
}

export default SmarthomeStorage