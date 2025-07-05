<script setup lang="ts">
interface Props {
  text: string;
  right?: number;
  left?: number;
  top?: number;
  bottom?: number;
  rightOfBox?: number;
  leftOfBox?: number;
}

const props = withDefaults(defineProps<Props>(), {
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  rightOfBox: 0,
  leftOfBox: 0,
});
</script>

<template>
  <div class="tool-tip-content">
    <div
      class="tooltip-container"
      :style="{
        top: props.top + 'px',
        bottom: props.bottom + 'px',
        right: props.right + 'px',
        left: props.left + 'px',
      }"
    >
      <p class="tooltip">
        {{ text }}
      </p>
      <div
        class="box"
        :style="{
          left: props.leftOfBox + 'px',
          right: props.rightOfBox + 'px',
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.tool-tip-content {
  width: fit-content;
  position: relative;
}

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
  position: absolute;
  width: 100%;
  z-index: 10000;
}

.box {
  height: 10px;
  width: 10px;
  background-color: #000;
  transform: rotate(135deg);
  position: absolute;
}
</style>
