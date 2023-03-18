<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <div id="app-container">
        <!--        <SidebarNav id="side-panel" />-->
        <main id="main-panel">
          <GoogleLogin :callback="callback" />
          <Suspense>
            <router-view></router-view>
            <template #fallback> Loading... </template>
          </Suspense>
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, GlobalThemeOverrides, NMessageProvider } from 'naive-ui';
import SidebarNav from './components/SidebarNav.vue';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#3d5afe',
    fontSize: '18px',
  },
  Button: {
    textColor: '#3d5afe',
  },
};

const callback = (response) => {
  // This callback will be triggered when the user selects or login to
  // his Google account from the popup
  console.log('Handle the response', response);
};
</script>

<style lang="scss">
#app-container {
  //display: grid;
  //grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

#main-panel {
  border-left: 1px solid darkslategrey;
  padding: 30px;
}

h1 {
  margin-top: 0;
}
</style>
