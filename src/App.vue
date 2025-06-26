<script setup lang="ts">
import { ref } from "vue";
import TaskList from "./components/TaskList.vue";

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

const handleDelete = (id: number) => {
  console.log("task deleted", id);
};

const handleUpdate = (id: number) => {
  console.log("task updated", id);
};

const handleSave = (
  id: number,
  title: string,
  isEdit: boolean,
  completed: boolean
) => {
  const task = tasks.value.find((task) => task.id === id);
  if (task) {
    // console.log("title", title);
    // console.log("update", completedUpdate);
    handleUpdate(task.id);
    task.completed = completed;
    task.title = title;
    task.isEdit = !isEdit;
  }
};

const handleEdit = (id: number) => {
  const task = tasks.value.find((task) => task.id === id);
  // console.log(task);
  if (task) {
    task.isEdit = true;
    task.newTitle = task.title;
  }
};
</script>

<template>
  <div class="outer-container">
    <task-list
      :tasks="tasks"
      @delete-task="handleDelete"
      @update-task="handleUpdate"
      @edit-task="handleEdit"
      @save-task="handleSave"
    />
  </div>
</template>

<style scoped>
.outer-container {
  background-color: #fff;
  max-height: 650px;
  height: 100%;
  max-width: 30%;
  width: 100%;
  margin: auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 12px;
}
</style>
