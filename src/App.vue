<template>
  <n-config-provider>
    <n-message-provider>
      <Suspense>
        <div id="app-container">
          <SidebarNav id="side-panel" />
          <main id="main-panel">
            <router-view></router-view>
          </main>
        </div>
        <template #fallback> Loading... </template>
      </Suspense>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider } from 'naive-ui';
import SidebarNav from './components/SidebarNav.vue';
import { onBeforeMount } from 'vue';
import { mainStore } from './store';
const store = mainStore();
const { authAndGetUserFromDB } = store;

onBeforeMount(async () => {
  await authAndGetUserFromDB();
});
</script>

<style lang="scss">
#app-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 'sidebar main';
  min-height: 100vh;
  overflow-x: hidden;

  @media screen and (max-width: 600px) {
    display: block;
    max-width: 100%;
    position: absolute;
    width: 100%;
  }
}

#main-panel {
  border-left: 1px solid darkslategrey;
  grid-area: main;
  min-height: 100vh;
  padding: 30px;

  .homepage-title {
    margin-top: 0;
  }
}

#side-panel {
  grid-area: sidebar;
}

h1 {
  margin-top: 0;
}
</style>
