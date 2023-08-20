<template>
  <div id="add-friend">
    <div class="add-friend_modal">
      <div class="add-friend_modal-container">
        <h3 class="add-friend_modal-header">Find a friend</h3>
        <form @submit.prevent="sendFriendInvite" class="add-friend_form">
          <label class="add-friend_form-label" for="friend-email">Enter a users's email:</label>
          <input
            v-model="emailEntered"
            class="add-friend_form-input"
            id="friend-email"
            type="email"
            required
            placeholder="jane.doe@email.com"
            autocomplete="false"
          />
          <small class="add-friend_form-error">{{ errorMessage }}</small>
          <button class="add-friend_form-submit">
            <span v-if="friendFormLoading">
              <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse />
            </span>
            <span v-else>
              <font-awesome-icon class="account-page_friends-list_friend-icon" :icon="['fas', 'paper-plane']" />
              Send friend request
            </span>
          </button>
        </form>
      </div>
      <button @click="emit('closeFriendModal')" class="add-friend_form-close">
        <font-awesome-icon :icon="['fas', 'circle-xmark']" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { friendStore as useFriendStore } from '../friendStore';
import { mainStore, MiddleMan } from '../store';

const message = inject('message') as MiddleMan;
const store = mainStore();
const { getUser } = storeToRefs(store);
const friendStore = useFriendStore();
const emit = defineEmits(['closeFriendModal']);

const friendFormLoading = ref(false);
const emailEntered = ref('');
const errorMessage = ref('');

async function sendFriendInvite() {
  friendFormLoading.value = true;

  if (getUser.value) {
    try {
      const submitFriendInvite = await friendStore.sendFriendInvite(getUser.value?.id, emailEntered.value);
      if (submitFriendInvite.status === 404) {
        errorMessage.value = "No user found with the email you've entered";
        setTimeout(() => {
          errorMessage.value = '';
        }, 2000);
      }

      friendStore.getFriendRequests(getUser.value?.id);

      friendFormLoading.value = false;
      emit('closeFriendModal');
      message.success('Friend request sent successfully');
      console.log(submitFriendInvite.status);
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
#add-friend {
  background-color: rgba($color: #000000, $alpha: 0.5);
  bottom: 0;
  height: 100vh;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;

  .add-friend_modal {
    @include rounded-corners;
    background-color: #fff;
    padding: 0.875rem;
    position: relative;
    margin: 5rem 0.875rem 0.875rem;
  }

  .add-friend_modal-header {
    margin-top: 0;
  }

  .add-friend_form-input {
    font-size: 1.125rem;
    margin: 0.375rem 0 0;
  }

  .add-friend_form-submit {
    background-color: $primary;
    color: #fff;
    margin-top: 0.875rem;
    width: 100%;
  }

  .add-friend_form-error {
    color: $red;
    font-size: 0.875rem;
  }

  .add-friend_form-close {
    background: none;
    border: none;
    color: $primary;
    font-size: 1.5rem;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
