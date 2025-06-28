<script setup lang="ts">
import { onMounted } from 'vue';

import TaskList from './components/TaskList.vue';

import { useTaskStore } from './store/Task';
import { storeToRefs } from 'pinia';

import type { Task } from './type';

const taskStore = useTaskStore();

const {tasks} = storeToRefs(taskStore)

// const tasks = taskStore.tasks;

const handleUpdate = (id:number) =>{
  // console.log('task complteted');
  taskStore.updateTask(id);
  console.log('task updted', id);
}

const handleDelete =(id:number) => {
  taskStore.deleteTask(id);
  console.log('task dleted', id)
}

const handleEdit = (task: Task) =>{
  taskStore.editTask(task);
  console.log("task edited",task)
}

onMounted(async () => {
  await taskStore.getTasks();
  console.log('data in page', tasks)
})

</script>

<template>
  <div class="outer-container">
    <task-list :tasks="tasks" @update-task="handleUpdate"
     @delete-task="handleDelete" @edit-title="handleEdit"/>
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
