<script setup lang="ts">
import { ref } from "vue";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// defineProps<{
//   tasks: Task[];
// }>();

const tasks = ref<Task[]>([
  {
    id: 1,
    title: "task1",
    completed: true,
  },
  {
    id: 2,
    title: "task2",
    completed: false,
  },
]);

const tempId = ref<number>();
const tempTitle = ref<string>('');

const emit = defineEmits<{
  (e: "updateTask", id: number): void;
  (e: "deleteTask", id: number): void;
  (
    e: "saveTask",

    id: number
  ): void;
  (e: "editTask", id: number): void;
}>();

const handleUpdate = (id: number) => {
  emit("updateTask", id);
};

const handleDelete = (id: number) => {
  emit("deleteTask", id);
};

// const handleSave = (id: number) => {
//   emit("saveTask", id);
// };

function handleEdit(id: number, title: string) {
  tempId.value = id;
  tempTitle.value = title;
  //   console.log(tempId.value, tempTitle.value)
}

function saveEdit(id: number) {
  const task = tasks.value.find((task) => task.id === id);
  if (task && tempTitle) {
    task.title = tempTitle.value;
    tempId.value = undefined;
    tempTitle.value = '';
  }
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
        <button
          class="edit-btn"
          v-if="tempId !== task.id"
          @click="handleEdit(task.id, task.title)"
        >
          Edit
        </button>
        <button class="save-btn" v-else @click="saveEdit(tempId)">Save</button>
        <button class="del-btn" @click="handleDelete(task.id)">Delete</button>
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
