<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { useTaskStore } from "../store/Task";
import { useNotificationStore } from "../store/Notification";

const taskStore = useTaskStore();
const notificationStore = useNotificationStore();

import InputBar from "../components/InputBar.vue";
import DropDown from "../components/DropDown.vue";
import AddTask from "../components/AddTask.vue";
import TaskList from "../components/TaskList.vue";
import EmptyState from "../components/EmptyState.vue";

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
  if (!recentTasks.value.length && (searchQuery.value || currentFilter.value)) {
    return "No Task for these Filters";
  }
  if (!taskStore.tasks.length) {
    return "No Tasks";
  }
  return "";
});

const emptyStateSubHeading = computed(() => {
  if (!recentTasks.value.length && (searchQuery.value || currentFilter.value)) {
    return "Try again using different filters";
  }
  if (!taskStore.tasks.length) {
    return "Go back to Home page to add task";
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
        <img src="/public/notepad.png" alt="notepad" />
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
          <div class="view-btn">
            <a href="#" class="nav-link">View All</a>
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

.view-all {
  padding: 5px 8px;
  background-color: #eee;
  font-size: 15px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 700;
}

.count-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header,
.container,
.recent-task.container,
.page-container {
  width: 100%;
}
</style>
