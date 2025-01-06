import admin, { ServiceAccount } from "firebase-admin";
import { serviceAccount } from "./serviceAccount"

export const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});
