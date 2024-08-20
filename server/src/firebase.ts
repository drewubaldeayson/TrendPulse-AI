import account from "../serviceAccount.json";
import admin from "firebase-admin";

const serviceAccount = account as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();

export { admin, firestore };
