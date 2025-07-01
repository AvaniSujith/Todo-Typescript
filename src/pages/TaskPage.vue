<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useTaskStore } from "../store/Task";

import TaskList from "../components/TaskList.vue";
import InputBar from "../components/InputBar.vue";
import EmptyState from "../components/EmptyState.vue";

const taskStore = useTaskStore();

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

const emptyStateHeading = () => {
  let heading = "";
  if (!searchedTask.value.length) {
    heading = "No Tasks for the Search";
  }
  return heading;
};

const emptyStateSubHeading = () => {
  let subHeading = "";
  if (!searchedTask.value.length) {
    subHeading = "Search with a different keyword.";
  }
  return subHeading;
};

const handleDelete = async (id: number) => {
  if (confirm("Are you sure to delete this task?")) {
    await taskStore.deleteTask(id);
  }
};

onMounted(async () => {
  await taskStore.getTasks();
});
</script>

<template>
  <div class="page-container" v-if="!taskStore.isLoading">
    <nav class="back-button">
      <a class="nav-link">Back to Home</a>
    </nav>
    <header>
      <div class="page-title">
        <h2>All Tasks</h2>
      </div>
      <input-bar placeholder="Search..." v-model="searchQuery" />
    </header>
    <section class="task-list-container" v-if="searchedTask.length">
      <div class="task-container">
        <task-list :tasks="searchedTask" @delete-task="handleDelete" />
      </div>
    </section>
    <div v-else>
      <empty-state
        :title="emptyStateHeading()"
        :sub-title="emptyStateSubHeading()"
      />
    </div>
  </div>
  <div v-else>Loading data..</div>
</template>

<style scoped>
.back-button {
  background: #eee;
  border-radius: 8px;
  width: max-content;
  padding: 6px;
  margin-bottom: 15px;
  font-weight: 700;
}

h2 {
  font-size: 32px;
}

.page-title {
  text-align: center;
  margin-bottom: 8px;
}

.task-container {
  max-height: 436px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  scroll-behavior: smooth;
  padding: 10px 2px 0 5px;
}

.page-container {
  width: 100%;
}
</style>
