import { ref } from "vue";

import { defineStore } from "pinia";

import type { Task, UpdateTask } from "../type";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref<boolean>(false);

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

  const updateTask = async (updateTask: UpdateTask) => {
    isLoading.value =true;
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${updateTask.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updateTask),
        }
      );
      const data = await response.json();

      const task = tasks.value.find((task) => task.id === updateTask.id);

      if (task) {
        task.title = data.title;
        task.completed = data.completed;
      }
    } catch (error) {
      console.error("Error completing task", error);
    }finally{
      isLoading.value = false;
    }
  };

  const deleteTask = async (id: number) => {
    isLoading.value = true;
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      if (response) {
        tasks.value = tasks.value.filter((task) => task.id !== id);
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }finally{
      isLoading.value = false;
    }
  };

  const addTask = async (AddTask: Task) => {
    isLoading.value = false;
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title: AddTask.title,
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
    }finally{
      isLoading.value = true;
    }
  };

  return {
    tasks,
    isLoading,
    getTasks,
    updateTask,
    deleteTask,
    addTask,
  };
});
