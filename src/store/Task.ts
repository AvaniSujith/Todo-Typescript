import { ref } from "vue";

import axios from "axios";

import { defineStore } from "pinia";

import type { Task, UpdateTask, NewTask } from "../type";

export const useTaskStore = defineStore("taskStore", () => {
  const tasks = ref<Task[]>([]);
  const isLoading = ref<boolean>(false);

  const getTasks = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get("http://localhost:3000/todos");
      tasks.value = response.data;
    } catch (error) {
      console.error("Error in fetching data", error);
    } finally {
      isLoading.value = false;
    }
  };

  const updateTask = async (updateTask: UpdateTask) => {
    isLoading.value = true;
    try {
      await axios.patch(
        `http://localhost:3000/todos/${updateTask.id}`,
        updateTask
      );
      await getTasks();
    } catch (error) {
      console.error("Error completing task", error);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteTask = async (id: number) => {
    isLoading.value = true;
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      await getTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    } finally {
      isLoading.value = false;
    }
  };

  const addTask = async (newTask: NewTask) => {
    isLoading.value = true;
    try {
      await axios.post("http://localhost:3000/todos", newTask);
      await getTasks();
    } catch (error) {
      console.error("Task not added due to error", error);
    } finally {
      isLoading.value = false;
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
