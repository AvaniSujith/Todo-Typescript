<script setup lang="ts">
import { ref } from "vue";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "./InputBar.vue";
import Notification from "./Notification.vue";

import type { Task } from "../type";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const editingTaskId = ref<number | null>(null);
const editingTaskTitle = ref<string>("");
const editingTaskCompleted = ref(false);

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: "deleteTask", id: number): void;
}>();

const handleDelete = (id: number) => {
  emit("deleteTask", id);
};

const isEditing = (id: number) => editingTaskId.value === id;

const editTask = (task: Task) => {
  editingTaskId.value = task.id;
  editingTaskTitle.value = task.title;
  editingTaskCompleted.value = task.completed;
};

const updateTaskComplete = (task: Task) => {
  task.completed = !task.completed
  taskStore.updateTask(task);
  notificationStore.addToast("Task state updated successfully", "update");
};

const buttonContent = (id: number) => {
  return isEditing(id) ? "save" : "edit";
};

const handleSaveOrEdit = (task: Task) => {
  if (!isEditing(task.id)) {
    editTask(task);
  } else {
    task.completed = editingTaskCompleted.value;
    task.title = editingTaskTitle.value;
    taskStore.updateTask(task);
    notificationStore.addToast("Task saved with changes", "update");
    editingTaskId.value = null;
    editingTaskTitle.value = "";
  }
};
</script>

<template>
  <ul class="tasks">
    <li v-for="task in tasks" class="task-item" :key="task.id">
      <input
        type="checkbox"
        :checked="task.completed"
        :disabled="isEditing(task.id)"
        @change="updateTaskComplete(task)"
      />
      <p
        v-if="!isEditing(task.id)"
        :class="task.completed ? 'completed' : 'not-completed'"
      >
        {{ task.title }}
      </p>
      <input-bar
        v-else
        v-model="editingTaskTitle"
        class="input-bar"
        type="text"
        @keyup.enter="handleSaveOrEdit(task)"
      />

      <div class="task-buttons">
        <button class="edit-btn" @click="handleSaveOrEdit(task)">
          {{ buttonContent(task.id) }}
        </button>
        <button
          class="delete-btn"
          :disabled="isEditing(task.id)"
          @click="handleDelete(task.id)"
        >
          Delete
        </button>
        <notification />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.add-task-container {
  display: flex;
  gap: 5px;
  width: 100%;
}

.task-detail {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  width: 100%;
}

.input-bar {
  margin: 0px 20px;
}

.add-btn {
  background-color: #317ed6;
  padding: 8px;
  border-radius: 6px;
  margin: 10px 0;
  color: #fff;
}

button:disabled {
  background-color: #eee;
  cursor: not-allowed;
  color: #555353;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2px;
  font-size: 23px;
}

.task-buttons {
  display: flex;
}

p {
  font-weight: 500;
  text-wrap: nowrap;
  padding: 10px 0px 10px 0px;
}

.completed {
  text-decoration: line-through;
}

.tasks {
  width: 100%;
}

.delete-btn,
.edit-btn {
  padding: 5px 0;
  width: 60px;
  margin: 2px;
}

.delete-btn {
  background-color: red;
  color: white;
}

.edit-btn {
  background-color: bisque;
}

.completed {
  text-decoration: line-through;
}
</style>
