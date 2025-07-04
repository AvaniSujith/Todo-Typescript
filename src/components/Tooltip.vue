<script setup lang="ts">
defineProps<{
  text: string;
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}>();
</script>

<template>
  <div
    class="tooltip-container"
    :style="{
      top: top + 'px',
      bottom: bottom + 'px',
      right: right + 'px',
      left: left + 'px',
    }"
  >
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
  position: sticky;
  width: 100%;
}

.box {
  height: 10px;
  width: 10px;
  background-color: #000;
  transform: rotate(135deg);
  position: absolute;
  bottom: -5px;
}
</style>
