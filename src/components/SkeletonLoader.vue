<script setup lang="ts">
interface Props {
  height?: number;
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  height: 0,
  width: 0,
});
</script>

<template>
  <div
    class="content-loader"
    :style="{ height: props.height + 'px', width: props.width + 'px' }"
  ></div>
</template>

<style scoped>
.content-loader {
  border-radius: 15px;
  height: 100%;
  background: linear-gradient(90deg, #ededed 30%, #dcdcdc 50%, #ededed 70%);
  background-size: 400%;
  animation: loading 1.5s infinite linear;
}

@keyframes loading {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
