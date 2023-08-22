<template>
  <ul v-if="getFriendRequestsGetter" class="requests_friends-list">
    <li v-for="request in getFriendRequestsGetter.requestsFromFriends" class="requests_friends-list_item">
      <span class="requests-list_player-name">{{ request.sendingUser.name }}</span>
      <span class="requests-list_action-group">
        <button class="requests-list_action-button good" @click="acceptRequest(request.id)">
          <font-awesome-icon :icon="['fas', 'check']" />
          <!-- Approve -->
        </button>
        <button class="requests-list_action-button bad" @click="denyRequest(request.id)">
          <font-awesome-icon :icon="['fas', 'ban']" />
          <!-- Deny -->
        </button>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { friendStore } from '../../friendStore';

const props = defineProps<{
  denyRequest: Function;
  acceptRequest: Function;
}>();

const store = friendStore();
const { getFriendRequestsGetter } = storeToRefs(store);
</script>

<style lang="scss" scoped></style>
