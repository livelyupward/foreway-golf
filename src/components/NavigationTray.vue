<template>
  <aside id="navigation-tray">
    <ul class="nav-tray_link-list">
      <li class="nav-tray_link-list_link-container">
        <router-link class="nav-tray_link-list_link" to="/">
          <font-awesome-icon :icon="['fas', 'house-chimney']" />
          Home
        </router-link>
      </li>
      <li class="nav-tray_link-list_link-container">
        <router-link class="nav-tray_link-list_link" :to="checkRoundLink">
          <font-awesome-icon :icon="['fas', 'golf-ball-tee']" />
          Round
        </router-link>
      </li>
      <li class="nav-tray_link-list_link-container">
        <router-link class="nav-tray_link-list_link" to="/my-golf">
          <font-awesome-icon :icon="['fas', 'list-ol']" />
          Stats
        </router-link>
      </li>
      <li class="nav-tray_link-list_link-container">
        <router-link class="nav-tray_link-list_link" to="/settings">
          <font-awesome-icon :icon="['fas', 'user-gear']" />
          Account
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { mainStore } from '../store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = mainStore();
const { getUser } = storeToRefs(store);

/*
Checks if user has a round in progress. If one is found, the Round link will go to that round rather than the round creation screen.
In order to create a new round, the user will have to close their current round first.
 */
const checkRoundLink = computed(() => {
  if (getUser.value?.currentRound) {
    return `/round/${getUser.value.currentRound}`;
  } else {
    return `/round`;
  }
});
</script>

<style lang="scss">
#navigation-tray {
  background-color: #fff;
  border-top: 1px solid #888;
  position: fixed;
  bottom: 0;
  height: 60px;
  left: 0;
  right: 0;
  width: 100%;
}

.nav-tray_link-list {
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  list-style-type: none;
  margin: 0;
  padding: 0;

  .nav-tray_link-list_link-container {
    border-right: 1px solid #aaa;
    display: flex;
    flex-basis: 25%;
    justify-content: center;
    height: 60px;

    &:last-of-type {
      border-right: none;
    }

    .nav-tray_link-list_link {
      align-items: center;
      color: #333;
      display: flex;
      flex-direction: column;
      height: 60px;
      justify-content: center;
      line-height: 1;
      text-decoration: none;
      width: 100%;

      &.router-link-active {
        background-color: $green;
        color: #fff;

        .unicon {
          fill: #fff;
        }
      }

      .unicon {
        fill: $green;
        margin-right: 4px;
      }
    }
  }
}
</style>
