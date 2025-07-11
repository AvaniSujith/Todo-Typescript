<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { useRouter } from "vue-router";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "../components/InputBar.vue";
import DropDown from "../components/DropDown.vue";
import AddTask from "../components/AddTask.vue";
import TaskList from "../components/TaskList.vue";
import EmptyState from "../components/EmptyState.vue";
import Tooltip from "../components/Tooltip.vue";
import SkeletonLoader from "../components/SkeletonLoader.vue";

const router = useRouter();

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const searchQuery = ref<string>("");
const currentFilter = ref<string>("all");

const loaderCount = 5;

const filteredTasks = computed(() => {
  const tasks = taskStore.tasks;
  const currentFilterValue = currentFilter.value;
  const searchQueryValue = searchQuery.value.trim().toLowerCase();

  let result = tasks;

  if (currentFilterValue) {
    if (currentFilterValue === "complete") {
      result = result.filter((task) => task.completed);
    } else if (currentFilterValue === "incomplete") {
      result = result.filter((task) => !task.completed);
    }
  }

  if (searchQueryValue !== "") {
    result = result.filter((task) =>
      task.title.trim().toLowerCase().includes(searchQueryValue)
    );
  }
  return result;
});

const recentTasks = computed(() => {
  return [...filteredTasks.value].reverse().slice(0, 5);
});

const emptyStateHeader = computed(() => {
  if (!taskStore.tasks.length) {
    return "No Tasks";
  }
  if (!recentTasks.value.length && (searchQuery.value || currentFilter.value)) {
    return "No Task for these Filters";
  }
  return "";
});

const emptyStateSubHeader = computed(() => {
  if (!taskStore.tasks.length) {
    return "Add a new task to begin";
  }
  if (!recentTasks.value.length && (searchQuery.value || currentFilter.value)) {
    return "Try again using different filters";
  }
  return "";
});

const goToTaskPage = () => {
  router.push("/task-page");
};

const handleDeleteTask = async (id: string) => {
  await taskStore.deleteTask(id);
  notificationStore.addToast("Task deleted successfully", "delete");
};

const handleFilter = async (filter: string) => {
  currentFilter.value = filter;
};

onMounted(async () => {
  await taskStore.getTasks();
});
</script>

<template>
  <div class="page-container">
    <header>
      <div class="header-content">
        <img src="/notepad.png" alt="notepad" />
        <h2>ToDo List</h2>
      </div>
      <div class="input-container">
        <input-bar
          v-model="searchQuery"
          placeholder="Search..."
          :disabled="taskStore.isLoading"
        />
        <drop-down @change="handleFilter" />
        <add-task />
      </div>
    </header>
    <section v-if="!taskStore.isLoading" class="task-list-container">
      <div v-if="recentTasks.length" class="recent-task-container">
        <div class="count-details">
          <div class="view-label">
            {{ recentTasks.length }} / {{ taskStore.tasks.length }}
          </div>
          <div class="view-all">
            <button class="view-all-button" @click="goToTaskPage">
              View All
            </button>
            <tooltip
              class="tool-tip"
              :text="'Click to reach full task page'"
              :left-of-box="120"
              :top-of-box="67"
              :top="-78"
              :left="120"
            />
          </div>
        </div>
        <task-list :tasks="recentTasks" @delete-task="handleDeleteTask" />
      </div>
      <empty-state
        v-else
        :title="emptyStateHeader"
        :subTitle="emptyStateSubHeader"
      />
    </section>

    <skeleton-loader
      v-else
      v-for="n in loaderCount"
      class="skeleton-loader"
      :key="n"
      :height="40"
      :width="490"
    />
  </div>
</template>

<style scoped>
header {
  margin-bottom: 22px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 0 20px 0;
}

img {
  height: 45px;
  width: auto;
}

h2 {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 40px;
  line-height: 45px;
  margin: 0;
  padding-top: 5px;
}

.view-label {
  width: 40%;
  text-align: start;
}

.view-all {
  width: 60%;
  text-align: end;
  position: relative;
}

.view-all-button {
  font-size: 15px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
  border-radius: 4px;
  background: #317ed6;
  color: #fff;
  border-radius: 8px;
  width: max-content;
  padding: 6px;
  font-weight: 700;
  cursor: pointer;
}

.count-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 18px;
}

.view-all:hover .tool-tip {
  width: 100%;
  display: flex;
  top: -44px;
  left: 120px;
  pointer-events: none;
}

.container,
.recent-task.container,
.page-container {
  width: 100%;
}
</style>
