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
        <Suspense>
          <FriendsCard
            v-show="activeTab === 'friends'"
            :friends="getFriends"
            :user="getUser"
            @activate-friend-modal="activateFriendModal"
          />
          <template #fallback>Loading friends...</template>
        </Suspense>
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
import AddFriendModal from '../components/friends/AddFriendModal.vue';
import FriendsCard from '../components/friends/FriendsCard.vue';
import PreferencesCard from '../components/PreferencesCard.vue';
import { friendStore as useFriendStore } from '../friendStore';

const store = mainStore();
const friendStore = useFriendStore();
const { getUser } = storeToRefs(store);
const { getFriends } = storeToRefs(friendStore);
const { getFriendsList } = friendStore;
const message = inject('message') as MiddleMan;

getUser.value ? await getFriendsList(getUser.value.id) : null;

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

    &:last-of-type {
      border-left: none;
    }
  }
}
</style>
