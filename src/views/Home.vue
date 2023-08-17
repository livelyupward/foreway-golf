<template>
  <div id="home-page">
    <h1 class="foreway-header page-title">Foreway Golf</h1>
    <div v-if="getUser !== undefined" id="homepage">
      <Suspense>
        <ResumeRoundCard v-if="getUser.currentRound" :round-id="getUser.currentRound" />
        <p class="homepage_resume-round_disclaimer" v-else>
          You have no active rounds of golf in progress. To begin a round, simply click on the Round button located in
          the bottom menu of the screen.
        </p>
        <template #fallback> Loading current round... </template>
      </Suspense>
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
import ResumeRoundCard from '../components/ResumeRoundCard.vue';

const router = useRouter();
const store = mainStore();
const { getUser } = storeToRefs(store);

const currentRoundObject = getUser.value
  ? getUser.value.round.filter((round) => {
      return round.id === getUser.value.currentRound;
    })
  : null;

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
</style>
