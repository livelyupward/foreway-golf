<template>
  <section id="homepage">
    <!--  <section id="homepage" v-if="getUser">-->
    <ScoreForm />
  </section>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ScoreForm from '../components/ScoreForm.vue';

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
