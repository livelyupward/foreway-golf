<template>
  <div id="add-friend">
    <div class="add-friend_modal">
      <div class="add-friend_modal-container">
        <h3 class="add-friend_modal-header">Find a friend</h3>
        <form @submit.prevent="sendFriendInvite" class="add-friend_form">
          <label class="add-friend_form-label" for="friend-email">Enter a users's email:</label>
          <input
            class="add-friend_form-input"
            id="friend-email"
            type="email"
            required
            placeholder="jane.doe@email.com"
          />
          <button class="add-friend_form-submit">
            <span v-if="friendFormLoading">
              <font-awesome-icon :icon="['fas', 'spinner']" spin-pulse />
            </span>
            <span v-else>Send friend request</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { friendStore as useFriendStore } from '../friendStore';
import { mainStore } from '../store';

const store = mainStore();
const { getUser } = storeToRefs(store);
const friendStore = useFriendStore();
// const { friends } = storeToRefs(friendStore);

const friendFormLoading = ref(false);
const emailEntered = ref('');

async function sendFriendInvite() {
  friendFormLoading.value = true;

  if (getUser.value) {
    try {
      const submitFriendInvite = await friendStore.sendFriendInvite(getUser.value?.id, emailEntered.value);
      console.log('res: ', submitFriendInvite);
    } catch (error) {
      console.error(error);
    }
  }

  friendFormLoading.value = false;
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
    margin: 5rem 0.875rem 0.875rem;
  }

  .add-friend_modal-header {
    margin-top: 0;
  }

  .add-friend_form-input {
    font-size: 1.125rem;
    margin: 0.375rem 0 0.875rem;
  }

  .add-friend_form-submit {
    background-color: $primary;
    color: #fff;
    width: 100%;
  }
}
</style>
