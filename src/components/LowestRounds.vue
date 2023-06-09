<template>
  <section class="homepage_best-rounds card">
    <h2 class="homepage_recent-best_header card-header">Lowest Rounds</h2>
    <table class="homepage_recent-round_table" v-if="lowestRounds.length && lowestRounds.length > 5">
      <thead class="homepage_recent-round_table-head">
        <tr class="homepage_recent-round_table-head_row">
          <th class="homepage_recent-round_table-head_row-header date">Date</th>
          <th class="homepage_recent-round_table-head_row-header course-name">Course</th>
          <th class="homepage_recent-round_table-head_row-header score">Score</th>
        </tr>
      </thead>
      <tbody class="homepage_recent-round_table-body">
        <tr class="homepage_recent-round_table-body_row" v-for="lowRound in lowestRounds">
          <td class="homepage_recent-round_table-body_row-cell">
            {{ new Date(lowRound.updatedAt).toLocaleDateString() }}
          </td>
          <td class="homepage_recent-round_table-body_row-cell">
            <router-link :to="`/round/view/${lowRound.id}`">{{ lowRound.course.name }}</router-link>
          </td>
          <td class="homepage_recent-round_table-body_row-cell">{{ strokesTotalled(lowRound.scores) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="homepage_recent-round_disclaimer" v-else>
      This will show your lowest rounds once you've played 6 or more rounds.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, ComputedRef, ref } from 'vue';
import { mainStore, Round, Score } from '../store';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { getAllUserRounds } = store;
const { getUser } = storeToRefs(store);

const props = defineProps({
  strokesTotalled: Function,
});

const userAllRounds = ref(await getAllUserRounds(getUser.value?.id));
const lowestRounds: ComputedRef<Round[]> = computed(() => {
  userAllRounds.value.rounds.forEach((round: Round) => {
    let interimTotal = 0;

    round.scores.forEach((score: Score) => {
      interimTotal += score.strokes ? score.strokes : 0;
    });

    round.totalStrokes = interimTotal;
  });

  return userAllRounds.value.rounds.sort(function (a: Round, b: Round) {
    return (a.totalStrokes ? a.totalStrokes : 0) - (b.totalStrokes ? b.totalStrokes : 0);
  });
});
</script>

<style scoped>
.homepage_recent-round_disclaimer {
  margin-bottom: 0;
}
</style>
