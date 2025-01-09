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
    private auth = new FirebaseAdmin().auth
    private firestore = new FirebaseAdmin().firestore

    user = () => {
        const get = () => this.auth.listUsers()
        const getByEmail = (email: string) => this.auth.getUserByEmail(email)
        const add = ({ email, password, name }: { email: string, password: string, name: string }) => this.auth.createUser({
            email,
            password,
            displayName: name
        })
        const remove = (id: string) => this.auth.deleteUser(id).then(() => { return { id } }).catch((e) => undefined)
        const updateUser = (id: string, userData: { name?: string, email?: string }) => this.auth.updateUser(id, userData)
        const updatePassword = (id: string, password: string) => this.auth.updateUser(id, { password })
        return { get, getByEmail, add, remove, updateUser, updatePassword }
    }

    nodes = () => {
        const register = (serialNumber: string) => this.storage.setItem(`node:${serialNumber}`, { active: false })
        const activate = (serialNumber: string) => this.storage.setItem(`node:${serialNumber}`, { active: true })
        const get = () => this.storage.getKeys("node")
        const use = (serialNumber: string) => this.storage.getItem(`node:${serialNumber}`)

        return { register, activate, get, use }
    }
}

export default SmarthomeStorage