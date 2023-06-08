<template>
  <div id="round-viewer" v-if="getUser && selectedRound && course">
    <header class="round-viewer_header">
      <h1>Scorecard</h1>
      <button class="round-viewer_back-button back-button" @click="$router.back()">
        <font-awesome-icon :icon="['fas', 'caret-left']" />
        Back
      </button>
    </header>
    <table class="round-viewer_top-table">
      <thead>
        <tr class="round-viewer_top-table_heading-row">
          <th class="round-viewer_top-table_heading-row_heading course">Course</th>
          <th class="round-viewer_top-table_heading-row_heading par">Par</th>
          <th class="round-viewer_top-table_heading-row_heading total">Total</th>
          <th class="round-viewer_top-table_heading-row_heading over-under">+/-</th>
        </tr>
      </thead>
      <tbody>
        <tr class="round-viewer_top-table_body-row">
          <td class="round-viewer_top-table_body-row_cell course">{{ course.name }}</td>
          <td class="round-viewer_top-table_body-row_cell par">{{ coursePar }}</td>
          <td class="round-viewer_top-table_body-row_cell total">{{ playerScore }}</td>
          <td class="round-viewer_top-table_body-row_cell over-under">{{ scoreAgainstPar }}</td>
        </tr>
      </tbody>
    </table>

    <table class="round-viewer_score-sheet">
      <thead>
        <tr>
          <th>Hole</th>
          <th>Yard</th>
          <th>Par</th>
          <th>GIR</th>
          <th>FW</th>
          <th>Putts</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr class="round-viewer_score-sheet_score-row" v-for="(hole, index) in course.holes.slice(0, 9)">
          <th>{{ hole.number }}</th>
          <td>{{ hole.yardage }}</td>
          <td>{{ hole.par }}</td>
          <td>{{ selectedRound.round.scores[index].gir ? 'Y' : '' }}</td>
          <td>{{ selectedRound.round.scores[index].fairway ? 'Y' : '' }}</td>
          <td>{{ selectedRound.round.scores[index].putts }}</td>
          <td>{{ selectedRound.round.scores[index].strokes }}</td>
        </tr>
        <tr class="round-viewer_score-sheet_total-row">
          <td colspan="6">Front Total</td>
          <td class="round-viewer_score-sheet_final-row">
            {{ calculateScores(selectedRound.round.scores.slice(0, 9)) }}
          </td>
        </tr>
        <tr class="round-viewer_score-sheet_score-row" v-for="(hole, index) in course.holes.slice(9, 18)">
          <th>{{ hole.number }}</th>
          <td>{{ hole.yardage }}</td>
          <td>{{ hole.par }}</td>
          <td>{{ selectedRound.round.scores[index].gir ? 'Y' : '' }}</td>
          <td>{{ selectedRound.round.scores[index].fairway ? 'Y' : '' }}</td>
          <td>{{ selectedRound.round.scores[index].putts }}</td>
          <td>{{ selectedRound.round.scores[index].strokes }}</td>
        </tr>
        <tr class="round-viewer_score-sheet_total-row">
          <td colspan="6">Back Total</td>
          <td>
            {{ calculateScores(selectedRound.round.scores.slice(9, 18)) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { computed, ComputedRef } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const store = mainStore();
const { getUser } = storeToRefs(store);
const { getRoundById, getCourse } = store;

const props = defineProps({
  id: String,
});

const selectedRound = await getRoundById(props.id);
const { course } = await getCourse(selectedRound.round.course.id);

console.log(selectedRound.round.scores);

const coursePar: ComputedRef<number> = computed((): number => {
  let par = 0;

  if (course) {
    const courseHoles = course.holes;

    for (let i = 0; i < courseHoles.length; i++) {
      const hole = courseHoles[i];

      par += hole.par;
    }
  }

  return par;
});

const playerScore: ComputedRef<number> = computed((): number => {
  let score = 0;

  if (selectedRound.round.scores.length) {
    for (let i = 0; i < selectedRound.round.scores.length; i++) {
      const eachScore = selectedRound.round.scores[i];

      score += eachScore.strokes;
    }
  }

  return score;
});

const scoreAgainstPar = computed(() => {
  const scoreNumber = playerScore.value - coursePar.value;

  if (scoreNumber > 0) {
    return `+${scoreNumber}`;
  } else if (scoreNumber < 0) {
    return `-${scoreNumber}`;
  } else {
    return `E`;
  }
});

function calculateScores(scoresArray) {
  let startingTotal = 0;

  for (let j = 0; j < scoresArray.length; j++) {
    startingTotal += scoresArray[j].strokes;
  }

  return startingTotal;
}
</script>

<style lang="scss">
.round-viewer_header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  h1 {
    color: $primary;
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 0;
  }
}

.round-viewer_top-table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  thead {
    border-bottom: 1px solid $black;

    th {
      color: #333;
      font-weight: 400;
      padding-bottom: 5px;
    }
  }

  tbody {
    td {
      font-weight: 700;
      padding-top: 5px;
    }
  }
}

.round-viewer_top-table_heading-row_heading.course,
.round-viewer_top-table_body-row_cell.course {
  text-align: left;
  width: 60%;
}

.round-viewer_top-table_heading-row_heading,
.round-viewer_top-table_body-row_cell {
  text-align: center;
  width: 13.33%;
}

.round-viewer_stats {
  .round-viewer_stats-container {
    display: flex;
    justify-content: space-evenly;
  }

  .stat-nugget {
    flex: 0 0 calc(33.33% - 15px);

    &:not(:first-of-type):not(:last-of-type) {
      margin: 0 15px;
    }
  }
}

.round-viewer_score-sheet {
  border-collapse: collapse;
  font-size: 0.875rem;
  margin-top: 1.5rem;
  table-layout: fixed;
  width: 100%;

  th:first-child {
    border-right: 1px solid $black;
    color: $primary;
  }

  tr td:last-of-type {
    font-weight: 700;
  }

  thead {
    tr {
      border-bottom: 1px solid $black;
    }
  }

  td,
  th {
    padding: 4px;
    text-align: center;
  }

  tbody {
    tr:nth-of-type(even) {
      background-color: #efefef;
    }

    td {
      border-right: 1px solid #ddd;
    }
  }

  .round-viewer_score-sheet_score-row {
    border-bottom: 1px solid #ddd;
  }

  .round-viewer_score-sheet_total-row {
    td {
      font-weight: 700;
    }
  }
}
</style>
