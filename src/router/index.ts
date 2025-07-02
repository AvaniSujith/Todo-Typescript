import { createWebHistory, createRouter } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import TaskPage from "../pages/TaskPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/task-page",
      name: "task-page",
      component: TaskPage,
    },
  ],
});

export default router;
