<template>
  <section id="homepage" v-if="getUser">
    <h1 class="homepage_title">GolfApp</h1>
    <article v-if="getUser.currentRound" id="round-in-progress">
      <p>You have a round in progress. Would you like to resume it?</p>
      <n-button class="round-progress_button" secondary type="primary" @click="goToCurrentRound">
        Resume Round
      </n-button>
    </article>
    <article id="recent-rounds">
      <h2>Recent Rounds</h2>
      <div v-if="recentRounds.length > 0" class="recent-rounds_container"></div>
      <div v-else class="recent-rounds_container">
        <p>
          No recent rounds. <router-link class="router-link" to="/round">Start a round</router-link> to begin tracking
          your scores.
        </p>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { ref, Ref } from 'vue';

const store = mainStore();
const { authAndGetUserFromDB, getRecentUserRounds, goToRound } = store;
const { getUser } = storeToRefs(store);

const userCheck = await authAndGetUserFromDB();
const getRecentRounds = await getRecentUserRounds();

const recentRounds = ref(getRecentRounds);
console.log('User check on Home render: ', userCheck);

function goToCurrentRound() {
  if (getUser.value !== null) {
    goToRound(getUser.value.currentRound);
  }
}
</script>

<style lang="scss" scoped>
.homepage_title {
  font-size: 2rem;
  font-weight: 700;
}

.round-progress_button {
  margin-right: 15px;
}
</style>
