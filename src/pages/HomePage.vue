<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { RouterLink } from "vue-router";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

import InputBar from "../components/InputBar.vue";
import DropDown from "../components/DropDown.vue";
import AddTask from "../components/AddTask.vue";
import TaskList from "../components/TaskList.vue";
import EmptyState from "../components/EmptyState.vue";
import Tooltip from "../components/Tooltip.vue";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

const searchQuery = ref<string>("");
const currentFilter = ref<string>("all");

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

const emptyStateHeading = computed(() => {
  if (!taskStore.tasks.length) {
    return "No Tasks";
  }
  if (!recentTasks.value.length && (searchQuery.value || currentFilter.value)) {
    return "No Task for these Filters";
  }
  return "";
});

const emptyStateSubHeading = computed(() => {
  if (!taskStore.tasks.length) {
    return "Add a new task to begin";
  }
  if (!recentTasks.value.length && (searchQuery.value || currentFilter.value)) {
    return "Try again using different filters";
  }
  return "";
});

const handleDeleteTask = async (id: number) => {
  if (confirm("Are you sure to delete this task?")) {
    await taskStore.deleteTask(id);
    notificationStore.addToast("Task deleted successfully", "delete");
  }
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
      <div class="heading">
        <img src="/notepad.png" alt="notepad" />
        <h2>ToDo List</h2>
      </div>
      <div class="input-container">
        <input-bar v-model="searchQuery" placeholder="Search..." />

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
            <button class="view-all-button">
              <router-link to="/task-page" class="nav-link"
                >View All</router-link
              >
            </button>
            <div class="tool-tip">
              <tooltip :text="'Click to reach full task page'" :left="210"/>
            </div>
          </div>
        </div>
        <task-list :tasks="recentTasks" @delete-task="handleDeleteTask" />
      </div>
      <empty-state
        v-else
        :title="emptyStateHeading"
        :subTitle="emptyStateSubHeading"
      />
    </section>
    <div v-else>Loading data...</div>
  </div>
</template>

<style scoped>

.heading {
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

.view-label{
  width: 40%;
  text-align: start;
}

.view-all {
  width: 60%;
  text-align: end;
}

.view-all-button {
  font-size: 15px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 600;
  border-radius: 4px;
  background: #317ed6;
  border-radius: 8px;
  width: max-content;
  padding: 6px;
  font-weight: 700;
}

.count-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 25px 0 16px 0;
  font-size: 18px;
}

.view-all {
  position: relative;
}

.view-all:hover .tool-tip {
  width: 100%;
  visibility: visible;
  right: -109px;
  top: -44px;
}

.container,
.recent-task.container,
.page-container {
  width: 100%;
}
</style>
