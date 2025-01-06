import { app } from "./firebaseConfig"

const firestore = app.firestore()
const auth = app.auth()
export const useFirebaseAdmin = {
    firestore,
    auth
}

export default useFirebaseAdmin