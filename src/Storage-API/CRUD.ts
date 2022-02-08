import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from "firebase/database";
import { async } from "@firebase/util";
import { WorkingFirebaise } from "./workingFirebaise";
import { WorkingLocalStorage } from "./workingLocalStorage";
import {BaseTask, ITaskService, Task, IworkingStorage} from "./intrfisceProgram"

export class CRUD implements  ITaskService {
  constructor(private storage:IworkingStorage){}

  async findById(id: number): Promise<Task | null> {
    const task = await this.storage.loadStorageArray();
    return task.find((task) => task.id === id) || null;
  }

  async  findByText(text: string): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((task)=> task.text === text) || null
  }

  async findByDate(data: number): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((task)=> task.date === data) || null
  }

  async findByStatus(status: string): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((task)=> task.status === status) || null
  }

  async findByTags(tags: string[]):  Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((task)=> task.tags.some((tag) => tags.includes(tag))) || null
  }

  async create(newTask: BaseTask): Promise<void>{
    const storageArray = this.storage.loadStorageArray();
    const id = (await storageArray).length + 1;
    const persisted = { id, ...newTask };
    (await storageArray).push(persisted);
    this.storage.saveStorageArray(await storageArray)
  }

  async update(id: number, taskUpdate: BaseTask): Promise<void> {
    const found = await this.findById(id);
    if (!found) {
      return 
    }
    const task = await this.storage.loadStorageArray();
    task.forEach((el, index) => {
      if(el.id === id ) task[index] = { id, ...taskUpdate };      
    });
     this.storage.saveStorageArray(task)
  }

  async delete(id: number): Promise<void> {
    const task = await this.storage.loadStorageArray();
    const v = task.filter((task) => task.id !== id)
     this.storage.saveStorageArray(v)
  }


 }

// let fb = new WorkingFirebaise()
// async function hog() {
//   let h = await  fb.loadStorageArray()
//   console.log(h)
// }
// hog();
// let crud = new CRUD(fb) 
// async function hom() {
//   let h = await  crud.findById(1)
//   console.log(h)
// }
// hom();
export const inMemoryTasks: Task[] = [
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
const g = {
  text: "task3",
  date: 6,
  status: "done",
  tags: ["done", "w1"],
}


 
