<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="tooltip-container">
    <p class="tooltip">
      {{ text }}
    </p>
    <div class="box"></div>
  </div>
</template>

<style scoped>
.tooltip {
  width: fit-content;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 9px 7px;
  text-wrap: nowrap;
}

.tooltip-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.box {
  height: 10px;
  width: 10px;
  background-color: #000;
  transform: rotate(130deg);
  position: absolute;
  bottom: -5px;
}
</style>
