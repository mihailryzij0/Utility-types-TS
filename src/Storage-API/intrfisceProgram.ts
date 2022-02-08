
export interface ITaskService {
  findById(id:number):Promise<Task|null>

  findByText(text:string):Promise<Task[] | null>

  findByDate(data:number):Promise<Task[] | null>

  findByStatus(status: string):Promise<Task[] | null>

  findByTags(tags: string):Promise<Task[] | null>

  create(newTask: BaseTask):Promise<void>

  update(id: number, taskUpdate: BaseTask):Promise<void>
  delete(id: number):Promise<void>
}
export interface IworkingStorage{
  loadStorageArray():Promise<Task[]>
  saveStorageArray(Array:Task[]):void
}
export interface BaseTask {
  text: string;
  date: number;
  status: string;
  tags: string[];
}

export interface Task extends BaseTask {
  id: number;
}