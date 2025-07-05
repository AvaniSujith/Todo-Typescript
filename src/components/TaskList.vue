<script setup lang="ts">
import { computed, ref } from "vue";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "./InputBar.vue";
import Notification from "./Notification.vue";
import Modal from "./Modal.vue";

import type { Task } from "../type";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const editingTaskId = ref<string>("");
const editingTaskTitle = ref<string>("");
const editingTaskCompleted = ref(false);
const isVisible = ref<Boolean>(false);
const taskDeletId = ref<string>("");

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: "delete", id: string): void;
}>();

const handleDelete = (id: string) => {
  emit("delete", id);
};

const isEditing = (id: string) => editingTaskId.value === id;

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

const buttonContent = (id: string) => {
  return isEditing(id) ? "save" : "edit";
};

const isSaveButtonDisabled = (task: Task) => {
  return isEmptyTitle.value && isEditing(task.id);
};

const showModal = (taskId: string) => {
    isVisible.value = true;
    taskDeletId.value = taskId
};

const handleClick = () => {
  isVisible.value = false;
  taskDeletId.value = '';
};

const handleSaveOrEdit = (task: Task) => {
  if (!isEditing(task.id)) {
    editTask(task);
  } else {
    task.completed = editingTaskCompleted.value;
    task.title = editingTaskTitle.value;
    taskStore.updateTask(task);
    notificationStore.addToast("Task saved successfully", "update");
    editingTaskId.value = "";
    editingTaskTitle.value = "";
  }
};
</script>

<template>
  <div>
    <ul class="tasks">
    <li v-for="task in tasks" class="task-item" :key="task.id">
      <input
        type="checkbox"
        :checked="task.completed"
        :disabled="isEditing(task.id)"
        @change="updateTaskComplete(task)"
      />
      <div class="task-title">
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
          @click="showModal(task.id)"
        >
          Delete
        </button>
        <notification />
      </div>
    </li>
  </ul>
  <modal
    :class="isVisible ? 'show' : 'dont-show'"
    heading="Delete Task"
    content="Are you sure to delete the task ?"
    @click="handleClick"
    @delete="handleDelete(taskDeletId)"
  />
  </div>
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
}

.task-title input {
  margin: 0;
  width: 300px;
}

.task-title p {
  height: 100%;
  cursor: pointer;
  padding: 10px 20px 0 20px;
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


.dont-show {
  display: none;
}

.show {
  display: flex;
}
</style>
