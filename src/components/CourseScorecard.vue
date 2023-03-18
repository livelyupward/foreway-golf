<template>
  <h2>Front 9</h2>
  <n-table class="scorecard-table front" :bordered="true" :single-line="false" :size="'small'">
    <thead>
      <tr>
        <th>Hole</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
      </tr>
      <tr>
        <th>Yard</th>
        <th>400</th>
        <th>487</th>
        <th>375</th>
        <th>128</th>
        <th>425</th>
        <th>148</th>
        <th>356</th>
        <th>352</th>
        <th>407</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Score</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </n-table>
  <h2>Back 9</h2>
  <n-table class="scorecard-table back" :bordered="true" :single-line="false" :size="'small'">
    <thead>
      <tr>
        <th>Hole</th>
        <th>10</th>
        <th>11</th>
        <th>12</th>
        <th>13</th>
        <th>14</th>
        <th>15</th>
        <th>16</th>
        <th>17</th>
        <th>18</th>
      </tr>
      <tr>
        <th>Yard</th>
        <th>315</th>
        <th>612</th>
        <th>358</th>
        <th>148</th>
        <th>402</th>
        <th>480</th>
        <th>318</th>
        <th>171</th>
        <th>326</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Score</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </n-table>
</template>

<script setup lang="ts">
import { NTable } from 'naive-ui';
</script>

<style lang="scss" scoped>
.scorecard-table {
  text-align: center;
}
</style>
