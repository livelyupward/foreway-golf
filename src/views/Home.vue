<template>
  <div id="home-page">
    <h1 class="foreway-header">Foreway Golf</h1>
    <div v-if="getUser !== undefined" id="homepage">
      <section class="homepage_resume-round_wrapper">
        <button class="homepage_resume-round_button" v-if="getUser.currentRound !== null" @click="resumeCurrentRound">
          Resume current round
        </button>
        <p class="homepage_resume-round_disclaimer" v-else>
          You have no active rounds of golf in progress. To begin a round, simply click on the Round button located in
          the bottom menu of the screen.
        </p>
      </section>
      <Suspense>
        <RecentRounds :strokes-totalled="strokesTotalled" />
        <template #fallback>
          <p>Loading recent rounds...</p>
        </template>
      </Suspense>
      <Suspense>
        <LowestRounds :strokes-totalled="strokesTotalled" />
        <template #fallback>
          <p>Loading lowest rounds...</p>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import LowestRounds from '../components/LowestRounds.vue';
import RecentRounds from '../components/RecentRounds.vue';

const router = useRouter();
const store = mainStore();
const { getUser } = storeToRefs(store);

function resumeCurrentRound() {
  if (getUser.value) {
    router.push(`/round/${getUser.value.currentRound}`);
  }
}

function strokesTotalled(scoresArray: any) {
  if (scoresArray === undefined)
    throw new Error('Strokes array not found. Check your strokes being passed to strokesTotalled.');

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
  margin-bottom: 1rem;
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
