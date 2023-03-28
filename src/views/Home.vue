<template>
  <section id="homepage" v-if="getUser">
    <h1>GolfApp</h1>
    <div v-if="getUser.currentRound" id="round-in-progress">
      <hr />
      <p>You have a round in progress. Would you like to resume it?</p>
      <n-button class="round-progress_button" secondary type="primary" @click="goToCurrentRound">
        Resume Round
      </n-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { authAndGetUserFromDB, goToRound } = store;
const { getUser } = storeToRefs(store);

const userCheck = await authAndGetUserFromDB();
console.log('User check on Home render: ', userCheck);

function goToCurrentRound() {
  if (getUser.value !== null) {
    goToRound(getUser.value.currentRound);
  }
}
</script>

<style lang="scss" scoped>
.round-progress_button {
  margin-right: 15px;
}
</style>
