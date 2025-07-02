<script setup lang="ts">
defineProps<{
  title: string;
  subTitle: string;
}>();
</script>

<template>
  <div class="empty-state">
    <h1 class="empty-state-title">{{ title }}</h1>
    <p class="emtpy-state-subtitle">{{ subTitle }}</p>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 18px;
  align-items: center;
}

.empty-state-title {
  font-size: 20px;
}

.empty-state-subtitle {
  color: #eee;
  font-weight: 600;
}
</style>
