<script setup lang="ts">
import { ref } from "vue";

import InputBar from "./InputBar.vue";

import type { Task } from "../type";

defineProps<{
  tasks: Task[];
}>();

const editingTaskId = ref<number>();
const editingTaskTitle = ref<string>("");

const isEditing = (id: number) => editingTaskId.value === id;

function buttonContent(id: number) {
  return isEditing(id) ? "save" : "edit";
}

const emit = defineEmits<{
  (e: "updateTask", id: number): void;
  (e: "deleteTask", id: number): void;
  (e: "editTitle", task: Task): void;
}>();

const handleUpdate = (id: number) => {
  emit("updateTask", id);
};

const handleDelete = (id: number) => {
  emit("deleteTask", id);
};

const handleEdit = (task: Task) => {
  emit("editTitle", task);
};
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="tasks">
    <li v-for="task in tasks" :key="task.id" class="task-item">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="handleUpdate(task.id)"
      />
      <p v-if="editingTaskId !== task.id" class="task-label">
        {{ task.title }}
      </p>
      <input-bar v-else type="text" v-model="editingTaskTitle" />

      <div class="task-buttons">
        <button class="edit-btn" @click="() => handleEdit(task)">
          {{ buttonContent(task.id) }}
        </button>
        <button
          class="del-btn"
          :disabled="editingTaskId === task.id"
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

.task-label {
  font-size: 18px;
  font-weight: 500;
  text-wrap: nowrap;
}

.task-buttons {
  display: flex;
}

.tasks {
  width: 100%;
}

.del-btn,
.edit-btn {
  padding: 5px 0;
  width: 60px;
  margin: 2px;
}

.del-btn {
  background-color: red;
  color: white;
}

.edit-btn {
  background-color: bisque;
}
</style>
