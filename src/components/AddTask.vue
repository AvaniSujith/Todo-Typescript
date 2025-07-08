<script setup lang="ts">
import { computed, ref } from "vue";

import Notification from "./Notification.vue";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "./InputBar.vue";
import Tooltip from "./Tooltip.vue";

import type { NewTask } from "../type";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const taskTitle = ref<string>("");

const isAddButtonDisabled = computed(() => {
  return !taskTitle.value.trim().length;
});

const handleAddTask = () => {
  if (taskTitle.value !== "") {
    const newTask: NewTask = {
      title: taskTitle.value,
      completed: false,
    };
    taskStore.addTask(newTask);
    taskTitle.value = "";
    notificationStore.addToast("New Task Added Successfully", "add");
  }
};
</script>

<template>
  <div class="add-task-container">
    <input-bar
      v-model="taskTitle"
      placeholder="New Todo"
      @keyup.enter="handleAddTask"
    />

    <div class="add-btn-container">
      <button
        class="add-task-btn"
        :disabled="isAddButtonDisabled"
        @click="handleAddTask"
      >
        Add
      </button>
      <div class="tool-tip">
        <tooltip
          v-if="isAddButtonDisabled"
          :text="'Add a task title to add Task'"
          :left-of-box="30"
          :top-of-box="30"
        />
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

button:disabled {
  cursor: not-allowed;
  background-color: #eee;
  color: #000;
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
  width: 100%;
  top: -44px;
}
</style>
