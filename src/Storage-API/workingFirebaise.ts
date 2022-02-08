import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from "firebase/database";
import {IworkingStorage, Task} from "./intrfisceProgram"

const firebaseConfig = {
  projectId: 'fake-server',
  databaseURL: "http://localhost:4010/?ns=fake-server"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
export class WorkingFirebaise implements IworkingStorage{
  async loadStorageArray():Promise<any>  {
 
    const res =  await get(dbRef, `users/`)
    const  data = await res.val();
    return data.users
  }

  async saveStorageArray(data:Task[]) {
    set(ref(db, 'users/'), data );
  }
}
const g = new WorkingFirebaise()
const inMemoryTasks: Task[] = [
  {
    id: 1,
    text: "task1",
    date: 628021800000,
    status: "planned",
    tags: ["planned", "w2"],
  },
  {
    id: 2,
    text: "task2",
    date: 628021800000,
    status: "in process",
    tags: ["process", "w2"],
  },
  {
    id: 3,
    text: "task3",
    date: 628021900000,
    status: "done",
    tags: ["done", "w1"],
  },
];


