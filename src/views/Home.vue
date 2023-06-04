<template>
  <h1 class="foreway-header">Foreway Golf</h1>
  <div v-if="getUser !== undefined" id="homepage">
    <section>
      <button class="homepage_resume-round_button" v-if="getUser.currentRound !== null" @click="resumeCurrentRound">
        Resume round
      </button>
      <p v-else>
        You have no currently active rounds of golf. Click the Round button in the menu on the bottom of the screen to
        start one.
      </p>
    </section>
    <section class="homepage_recent-rounds" v-if="recentRounds">
      <h2 class="homepage_recent-rounds_header">Recent Rounds</h2>
      <ul class="homepage_recent-rounds_list">
        <li v-for="round in recentRounds">{{ round }}</li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = mainStore();
const { getRecentUserRounds } = store;
const { getUser } = storeToRefs(store);

const getRecentRounds = await getRecentUserRounds();

const recentRounds = ref(getRecentRounds);

function resumeCurrentRound() {
  if (getUser.value) {
    console.log('GU: ', getUser.value);
    router.push(`/round/${getUser.value.currentRound}`);
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

.homepage_resume-round_button {
  @include green-btn;
}
</style>
