<template>
  <div class="card-tabs_tab-content-item">
    <div class="friends_settings-item">
      <h3 class="friends-list_title">Friends list</h3>
      <ul v-if="props.friends.length > 0" class="friends_friends-list">
        <li v-for="friend in props.friends" class="friends_friends-list_item">
          <span class="friends-list_player-name">{{
            friend.receivingUser.email !== props.user.email ? friend.receivingUser.name : friend.sendingUser.name
          }}</span>
        </li>
      </ul>
      <template
        v-if="
          getFriendRequestsGetter &&
          getFriendRequestsGetter.requestsForMe &&
          getFriendRequestsGetter.requestsFromFriends &&
          (getFriendRequestsGetter.requestsForMe.length || getFriendRequestsGetter.requestsFromFriends.length)
        "
      >
        <hr />
        <h3 class="requests-list_title">Pending requests</h3>
        <ul v-if="getFriendRequestsGetter.requestsForMe.length" class="requests_friends-list">
          <li v-for="request in getFriendRequestsGetter.requestsForMe" class="requests_friends-list_item">
            <span class="requests-list_player-name">{{ request.receivingUser.name }}</span>
            <span class="requests-list_action-group">
              <button class="requests-list_action-button bad" @click="denyFriendRequestAndRefresh(request.id)">
                <font-awesome-icon :icon="['fas', 'ban']" />
                <!-- Deny -->
              </button>
            </span>
          </li>
        </ul>
        <ul v-if="getFriendRequestsGetter.requestsFromFriends.length" class="requests_friends-list">
          <li v-for="request in getFriendRequestsGetter.requestsFromFriends" class="requests_friends-list_item">
            <span class="requests-list_player-name">{{ request.sendingUser.name }}</span>
            <span class="requests-list_action-group">
              <button class="requests-list_action-button good" @click="acceptFriendRequestAndRefresh(request.id)">
                <font-awesome-icon :icon="['fas', 'check']" />
                <!-- Approve -->
              </button>
              <button class="requests-list_action-button bad" @click="denyFriendRequestAndRefresh(request.id)">
                <font-awesome-icon :icon="['fas', 'ban']" />
                <!-- Deny -->
              </button>
            </span>
          </li>
        </ul>
      </template>
    </div>
    <div class="friends_friends-list_invite-section">
      <button @click="emit('activateFriendModal')" class="friends_friends-list_invite-section_invite-button">
        <font-awesome-icon class="friends_friends-list_friend-icon" :icon="['fas', 'users']" />
        Add friend
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { friendStore } from '../../friendStore';
import { MiddleMan } from '../../store';
import { inject } from 'vue';

const message = inject('message') as MiddleMan;
const store = friendStore();
const { getFriendRequests, denyFriendRequest, acceptFriendRequest, getFriendsList } = store;
const { getFriendRequestsGetter } = storeToRefs(store);
const props = defineProps<{
  friends: any;
  user: any;
}>();

const emit = defineEmits(['activateFriendModal']);

await getFriendRequests(props.user.id);

async function acceptFriendRequestAndRefresh(requestId: number) {
  await acceptFriendRequest(requestId);
  await getFriendRequests(props.user.id);
  await getFriendsList(props.user.id);
}

async function denyFriendRequestAndRefresh(userId: number) {
  await denyFriendRequest(userId);
  message.success('Friend request denied');
  await getFriendRequests(props.user.id);
}
</script>

<style lang="scss" scoped>
.friends_settings-item {
  padding: 0.875rem;
}

.friends-list_title,
.requests-list_title {
  margin-top: 0;
}

.friends_friends-list {
  list-style-type: none;
  margin: 0;
  padding-left: 0;

  .friends_friends-list_item {
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

.requests_friends-list {
  padding-left: 0;
}

.requests_friends-list_item {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
}

.requests-list_action-group {
  display: flex;
}

.requests-list_action-button {
  @include rounded-corners;
  align-items: center;
  display: flex;

  // svg {
  //   margin-right: 8px;
  // }

  &.bad {
    background-color: $red;
    color: #fff;
  }

  &.good {
    background-color: $green;
    color: #fff;
  }
}

.friends_friends-list_invite-section_invite-button {
  background-color: lighten($color: $primary, $amount: 10%);
  border: 1px solid lighten($color: $primary, $amount: 10%);
  border-radius: 0 0 10px 10px;
  color: #fff;
  padding: 10px 0;
  width: 100%;
}

.friends_friends-list_friend-icon {
  margin-right: 6px;
}
</style>