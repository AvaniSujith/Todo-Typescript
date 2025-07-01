<script setup lang="ts">
import { useNotificationStore } from '../store/Notification';

const notificationStore = useNotificationStore();

</script>

<template>
  <div v-for="toast in notificationStore.notifications" :key="toast.id" :class="`toast ${toast.type}`">
    {{ toast.label }}
  </div>
</template>

<style scoped>
.toast {
  position: absolute;
  right: 0;
  top: 0;
  padding: 4px;
  width: 45%;
  margin: 5px 4px 0px 0px;
  border-radius: 8px;
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
