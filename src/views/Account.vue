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
        <div v-show="activeTab === 'friends'" class="card-tabs_tab-content-item">
          <div class="account-page_settings-item">
            <ul v-if="friends.length > 0" class="account-page_friends-list">
              <li v-for="friend in friends" class="account-page_friends-list_item">
                <span class="friends-list_player-name">{{ friend.name }}</span>
                <!-- <span class="friends-list_player-favicon">
                  <font-awesome-icon
                    class="friends-list_player-favicon_icon favorite"
                    v-if="friend.isUserFavorite"
                    :icon="['fas', 'star']"
                  />
                  <font-awesome-icon
                    class="friends-list_player-favicon_icon non-favorite"
                    v-else
                    :icon="['far', 'star']"
                  />
                </span> -->
              </li>
            </ul>
          </div>
          <div class="account-page_friends-list_invite-section">
            <button @click="activateFriendModal" class="account-page_friends-list_invite-section_invite-button">
              <font-awesome-icon class="account-page_friends-list_friend-icon" :icon="['fas', 'users']" />
              Add friend
            </button>
          </div>
        </div>
        <div v-show="activeTab === 'preferences'" class="card-tabs_tab-content-item">
          <div class="account-page_settings-item">
            <p class="account-page_settings-item_text">Show mid-round totals in scorecard</p>
            <div class="account-page_settings_flex-container">
              <div class="account-page_settings_radio-group">
                <input name="round-totals" type="radio" v-model="displayRoundTotals" :value="true" />
                <label for="">Yes</label>
              </div>
              <div class="account-page_settings_radio-group">
                <input name="round-totals" type="radio" v-model="displayRoundTotals" :value="false" />
                <label for="">No</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport v-if="friendModalActivated" to="body">
      <AddFriendModal @close-friend-modal="friendModalActivated = false" />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, watch, inject } from 'vue';
import { mainStore, type MiddleMan } from '../store';
import { storeToRefs } from 'pinia';
import AddFriendModal from '../components/AddFriendModal.vue';

const store = mainStore();
const { changeRoundTotalSetting, setUser } = store;
const { getUser } = storeToRefs(store);
const displayRoundTotals: Ref<boolean> = ref(getUser.value ? getUser.value.showRoundTotals : false);
const activeTab = ref('friends');

const message = inject('message') as MiddleMan;

const friendModalActivated = ref(false);

watch(displayRoundTotals, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await changeRoundTotalSetting(newValue);
    await setUser({ ...getUser.value, showRoundTotals: newValue });
    message.success('Preference changed successfully');
  }
});

function activateTab(event: any) {
  if (event.target === null) {
    message.reject('Something went wrong. Try again.');
    throw new Error('No active tab found.');
  }

  const type = event.target.id;

  activeTab.value = type;
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
.account-page_settings-item_text {
  margin-bottom: 0.5rem;
}

.account-page_settings_flex-container {
  align-items: center;
  display: flex;

  .account-page_settings_radio-group {
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}

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

.account-page_settings-item {
  padding: 0.875rem;
}

.account-page_friends-list {
  list-style-type: none;
  margin: 0;
  padding-left: 0;

  .account-page_friends-list_item {
    padding-bottom: 10px;
    margin-top: 10px;

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      padding-bottom: 0;
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid #dedede;
    }

    &:not(:first-of-type):not(:last-of-type) {
      margin: 10px 0;
    }

    .friends-list_player-favicon_icon {
      &.non-favorite {
        color: #ddd;
      }

      &.favorite {
        color: gold;
      }
    }
  }
}

.account-page_friends-list_invite-section_invite-button {
  background-color: lighten($color: $primary, $amount: 10%);
  border: 1px solid lighten($color: $primary, $amount: 10%);
  border-radius: 0 0 10px 10px;
  color: #fff;
  padding: 10px 0;
  width: 100%;
}

.account-page_friends-list_friend-icon {
  margin-right: 6px;
}

.account-page_card {
  @include sm-shadow;
}
</style>
