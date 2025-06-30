<script setup lang="ts">
import { ref } from "vue";

import { useTaskStore } from "../store/Task";

import InputBar from "./InputBar.vue";

import type { NewTask } from "../type";

const taskStore = useTaskStore();

const taskTitle = ref<string>("");

const handleAddTask = () => {
  const newTask: NewTask = {
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
