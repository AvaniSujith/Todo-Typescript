<template>
  <div class="outer-container">
    <router-view></router-view>
  </div>
</template>

<style>
.outer-container {
  position: relative;
  background-color: #fff;
  max-height: 650px;
  height: 100%;
  width: 530px;
  margin: auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 12px;
}
</style>
