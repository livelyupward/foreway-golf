<template>
  <div id="stats-page">
    <h1 class="stats-page_title page-title">My Stats</h1>
    <!--    TODO: Make buttons to change date ranges for stats-->
    <!--    <div class="foreway-pill-group">-->
    <!--      <button></button>-->
    <!--    </div>-->
    <div class="card">
      <Suspense>
        <QuickStats />
        <template #fallback> Loading stats... </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuickStats from '../components/QuickStats.vue';
</script>

<style></style>
