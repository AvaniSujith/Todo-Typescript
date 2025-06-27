<script setup lang="ts">
import { ref } from "vue";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  isEdit: boolean;
  newTitle: string;
}

const tasks = ref<Task[]>([
  {
    id: 1,
    title: "task1",
    completed: true,
    isEdit: false,
    newTitle: "task1",
  },
  {
    id: 2,
    title: "task2",
    completed: false,
    isEdit: false,
    newTitle: "task2",
  },
]);

// defineProps<{
//   tasks: Task[];
// }>();

const tempId = ref<number>();
const tempTitle = ref<string>("");

function buttonContent(id: number) {
  return tempId.value === id ? "save" : "edit";
}

const emit = defineEmits<{
  (e: "updateTask", id: number): void;
  (e: "deleteTask", id: number): void;
  (e: "saveTask", id: number): void;
  (e: "editTask", id: number): void;
}>();

const handleUpdate = (id: number) => {
  emit("updateTask", id);
};

const handleDelete = (id: number) => {
  emit("deleteTask", id);
};

// const handleEdit = (id: number) => {
//     emit('editTask', id)
// }

function editTask(id: number, title: string) {
  tempId.value = id;
  tempTitle.value = title;
}

function saveEdit(id: number) {
  const task = tasks.value.find((task) => task.id === id);
  if (task && tempTitle) {
    task.title = tempTitle.value;
    tempId.value = undefined;
    tempTitle.value = "";
  }
}

function buttonFunction(task: Task) {
  return tempId.value !== task.id
    ? editTask(task.id, task.title)
    : saveEdit(task.id);
}
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="tasks">
    <li class="task-item" v-for="task in tasks" :key="task.id">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="handleUpdate(task.id)"
      />
      <p class="task-label" v-if="tempId !== task.id">{{ task.title }}</p>
      <input type="text" v-else v-model="tempTitle" />

      <div class="task-buttons">
        <button class="edit-btn" @click="() => buttonFunction(task)">
          {{ buttonContent(task.id) }}
        </button>
        <button class="del-btn" @click="handleDelete(task.id)" :disabled="tempId === task.id">Delete</button>
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
