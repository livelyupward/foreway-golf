<template>
  <div id="account-page" v-if="getUser">
    <h1 class="account-page_title page-title">My Account</h1>
    <div class="account-page_card card tabs">
      <div class="card-tabs_tab-list">
        <button id="friends" @click="activateTab" :class="activeTab === 'friends' ? 'active' : ''">Friends</button>
        <button id="preferences" @click="activateTab" :class="activeTab === 'preferences' ? 'active' : ''">
          Preferences
        </button>
      </div>
      <div class="card-tabs_tab-content">
        <FriendsCard
          v-show="activeTab === 'friends'"
          :friends="friends"
          :user="getUser"
          @activate-friend-modal="activateFriendModal"
        />
        <PreferencesCard v-show="activeTab === 'preferences'" />
      </div>
    </div>
    <Teleport v-if="friendModalActivated" to="body">
      <AddFriendModal @close-friend-modal="friendModalActivated = false" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { mainStore, type MiddleMan } from '../store';
import { storeToRefs } from 'pinia';
import AddFriendModal from '../components/AddFriendModal.vue';
import FriendsCard from '../components/FriendsCard.vue';
import PreferencesCard from '../components/PreferencesCard.vue';

const store = mainStore();
const { getUser } = storeToRefs(store);
const message = inject('message') as MiddleMan;

const activeTab = ref('friends');
const friendModalActivated = ref(false);

function activateTab(event: any) {
  if (event.target === null) {
    message.reject('Something went wrong. Try again.');
    throw new Error('No active tab found.');
  }

  activeTab.value = event.target.id;
}

function activateFriendModal() {
  friendModalActivated.value = true;
}

const friends = [
  {
    name: 'Dave Grammas',
    email: 'dgrammas85@gmail.com',
    userId: 2,
    isUserFavorite: false,
  },
  {
    name: 'Matt Grammas',
    email: 'mgstud@gmail.com',
    userId: 3,
    isUserFavorite: false,
  },
  {
    name: 'Jenn Schrepel',
    email: 'jschrepel19@gmail.com',
    userId: 6,
    isUserFavorite: true,
  },
];
</script>

<style lang="scss">
.card.tabs {
  padding: 0;
}

.card-tabs_tab-list {
  display: flex;
  width: 100%;

  button {
    background-color: #fff;
    border: 1px solid $primary;
    flex-basis: 50%;

    &.active {
      background-color: $primary;
      color: #fff;
    }

    &:first-of-type {
      border-radius: 10px 0 0 0;
    }

    &:last-of-type {
      border-radius: 0 10px 0 0;
      border-left: none;
    }
  }
}

.account-page_card {
  @include sm-shadow;
}
</style>
