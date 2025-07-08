<script setup lang="ts">
import { computed, ref } from "vue";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "./InputBar.vue";
import Notification from "./Notification.vue";
import Tooltip from "./Tooltip.vue";

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

const isEmptyTitle = computed(() => {
  return !editingTaskTitle.value.trim().length;
});

const editTask = (task: Task) => {
  editingTaskId.value = task.id;
  editingTaskTitle.value = task.title;
  editingTaskCompleted.value = task.completed;
};

const updateTaskComplete = (task: Task) => {
  task.completed = !task.completed;
  taskStore.updateTask(task);
  notificationStore.addToast("Task state updated successfully", "update");
};

const buttonContent = (id: number) => {
  return isEditing(id) ? "save" : "edit";
};

const isSaveButtonDisabled = (task: Task) => {
  return isEmptyTitle.value && isEditing(task.id);
};

const handleSaveOrEdit = (task: Task) => {
  if (!isEditing(task.id)) {
    editTask(task);
  } else {
    task.completed = editingTaskCompleted.value;
    task.title = editingTaskTitle.value;
    taskStore.updateTask(task);
    notificationStore.addToast("Task saved successfully", "update");
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
      <div class="task-title">
        <div v-if="!isEditing(task.id)" class="task-title-component">
          <p :class="task.completed ? 'completed' : 'not-completed'">
            {{ task.title }}
          </p>
          <div class="tool-tip">
            <tooltip
              :text="task.title"
              :left=100
              :top-of-box=12
              :left-of-box=-5
            />
          </div>
        </div>
        <input-bar
          v-else
          v-model="editingTaskTitle"
          class="input-bar"
          type="text"
          @keyup.enter="handleSaveOrEdit(task)"
        />
      </div>
      <div class="task-buttons">
        <button
          class="edit-btn"
          :disabled="isSaveButtonDisabled(task)"
          @click="handleSaveOrEdit(task)"
        >
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
p {
  font-weight: 500;
  text-wrap: nowrap;
  padding: 10px 0px 10px 0px;
}

.tasks {
  width: 100%;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 2px;
  font-size: 23px;
}

.task-title {
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

/* .task-title-component {
  position: relative;
} */

.task-title-component:hover .tool-tip {
  display: flex;
  top: 4px;
  left: 82px;
  z-index: 99999;
}

.task-title input {
  margin: 0;
  width: 300px;
}

.task-title p {
  height: 100%;
  cursor: pointer;
  padding: 0 20px 0 20px;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.completed {
  text-decoration: line-through;
}

.input-bar {
  margin: 0px 20px;
}

button:disabled {
  background-color: #eee;
  cursor: not-allowed;
  color: #555353;
}

.task-buttons {
  display: flex;
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
</style>
