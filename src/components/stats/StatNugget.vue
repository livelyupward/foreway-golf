<template>
  <div class="stat-nugget">
    <span class="stat-nugget_top">
      <slot name="top"></slot>
    </span>
    <div class="stat-nugget_content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.stat-nugget {
  background-color: $white;
  border: 1px solid $primary;
  display: flex;
  flex-direction: column;
  text-align: center;

  &_top {
    background-color: $primary;
    border: 1px solid $primary;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: $white;
    padding: 4px 8px;
  }

  &_content {
    padding: 4px 8px;
  }
}
</style>
