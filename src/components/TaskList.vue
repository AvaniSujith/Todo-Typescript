<script setup lang="ts">
interface Task {
  id: number;
  title: string;
  completed: boolean;
  isEdit: boolean;
  newTitle: string;
}

defineProps<{
  tasks: Task[];
}>();

const emit = defineEmits<{
  (e: "updateTask", id: number): void;
  (e: "deleteTask", id: number): void;
  (
    e: "saveTask",
    id: number,
    title: string,
    isEdit: boolean,
    completed: boolean
  ): void;
  (e: "editTask", id: number): void;
}>();

const handleUpdate = (id: number) => {
  emit("updateTask", id);
};

const handleDelete = (id: number) => {
  emit("deleteTask", id);
};

const handleSave = (
  id: number,
  title: string,
  isEdit: boolean,
  completed: boolean
) => {
  emit("saveTask", id, title, isEdit, completed);
};

function handleEdit(id: number) {
  emit("editTask", id);
}
</script>

<template>
  <TransitionGroup name="list" tag="ul" class="tasks">
    <li class="task-item" v-for="task in tasks" :key="task.id">
      <div class="task-detail" v-if="!task.isEdit">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="handleUpdate(task.id)"
        />
        <p class="task-label">{{ task.title }}</p>
        <button class="edit-btn" @click="handleEdit(task.id)">Edit</button>
      </div>
      <div class="task-detail" v-else>
        <input
          type="checkbox"
          :checked="task.completed"
          @change="handleUpdate(task.id)"
        />
        <input type="text" v-model="task.newTitle" />
        <button
          class="edit-btn"
          @click="
            handleSave(task.id, task.newTitle, task.isEdit, task.completed)
          "
        >
          Save
        </button>
      </div>
      <div class="task-buttons">
        <button
          class="del-btn"
          @click="handleDelete(task.id)"
          :disabled="task.isEdit"
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
