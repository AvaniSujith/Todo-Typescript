<script setup lang="ts">
import { ref } from "vue";

import notification from "./components/notification.vue";

interface Toast {
  id: number;
  label: string;
  type: string;
}

const toasts = ref<Toast[]>([]);

function addToast() {
  const id = Math.floor(Math.random() * 1000);
  toasts.value.push({
    id,
    label: "Added Task",
    type: "update",
  });
  setTimeout(() => {
    removeToast(id);
  }, 1000);
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id);
}
</script>

<template>
  <div class="outer-container">
    <notification :toasts="toasts" />
    <button @click="addToast">Add toast</button>
  </div>
</template>

<style>
.outer-container {
  position: relative;
  background-color: #fff;
  max-height: 650px;
  height: 100%;
  width: 30%;
  margin: auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 12px;
}
</style>
