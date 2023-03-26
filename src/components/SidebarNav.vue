<template>
  <aside id="side-panel" :class="getDrawerState ? 'open' : ''">
    <button class="side-panel-mobile-toggle" @click="toggleDrawer">
      <MenuIcon />
    </button>
    <n-menu :options="menuOptions" />
  </aside>
</template>

<script setup lang="ts">
import { h, Component } from 'vue';
import { RouterLink } from 'vue-router';
import { NMenu, NIcon } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import {
  GolfOutline as GolfIcon,
  HomeOutline as HomeIcon,
  MenuOutline as MenuIcon,
  FlagOutline as FlagIcon,
} from '@vicons/ionicons5';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { getDrawerState } = storeToRefs(store);
const { toggleDrawer } = store;

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/',
        },
        { default: () => 'Home' }
      ),
    key: 'go-home',
    icon: renderIcon(HomeIcon),
  },
  {
    key: 'divider-1',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/round',
        },
        { default: () => 'Start a round' }
      ),
    key: 'start-a-round',
    icon: renderIcon(GolfIcon),
  },
  {
    key: 'divider-2',
    type: 'divider',
    props: {
      style: {
        marginLeft: '32px',
      },
    },
  },
  // {
  //   label: () =>
  //     h(
  //       RouterLink,
  //       {
  //         to: '/round',
  //       },
  //       { default: () => 'Resume my round' }
  //     ),
  //   key: 'resume-my-round',
  //   icon: renderIcon(FlagIcon),
  // },
];

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
</script>

<style lang="scss">
#side-panel {
  background-color: #333;
  max-width: 250px;
  transition: transform 250ms ease-out;
  width: 100%;

  &.open {
    border-left: 1px solid #bbbbbb;
    transform: translateX(0%);
    transition: transform 250ms ease-out;
  }

  @media screen and (max-width: 900px) {
    border-left: 1px solid #333;
    box-sizing: border-box;
    height: 100vh;
    right: 0;
    position: fixed;
    top: 0;
    transform: translateX(100%);
    z-index: 10;
  }

  .side-panel-mobile-toggle {
    background-color: #333;
    border: 1px solid #bbb;
    border-bottom-left-radius: 4px;
    border-right: none;
    border-top: none;
    color: #bbbbbb;
    cursor: pointer;
    position: relative;
    transform: translateX(-100%);
    z-index: 15;

    svg {
      display: block;
      width: 40px;
    }
  }
}
</style>
