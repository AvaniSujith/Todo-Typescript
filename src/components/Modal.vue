<script setup lang="ts">
defineProps<{
  heading: string;
  content: string;
}>();

const emit = defineEmits<{
  (e: "delete"): void;
  (e: "click"): void;
}>();

const onDelete = () => {
  emit("delete");
};

const onClick = () => {
  emit("click");
};
</script>

<template>
  <div class="modal-container">
    <div class="modal">
      <div class="modal-content">
        <h2>{{ heading }}</h2>
        <p>
          {{ content }}
        </p>
        <div class="buttons-container">
          <button class="delete-btn" @click="onDelete">Ok</button>
          <button class="cancel-btn" @click="onClick">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 99999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(116, 114, 114, 0.7);
}

.modal {
  padding: 20px;
  background-color: #fff;
}

.modal-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.modal-content p {
  text-align: center;
  margin-bottom: 10px;
  font-size: 21px;
}

.buttons-container {
  display: flex;
  gap: 20px;
}
h2 {
  font-size: 30px;
}

button {
  padding: 10px 7px;
  width: 80px;
  font-size: 17px;
}

.delete-btn {
  background-color: #c5172e;
}
.cancel-btn {
  background-color: #eee;
}
</style>
