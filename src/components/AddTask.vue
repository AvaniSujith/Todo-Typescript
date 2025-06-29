<script setup lang="ts">
import { ref } from "vue";

import { useTaskStore } from "../store/Task";

import InputBar from "./InputBar.vue";

import type { Task } from "../type";

const taskStore = useTaskStore();

const taskTitle = ref<string>("");

const handleAddTask = () => {
  const taskCount = taskStore.tasks.length;

  const newTask: Task = {
    id: taskCount + 1,
    title: taskTitle.value,
    completed: false,
  };

  taskStore.addTask(newTask);
  taskTitle.value = "";
};
</script>
<template>
  <input-bar
    placeholder="Add Todo"
    v-model="taskTitle"
    @keyup.enter="handleAddTask"
  />
  <button class="add-btn" @click="handleAddTask">Add</button>
</template>
