<template>
  <ul class="friends_friends-list">
    <li v-for="friend in props.friends" class="friends_friends-list_item">
      <span class="friends-list_player-name">{{
        friend.receivingUser.email !== props.user.email ? friend.receivingUser.name : friend.sendingUser.name
      }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { type Friendship } from '../../friendStore';
import { type User } from '../../store';

const props = defineProps<{
  friends: Friendship[];
  user: User;
}>();
</script>
