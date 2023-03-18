<template>
  <aside id="side-panel">
    <n-menu :options="menuOptions" />
  </aside>
</template>

<script setup lang="ts">
import { h, Component } from 'vue';
import { RouterLink } from 'vue-router';
import { NMenu, NIcon } from 'naive-ui';
import type { MenuOption } from 'naive-ui';
import { GolfOutline as GolfIcon, HomeOutline as HomeIcon } from '@vicons/ionicons5';

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
  {
    label: () =>
      h(
        RouterLink,
        {
          to: '/test-round',
        },
        { default: () => 'Resume my round' }
      ),
    key: 'resume-my-round',
    icon: renderIcon(GolfIcon),
  },
];

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
</script>
