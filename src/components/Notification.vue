<script setup lang="ts">
import { useNotificationStore } from "../store/Notification";

const notificationStore = useNotificationStore();
</script>

<template>
  <div
    v-for="toast in notificationStore.notifications"
    :class="`toast ${toast.type}`"
    :key="toast.id"
  >
    {{ toast.label }}
  </div>
</template>

<style scoped>
.toast {
  position: fixed;
  right: 665px;
  top: 160px;
  padding: 4px;
  width: fit-content;
  margin: 5px 4px 0px 0px;
  padding: 12px 20px;
  border-radius: 12px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.toast.add {
  background-color: #72b01d;
}

.toast.delete {
  background-color: #c1121f;
}

.toast.update {
  background-color: #f7b538;
}
</style>
