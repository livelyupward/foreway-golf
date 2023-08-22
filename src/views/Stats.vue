<template>
  <div id="stats-page">
    <h1 class="stats-page_title page-title">My Stats</h1>
    <!--    TODO: Make buttons to change date ranges for stats-->
    <!--    <div class="foreway-pill-group">-->
    <!--      <button></button>-->
    <!--    </div>-->
    <div class="card">
      <div class="card-header">
        <div class="header-buttons">
          <button class="active">All-time</button>
          <button disabled>Current year</button>
        </div>
      </div>
      <Suspense>
        <QuickStats />
        <template #fallback> Loading stats... </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuickStats from '../components/stats/QuickStats.vue';
</script>

<style lang="scss" scoped>
.stats-page_title {
  margin-bottom: 15px;
}

.card-header {
  .header-buttons {
    border-bottom: 1px solid $primary;
    display: flex;
    justify-content: space-evenly;

    button {
      background-color: rgba($color: #000000, $alpha: 0);
      border: none;
      flex-basis: 50%;

      &[disabled] {
        color: #ddd;
      }

      &.active {
        background-color: $primary;
        border-radius: 0;
        color: $white;
        font-weight: 700;
        text-decoration: underline;
      }
    }
  }
}

.foreway-stats {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
