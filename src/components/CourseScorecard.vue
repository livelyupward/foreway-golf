<template>
  <h2>Front 9</h2>
  <n-table class="scorecard-table front" :bordered="true" :single-line="false" :size="'small'">
    <thead>
      <tr>
        <th>Hole</th>
        <th v-for="(hole, index) in props.holes.slice(0, 9)">{{ hole.number }}</th>
      </tr>
      <tr>
        <th>Yards</th>
        <th v-for="(hole, index) in props.holes.slice(0, 9)">{{ hole.yardage }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Score</td>
        <td v-for="(hole, index) in props.holes.slice(0, 9)">{{ getCurrentRound.scores[index] }}</td>
      </tr>
    </tbody>
  </n-table>
  <h2>Back 9</h2>
  <n-table class="scorecard-table back" :bordered="true" :single-line="false" :size="'small'">
    <thead>
      <tr>
        <th>Hole</th>
        <th v-for="(hole, index) in props.holes.slice(9, 18)">{{ hole.number }}</th>
      </tr>
      <tr>
        <th>Yards</th>
        <th v-for="(hole, index) in props.holes.slice(9, 18)">{{ hole.yardage }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Score</td>
        <td v-for="(hole, index) in props.holes.slice(9, 18)">{{ getCurrentRound.scores[index] }}</td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import { NTable } from 'naive-ui';
import { mainStore } from '../store';

const store = mainStore();
const { getCurrentRound } = store;

const props = defineProps({
  holes: Array,
});
</script>

<style lang="scss" scoped>
.scorecard-table {
  text-align: center;
}
</style>
