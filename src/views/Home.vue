<template>
  <div id="home-page">
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
      <Suspense>
        <RecentRounds :strokes-totalled="strokesTotalled" />
        <template #fallback>Loading recent rounds...</template>
      </Suspense>
      <Suspense>
        <LowestRounds :strokes-totalled="strokesTotalled" />
        <template #fallback> Loading lowest rounds... </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import LowestRounds from '../components/LowestRounds.vue';
import RecentRounds from '../components/RecentRounds.vue';

const router = useRouter();
const store = mainStore();
const { getRecentUserRounds } = store;
const { getUser } = storeToRefs(store);

const userRecentRounds = await getRecentUserRounds();

const recentRounds = ref(userRecentRounds);

function resumeCurrentRound() {
  if (getUser.value) {
    router.push(`/round/${getUser.value.currentRound}`);
  }
}

function strokesTotalled(scoresArray: any) {
  let scoreTotal = 0;

  for (let i = 0; i < scoresArray.length; i++) {
    const strokeCount = scoresArray[i].strokes;

    scoreTotal += strokeCount;
  }

  return scoreTotal;
}
</script>

<style lang="scss">
.foreway-header {
  color: $primary;
  font-size: 2.5rem;
  font-weight: 900;
}

.round-progress_button {
  margin-right: 15px;
}

.homepage_resume-round_button {
  @include green-btn;
}

.homepage_recent-round_table {
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 0.875rem;
  width: 100%;

  th,
  td {
    padding: 4px;
  }

  tr:last-of-type {
    td:first-of-type {
      border-bottom-left-radius: 10px;
    }
  }

  .homepage_recent-round_table-head_row-header {
    border-bottom: 1px solid #ddd;
    text-align: left;

    &:not(:last-of-type) {
      border-right: 1px solid #ddd;
    }

    &.score {
      width: 60px;
    }
  }
}

.card {
  @include rounded-corners;
  background-color: #fff;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
  padding: 10px;

  .card-header {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    margin-top: 0;
  }

  .homepage_recent-rounds_disclaimer {
    margin-bottom: 0;
  }
}
</style>
