import {
  BaseTask,
  ITaskService,
  Task,
  IworkingStorage,
} from "./intrfisceProgram";

export class CRUD implements ITaskService {
  constructor(private storage: IworkingStorage) {
    this.storage = storage;
  }

  async findById(id: number): Promise<Task | null> {
    const task = await this.storage.loadStorageArray();
    return task.find((taskItem) => taskItem.id === id) || null;
  }

  async findByText(text: string): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((taskItem) => taskItem.text === text) || null;
  }

  async findByDate(data: number): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((taskItem) => taskItem.date === data) || null;
  }

  async findByStatus(status: string): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((taskItem) => taskItem.status === status) || null;
  }

  async findByTags(tags: string): Promise<Task[] | null> {
    const task = await this.storage.loadStorageArray();
    return task.filter((taskItem) =>
      taskItem.tags.some((tag) => tags.includes(tag))
    );
  }

  async create(newTask: BaseTask): Promise<void> {
    const storageArray = this.storage.loadStorageArray();
    const id = (await storageArray).length + 1;
    const persisted = { id, ...newTask };
    (await storageArray).push(persisted);
    this.storage.saveStorageArray(await storageArray);
  }

  async update(id: number, taskUpdate: BaseTask): Promise<void> {
    const found = await this.findById(id);
    if (!found) {
      return;
    }
    const task = await this.storage.loadStorageArray();
    task.forEach((el, index) => {
      if (el.id === id) task[index] = { id, ...taskUpdate };
    });
    this.storage.saveStorageArray(task);
  }

  async delete(id: number): Promise<void> {
    const task = await this.storage.loadStorageArray();
    const cleanTask = task.filter((taskItem) => taskItem.id !== id);
    this.storage.saveStorageArray(cleanTask);
  }
}
