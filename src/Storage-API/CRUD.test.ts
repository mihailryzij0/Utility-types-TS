import { CRUD } from "./CRUD";
import { WorkingFirebaise } from "./workingFirebaise";
import { WorkingLocalStorage } from "./workingLocalStorage";
import { ITaskService, Task, IworkingStorage } from "./intrfisceProgram";
import { app } from "./firebaseConfig";
import { deleteApp} from "firebase/app";

describe("CRUD working with Firebaise", () => {
  let serviceFirebaise: IworkingStorage;
  let serviceCRUD: ITaskService;
  let storageArray: Task[];
  beforeAll(async () => {
    serviceFirebaise = new WorkingFirebaise();
    serviceCRUD = new CRUD(serviceFirebaise);
    storageArray = [
      {
        id: 1,
        text: "test1",
        date: 328021800000,
        status: "planned",
        tags: ["process"],
      },
      {
        id: 2,
        text: "test2",
        date: 828021800000,
        status: "in process",
        tags: ["process"],
      },
      {
        id: 3,
        text: "test3",
        date: 648021900000,
        status: "done",
        tags: ["done"],
      },
    ];
    serviceFirebaise.saveStorageArray(storageArray);
  });
 afterAll(()=>{
  deleteApp(app)
 })

  it("checking the saving to the database", async () => {
    const data = await serviceFirebaise.loadStorageArray();
    expect(data).toStrictEqual(storageArray);
  });
  it("checking the search by id", async () => {
    const response = await serviceCRUD.findById(1);
    expect(response).toStrictEqual(storageArray[0]);
  });
  it("checking the search by text", async () => {
    const response = await serviceCRUD.findByText("test3");
    expect(response).toStrictEqual([storageArray[2]]);
  });
  it("checking the search by tegs", async () => {
    const response = await serviceCRUD.findByTags("done");
    expect(response).toStrictEqual([storageArray[2]]);
  });
  it("checking the search by status", async () => {
    const response = await serviceCRUD.findByStatus("in process");
    expect(response).toStrictEqual([storageArray[1]]);
  });
  it("checking the search by tegs", async () => {
    const response = await serviceCRUD.findByDate(648021900000);
    expect(response).toStrictEqual([storageArray[2]]);
  });
  it("Creating a field in the database", async () => {
    const newTask = {
      text: "test3",
      date: 648021900000,
      status: "done",
      tags: ["done"],
    };
    const newTaskReturn = {
      id: 4,
      text: "test3",
      date: 648021900000,
      status: "done",
      tags: ["done"],
    };
    await serviceCRUD.create(newTask);
    storageArray.push(newTaskReturn);
    const response = await serviceFirebaise.loadStorageArray();
    expect(response).toStrictEqual(storageArray);
  });
  it("updateing a field in the database", async () => {
    const newTask = {
      text: "task3",
      date: 628021900000,
      status: "done",
      tags: ["done"],
    };
    const newTaskReturn = {
      id: 1,
      text: "task3",
      date: 628021900000,
      status: "done",
      tags: ["done"],
    };
    await serviceCRUD.update(1, newTask);
    const resultUpdate = await serviceFirebaise.loadStorageArray();
    expect(resultUpdate[0]).toStrictEqual(newTaskReturn);
  });
  it("delete a field in the database", async () => {
    await serviceCRUD.delete(1);
    const resultUpdate = await serviceFirebaise.loadStorageArray();
    expect(resultUpdate.length).toStrictEqual(3);
  });
});

// --------------------------LocalStorage---------------------

describe("CRUD working with LocalStorage", () => {
  let serviceLocalStorage: IworkingStorage;
  let serviceCRUD: ITaskService;
  let storageArray: Task[];
  beforeAll(async () => {
    serviceLocalStorage = new WorkingLocalStorage();
    serviceCRUD = new CRUD(serviceLocalStorage);
    storageArray = [
      {
        id: 1,
        text: "test1",
        date: 328021800000,
        status: "planned",
        tags: ["process"],
      },
      {
        id: 2,
        text: "test2",
        date: 828021800000,
        status: "in process",
        tags: ["process"],
      },
      {
        id: 3,
        text: "test3",
        date: 648021900000,
        status: "done",
        tags: ["done"],
      },
    ];
    serviceLocalStorage.saveStorageArray(storageArray);
  });

  it("checking the saving to the database", async () => {
    const data = await serviceLocalStorage.loadStorageArray();
    expect(data).toStrictEqual(storageArray);
  });
  it("checking the search by id", async () => {
    const response = await serviceCRUD.findById(1);
    expect(response).toStrictEqual(storageArray[0]);
  });
  it("checking the search by text", async () => {
    const response = await serviceCRUD.findByText("test3");
    expect(response).toStrictEqual([storageArray[2]]);
  });
  it("checking the search by tegs", async () => {
    const response = await serviceCRUD.findByTags("done");
    expect(response).toStrictEqual([storageArray[2]]);
  });
  it("checking the search by status", async () => {
    const response = await serviceCRUD.findByStatus("in process");
    expect(response).toStrictEqual([storageArray[1]]);
  });
  it("checking the search by tegs", async () => {
    const response = await serviceCRUD.findByDate(648021900000);
    expect(response).toStrictEqual([storageArray[2]]);
  });
  it("Creating a field in the database", async () => {
    const newTask = {
      text: "test3",
      date: 648021900000,
      status: "done",
      tags: ["done"],
    };
    const newTaskReturn = {
      id: 4,
      text: "test3",
      date: 648021900000,
      status: "done",
      tags: ["done"],
    };
    await serviceCRUD.create(newTask);
    storageArray.push(newTaskReturn);
    const response = await serviceLocalStorage.loadStorageArray();
    expect(response).toStrictEqual(storageArray);
  });
  it("updateing a field in the database", async () => {
    const newTask = {
      text: "task3",
      date: 628021900000,
      status: "done",
      tags: ["done"],
    };
    const newTaskReturn = {
      id: 1,
      text: "task3",
      date: 628021900000,
      status: "done",
      tags: ["done"],
    };
    await serviceCRUD.update(1, newTask);
    const resultUpdate = await serviceLocalStorage.loadStorageArray();
    expect(resultUpdate[0]).toStrictEqual(newTaskReturn);
  });
  it("delete a field in the database", async () => {
    await serviceCRUD.delete(1);
    const resultUpdate = await serviceLocalStorage.loadStorageArray();
    expect(resultUpdate.length).toStrictEqual(3);
  });
});
