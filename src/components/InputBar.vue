<script setup lang="ts">
defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value
    emit("update:modelValue", inputValue);
}

</script>

<template>
  <input
    class="input-bar"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<style scoped>
.input-bar {
  border: 2px solid #eee;
  padding: 8px;
  border-radius: 8px;
  font-size: 18px;
  margin: 10px 0px;
  width: 100%;
}
</style>
