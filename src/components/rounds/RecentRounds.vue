<template>
  <section class="homepage_recent-rounds card">
    <h2 class="homepage_recent-rounds_header card-header">Recent Rounds</h2>
    <table class="homepage_recent-round_table" v-if="recentRounds.length && typeof strokesTotalled === 'function'">
      <thead class="homepage_recent-round_table-head">
        <tr class="homepage_recent-round_table-head_row">
          <th class="homepage_recent-round_table-head_row-header date">Date</th>
          <th class="homepage_recent-round_table-head_row-header course-name">Course</th>
          <th class="homepage_recent-round_table-head_row-header score">Score</th>
        </tr>
      </thead>
      <tbody class="homepage_recent-round_table-body">
        <tr class="homepage_recent-round_table-body_row" v-for="recentRound in recentRounds" :key="recentRound.id">
          <td class="homepage_recent-round_table-body_row-cell">
            {{ makeDatePretty(recentRound.updatedAt) }}
          </td>
          <td class="homepage_recent-round_table-body_row-cell">
            <router-link :to="`/round/view/${recentRound.id}`">
              {{ recentRound.course ? recentRound.course.name : '' }}
            </router-link>
          </td>
          <td class="homepage_recent-round_table-body_row-cell">{{ strokesTotalled(recentRound.scores) }}</td>
        </tr>
      </tbody>
    </table>
    <p class="homepage_recent-rounds_disclaimer" v-else>
      Once you have recorded a round, your recent rounds will appear here.
    </p>
  </section>
</template>

<script setup lang="ts">
import { mainStore, Round } from '../../store';
import { computed, Ref, ref } from 'vue';

const store = mainStore();
const { getRecentUserRounds } = store;

const props = defineProps({
  strokesTotalled: Function,
});

const userRecentRounds = await getRecentUserRounds();

const recentRounds: Ref<Round[]> = ref(userRecentRounds);

function makeDatePretty(dateString: Date | undefined) {
  if (dateString === undefined)
    throw new Error('Date string is missing from recent round. Please ensure the recent round is not malformed.');

  return dateString ? new Date(dateString).toLocaleDateString() : new Date();
}
</script>

<style lang="scss" scoped>
.homepage_recent-rounds_header {
  border: 1px solid #ddd;
  border-bottom: none;
  margin-bottom: 0;
  padding: 10px;
}
</style>
