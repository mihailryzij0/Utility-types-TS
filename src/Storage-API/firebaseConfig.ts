import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  projectId: "fake-server",
  databaseURL: "http://localhost:4010/?ns=fake-server",
};
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const dbRef = ref(getDatabase());
