<template>
  <h1>Welcome, {{ getUser.name }}!</h1>
  <hr />
  <div v-if="getUser.currentRound" id="round-in-progress">
    <p>You have a round in progress. Would you like to resume it?</p>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store';

const store = mainStore();
const { getUser } = store;
</script>

<style scoped></style>
