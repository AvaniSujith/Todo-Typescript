<script setup lang="ts">
import { ref } from "vue";

import Notification from "./Notification.vue";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "./InputBar.vue";
import Tooltip from "./Tooltip.vue";

import type { NewTask } from "../type";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const taskTitle = ref<string>("");

const handleAddTask = () => {
  const newTask: NewTask = {
    title: taskTitle.value,
    completed: false,
  };

  taskStore.addTask(newTask);
  taskTitle.value = "";
  notificationStore.addToast("New Task Added Successfully", "add");
};
</script>

<template>
  <div class="add-task-container">
    <div class="add-task-input">
      <input-bar
        v-model="taskTitle"
        placeholder="New Todo"
        @keyup.enter="handleAddTask"
      />
      <div class="tool-tip">
        <tooltip :text="'Start typing Todo name'" />
      </div>
    </div>
    <div class="add-btn-container">
      <button class="add-task-btn" @click="handleAddTask">Add</button>
      <div class="tool-tip">
        <tooltip :text="'Add a Todo'" />
      </div>
    </div>
    <notification />
  </div>
</template>

<style scoped>
.add-task-container {
  width: 100%;
  display: flex;
  gap: 5px;
}

.add-task-input {
  position: relative;
  width: 100%;
}

.add-task-input:hover .tool-tip {
  visibility: visible;
  right: 0px;
  left: 0px;
}

.add-task-btn {
  background-color: #317ed6;
  padding: 8px;
  font-size: 18px;
  font-weight: 500;
  border-radius: 6px;
  color: #fff;
  width: 80px;
}

.add-btn-container {
  position: relative;
}

.add-btn-container:hover .tool-tip {
  visibility: visible;
}
</style>
