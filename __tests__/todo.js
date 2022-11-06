
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Process to test the ToDo", () => {
  beforeAll(() => {
    add({
      title: "Watch last night's IND VS PAK highlights",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Process to add a new topic to the ToDo", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Practice Unit-1 for the upcoming sliptest on Monday",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("Process to mark this topic from the ToDo as completed", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Getting a list of all topics from ToDo that were overdue", () => {
    let listOfTodos = overdue();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Getting a list of topics from ToDo that are due today", () => {
    let listOfTodos = dueToday();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Getting a list of topics from ToDo that are due later(not today)", () => {
    let listOfTodos = dueLater();

    expect(
      listOfTodos.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
