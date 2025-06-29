<script setup lang="ts">
import { onMounted } from "vue";

import TaskList from "./components/TaskList.vue";
import AddTask from "./components/AddTask.vue";

import { useTaskStore } from "./store/Task";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();

const { tasks } = storeToRefs(taskStore);

const handleDelete = (id: number) => {
  taskStore.deleteTask(id);
  console.log("task dleted", id);
};

onMounted(async () => {
  await taskStore.getTasks();
});
</script>

<template>
  <div class="outer-container">
    <task-list :tasks="tasks" @delete-task="handleDelete" />
    <add-task />
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
