<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { RouterLink } from "vue-router";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import TaskList from "../components/TaskList.vue";
import InputBar from "../components/InputBar.vue";
import EmptyState from "../components/EmptyState.vue";
import Tooltip from "../components/Tooltip.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const searchQuery = ref("");

const loaderCount = 15;

const filteredTasks = computed(() => {
  if (searchQuery.value !== "") {
    const trimmedQuery = searchQuery.value.toLowerCase().trim();
    return taskStore.tasks.filter((task) =>
      task.title.toLowerCase().trim().includes(trimmedQuery)
    );
  }
  return taskStore.tasks;
});

const emptyStateHeading = computed(() => {
  if (!taskStore.tasks.length) {
    return "No Tasks";
  }
  if (!filteredTasks.value.length && taskStore.tasks.length) {
    return "No Tasks for the Search";
  }
  return "";
});

const emptyStateSubHeading = computed(() => {
  if (!taskStore.tasks.length) {
    return "Go back to Home page to add task";
  }
  if (!filteredTasks.value.length && taskStore.tasks.length) {
    return "Search with a different keyword.";
  }
  return "";
});

const handleDelete = async (id: string) => {
  await taskStore.deleteTask(id);
  notificationStore.addToast("Task deleted successfully", "delete");
};

onMounted(async () => {
  await taskStore.getTasks();
});
</script>

<template>
  <div v-if="!taskStore.isLoading" class="page-container">
    <nav class="back-button">
      <router-link to="/" class="nav-link">Back to Home</router-link>
      <div class="tool-tip">
        <tooltip :text="'Go back to Home'" :top-of-box="29" :left-of-box="55" />
      </div>
    </nav>
    <header>
      <div class="page-title">
        <h2>All Tasks</h2>
      </div>
      <input-bar v-model="searchQuery" placeholder="Search..." />
    </header>
    <section v-if="filteredTasks.length" class="task-list-container">
      <div class="task-count">
        <p>
          Total Tasks : <span>{{ taskStore.tasks.length }}</span>
        </p>
      </div>
      <div class="task-container">
        <task-list :tasks="filteredTasks" @delete-task="handleDelete" />
      </div>
    </section>
    <empty-state
      v-else
      :title="emptyStateHeading"
      :sub-title="emptyStateSubHeading"
    />
  </div>

  <skeleton-loader
    v-else
    v-for="n in loaderCount"
    class="skeleton-loader"
    :key="n"
    :height="570"
    :width="450"
  />
</template>

<style scoped>
.page-container {
  width: 100%;
}

h2 {
  font-size: 32px;
}

.page-container {
  width: 100%;
}

.back-button {
  background: #317ed6;
  border-radius: 8px;
  width: 113px;
  height: 30px;
  padding: 6px;
  margin-bottom: 15px;
  font-weight: 700;
  position: relative;
}

.back-button:hover {
  transform: scale(0.9);
  box-shadow: 2px 2px 5px #eee;
}

.back-button:hover .tool-tip {
  display: flex;
  top: -44px;
}

span {
  font-weight: 600;
  font-size: 20px;
}

.page-title {
  text-align: center;
  margin-bottom: 8px;
}

.task-container {
  height: 402px;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
  padding: 10px 2px 0px 5px;
}

.task-count {
  margin: 20px 0 15px 0;
}
</style>
