<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useTaskStore } from "../store/Task";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();

const { tasks } = storeToRefs(taskStore);
// const tasks = taskStore.tasks;
import TaskList from "../components/TaskList.vue";
import InputBar from "../components/InputBar.vue";

const searchQuery = ref("");

const searchedTask = computed(() => {
  if (searchQuery.value !== "") {
    const formattedSearch = searchQuery.value.toLowerCase().trim();
    return taskStore.tasks.filter((task) =>
      task.title.toLowerCase().trim().includes(formattedSearch)
    );
  }
  return taskStore.tasks;
});

const handleDelete = async (id: number) => {
  if (confirm("Are you sure to delete this task?")) {
    await taskStore.deleteTask(id);
  }
};

onMounted(async () => {
  console.log("data incoming");
  await taskStore.getTasks();
  console.log("data", tasks);
});
</script>

<template>
<div class="page-container">
    <nav class="back-button">
        <a class="nav-link">Back to Home</a>
    </nav>
    <header>
        <div class="page-title">
            <h2>All Tasks</h2>
        </div>
        <input-bar placeholder="Search..." v-model="searchQuery" />
    </header>
    <section class="task-list-container">
        <div class="task-container">
            <task-list :tasks="searchedTask" @delete-task="handleDelete" />
        </div>
    </section>
</div>
</template>

<style scoped>
.back-button{
    background: #eee;
    border-radius: 8px;
    width: max-content;
    padding: 6px;
    margin-bottom: 15px;
    font-weight: 700;
}

h2{
    font-size: 32px;
}

.page-title{
    text-align: center;
}

.task-container{
    max-height: 436px;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
}

.page-container{
    width: 100%;
}
</style>
