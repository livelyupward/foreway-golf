<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <Suspense>
        <div id="app-container">
          <SidebarNav id="side-panel" />
          <Home />
        </div>
        <template #fallback> Loading... </template>
      </Suspense>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, NMessageProvider } from 'naive-ui';
import Home from './views/Home.vue';
import SidebarNav from './components/SidebarNav.vue';
import {watch} from "vue";
import {mainStore} from "./store";
const store = mainStore()
const {getUser} = store;

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3d5afe',
    fontSize: '18px',
  },
  Button: {
    textColor: '#3d5afe',
  },
};

watch(getUser, () => {
  console.log('user is logged in')
})
</script>

<style lang="scss">
#app-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 'sidebar main';
  min-height: 100vh;
  overflow-x: hidden;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr auto;
    grid-template-areas: 'main sidebar';
  }
}

#main-panel {
  border-left: 1px solid darkslategrey;
  grid-area: main;
  padding: 30px;
}

#side-panel {
  grid-area: sidebar;
}

h1 {
  margin-top: 0;
}
</style>
