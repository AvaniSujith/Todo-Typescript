<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { RouterLink } from "vue-router";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import TaskList from "../components/TaskList.vue";
import InputBar from "../components/InputBar.vue";
import EmptyState from "../components/EmptyState.vue";
import Notification from "../components/Notification.vue";
import Tooltip from "../components/Tooltip.vue";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const searchQuery = ref("");

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

const handleDelete = async (id: number) => {
  if (confirm("Are you sure to delete this task?")) {
    await taskStore.deleteTask(id);
    notificationStore.addToast("Task deleted successfully", "delete");
  }
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
        <tooltip :text="'Go back to Home'" />
      </div>
    </nav>
    <header>
      <div class="page-title">
        <h2>All Tasks</h2>
      </div>
      <input-bar v-model="searchQuery" placeholder="Search..." />
      <notification />
    </header>
    <section v-if="filteredTasks.length" class="task-list-container">
      <div class="task-count">
        <p>
          Total Tasks : <span>{{ taskStore.tasks.length }}</span>
        </p>
      </div>
      <div class="scroll-container">
        <div class="task-container">
          <task-list :tasks="filteredTasks" @delete-task="handleDelete" />
        </div>
      </div>
    </section>
    <empty-state
      v-else
      :title="emptyStateHeading"
      :sub-title="emptyStateSubHeading"
    />
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
  position: relative;
}

.back-button:hover .tool-tip {
  visibility: visible;
}

span {
  font-weight: 600;
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
  padding: 10px 2px 0px 5px;
}

.scroll-container {
  padding-bottom: 20px;
  height: 100%;
  width: 100%;
}

.page-container {
  width: 100%;
}

.task-count {
  margin-top: 20px;
}
</style>
