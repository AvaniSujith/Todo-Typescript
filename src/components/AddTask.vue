<script setup lang="ts">
import { ref } from "vue";

import { useTaskStore } from "../store/Task";

const taskStore = useTaskStore();

import InputBar from "./InputBar.vue";

import type { NewTask } from "../type";

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
  <div class="add-task-container">
    <input-bar
      v-model="taskTitle"
      placeholder="Add Todo"
      @keyup.enter="handleAddTask"
    />
    <button class="add-task-btn" @click="handleAddTask">Add</button>
  </div>
</template>

<style scoped>
.add-task-container {
  width: 100%;
  display: flex;
  gap: 5px;
}

.add-task-btn {
  background-color: #317ed6;
  padding: 8px;
  border-radius: 6px;
  margin: 10px 0;
  color: #fff;
}
</style>
