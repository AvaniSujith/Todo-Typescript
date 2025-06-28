import { ref } from "vue";

import { defineStore } from "pinia";

import type { Task } from "../type";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref<boolean>(false);
  const editingTaskId = ref<number>();
  const editingTaskTitle = ref<string>("");

  const getTasks = async () => {
    isLoading.value = true;
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      tasks.value = data;
      console.log("data", data);
    } catch (error) {
      console.error("Error in fetching data", error);
    } finally {
      isLoading.value = false;
    }
  };

  const updateTask = async (id: number) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };

      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });

        const data = await response.json();
        task.completed = data.completed;
      } catch (error) {
        console.error("Error completing task", error);
      }
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (response) {
        tasks.value = tasks.value.filter((task) => task.id !== id);
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const addTask = async (title: string) => {
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title,
      completed: false,
    };
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const addedTask = await response.json();

      tasks.value.unshift(addedTask);
    } catch (error) {
      console.error("Task not added due to error", error);
    }
  };

  const editTitle = (id: number, title: string) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task) {
      editingTaskId.value = id;
      editingTaskTitle.value = title;
    }
  };

  const saveTask = async (id: number) => {
    const task = tasks.value.find((task) => task.id === id);
    if (task && editingTaskTitle) {
      const updatedTask = { ...task, title: editingTaskTitle.value };

      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        });
        const data = await response.json();

        task.title = data.title;
        editingTaskId.value = undefined;
        editingTaskTitle.value = "";
      } catch (error) {
        console.error("Error saving data", error);
      }
    }
  };

  const editTask = (task: Task) => {
    return editingTaskId.value !== task.id
      ? editTitle(task.id, task.title)
      : saveTask(task.id);
  };

  return {
    tasks,
    editingTaskId,
    editingTaskTitle,
    getTasks,
    updateTask,
    deleteTask,
    addTask,
    editTitle,
    saveTask,
    editTask,
  };
});
