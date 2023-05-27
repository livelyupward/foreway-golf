<template>
  <Suspense>
    <div id="app-container">
      <main id="main-panel">
        <router-view></router-view>
      </main>
      <NavigationTray />
    </div>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup lang="ts">
import NavigationTray from './components/NavigationTray.vue';
</script>

<style lang="scss">
#app-container {
  overflow-x: hidden;
}

#main-panel {
  @include nav-spacer;
  min-height: calc(100vh - 70px); // 50px for tray height and 20 for top and bottom padding
  padding: 30px;
  position: relative;

  @media screen and (max-width: 900px) {
    padding: 10px;
  }

  .homepage-title {
    margin-top: 0;
  }
}

#navigation-tray {
}

h1 {
  margin-top: 0;
}
</style>
