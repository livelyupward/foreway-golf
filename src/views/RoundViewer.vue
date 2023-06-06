<template>
  <div id="round-viewer" v-if="getUser">
    <h1>Scorecard</h1>
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
          <td class="round-viewer_top-table_body-row_cell course">{{ props.course.name }}</td>
          <td class="round-viewer_top-table_body-row_cell par">{{ props.course.par }}</td>
          <td class="round-viewer_top-table_body-row_cell total">{{ props.score }}</td>
          <td class="round-viewer_top-table_body-row_cell over-under">{{ scoreAgainstPar }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { getUser } = storeToRefs(store);

const props = {
  course: {
    name: 'Fav Course Golf Club',
    par: 71,
  },
  createdAt: new Date().toLocaleDateString(),
  score: 86,
  scores: [{}],
};

const scoreAgainstPar = computed(() => {
  const scoreNumber = props.score - props.course.par;

  if (scoreNumber > 0) {
    return `+${scoreNumber}`;
  } else if (scoreNumber < 0) {
    return `-${scoreNumber}`;
  } else {
    return `E`;
  }
});
</script>

<style lang="scss">
.round-viewer_top-table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  thead {
    border-bottom: 1px solid black;

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
</style>
