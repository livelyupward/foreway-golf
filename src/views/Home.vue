<template>
  <h1 class="foreway-header">Foreway Golf</h1>
  <div v-if="getUser" id="homepage">
    <section>Hi {{ getUser.name }}</section>
    <section>
      <button class="homepage_resume-round_button" v-if="recentRounds.length > 0" @click="resumeCurrentRound">
        Resume round
      </button>
      <p v-else>No round found.</p>
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
  if (getUser.value !== null) {
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
