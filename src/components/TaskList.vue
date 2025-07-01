<script setup lang="ts">
import { ref } from "vue";

import { useTaskStore } from "../store/Task";

import InputBar from "./InputBar.vue";

import type { Task } from "../type";

const taskStore = useTaskStore();

defineProps<{
  tasks: Task[];
}>();

const editingTaskId = ref<number | null>(null);
const editingTaskTitle = ref<string>("");
const editingTaskCompleted = ref(false);

const isEditing = (id: number) => editingTaskId.value === id;

const editTask = (task: Task) => {
  editingTaskId.value = task.id;
  editingTaskTitle.value = task.title;
  editingTaskCompleted.value = task.completed;
};

const updateTaskComplete = (task: Task) => {
  const updatedTask = { ...task };
  if (!isEditing(task.id)) {
    updatedTask.completed = !updatedTask.completed;
    taskStore.updateTask(updatedTask);
  } else {
    editingTaskCompleted.value = !editingTaskCompleted.value;
  }
};

const handleSaveOrEdit = (task: Task) => {
  if (!isEditing(task.id)) {
    editTask(task);
  } else {
    task.completed =editingTaskCompleted.value
    task.title = editingTaskTitle.value;
    taskStore.updateTask(task);
    editingTaskId.value = null;
    editingTaskTitle.value = "";
  }
};

const buttonContent = (id: number) => {
  return isEditing(id) ? "save" : "edit";
};

const emit = defineEmits<{
  (e: "deleteTask", id: number): void;
}>();

const handleDelete = (id: number) => {
  emit("deleteTask", id);
};
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="tasks">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="updateTaskComplete(task)"
      />
      <p v-if="!isEditing(task.id)" class="task-label">
        {{ task.title }}
      </p>
      <input-bar
        v-else
        v-model="editingTaskTitle"
        type="text"
        class="input-bar"
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
      </div>
    </li>
  </TransitionGroup>
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
}

.task-buttons {
  display: flex;
}

.task-label {
  font-size: 18px;
  font-weight: 500;
  text-wrap: nowrap;
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
</style>
