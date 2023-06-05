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
    <section class="homepage_recent-rounds card">
      <h2 class="homepage_recent-rounds_header card-header">Recent Rounds</h2>
      <table class="homepage_recent-round_table" v-if="recentRounds.length">
        <thead class="homepage_recent-round_table-head">
          <tr class="homepage_recent-round_table-head_row">
            <th class="homepage_recent-round_table-head_row-header date">Date</th>
            <th class="homepage_recent-round_table-head_row-header course-name">Course</th>
            <th class="homepage_recent-round_table-head_row-header score">Score</th>
          </tr>
        </thead>
        <tbody class="homepage_recent-round_table-body">
          <tr class="homepage_recent-round_table-body_row" v-for="recentRound in recentRounds">
            <td class="homepage_recent-round_table-body_row-cell">
              {{ new Date(recentRound.updatedAt).toLocaleDateString() }}
            </td>
            <td class="homepage_recent-round_table-body_row-cell">{{ recentRound.course.name }}</td>
            <td class="homepage_recent-round_table-body_row-cell">{{ strokesTotalled(recentRound.scores) }}</td>
          </tr>
        </tbody>
      </table>
      <p class="homepage_recent-rounds_disclaimer" v-else>
        Once you have recorded a round, your recent rounds will appear here.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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
  padding: 10px;

  .card-header {
    margin-top: 0;
  }

  .homepage_recent-rounds_disclaimer {
    margin-bottom: 0;
  }
}
</style>
