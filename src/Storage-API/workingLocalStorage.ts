import{Task} from './intrfisceProgram'

const localStorageKey = "taskStorage";
export class WorkingLocalStorage{
  
   loadStorageArray = (): Task[] => {
    const jsonStorage = localStorage.getItem(localStorageKey) || "[]";
    return JSON.parse(jsonStorage);
  };

   saveStorageArray = (storageArray: Task[]): void => {
    localStorage.setItem(localStorageKey, JSON.stringify(storageArray));
  };
}