import { app } from "./firebaseConfig"

const firestore = app.firestore()
export const useFirebaseAdmin = {
    firestore
}

export default useFirebaseAdmin