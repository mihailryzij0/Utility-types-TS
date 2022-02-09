import { ref, set, get, child } from "firebase/database";
import { db, dbRef } from "./firebaseConfig";
import { IworkingStorage, Task } from "./intrfisceProgram";

export class WorkingFirebaise implements IworkingStorage {
  async loadStorageArray(): Promise<any> {
    const res = await get(dbRef);
    const data = await res.val();
    return data.users;
  }

  async saveStorageArray(data: Task[]) {
    set(ref(db, "users/"), data);
  }
}
