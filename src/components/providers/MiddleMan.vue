<template>
  <slot></slot>
  <Teleport to="body">
    <Transition name="modal">
      <div class="middleman-stage" v-if="modalActivated">
        <div class="middleman-content">
          <div class="middleman-content_frame success" v-if="messageType === 'success'">
            <p class="middleman-content_text">{{ messageText }}</p>
          </div>
          <div class="middleman-content_frame reject" v-else-if="messageType === 'reject'">
            <p class="middleman-content_text">{{ messageText }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';

const modalActivated = ref(false);
const messageText = ref('');
const messageType = ref('');
const message = () => {
  const success = (messageToShowInFunc: string) => {
    messageText.value = messageToShowInFunc;
    messageType.value = 'success';
    console.log('The message is ', messageText.value);
    modalActivated.value = true;
    setTimeout(() => {
      modalActivated.value = false;
      messageText.value = '';
      messageType.value = '';
    }, 2000);
  };

  const reject = (messageToShowInFunc: string) => {
    messageText.value = messageToShowInFunc;
    messageType.value = 'reject';
    console.log('The alert is ', messageText.value);
    modalActivated.value = true;
    setTimeout(() => {
      modalActivated.value = false;
      messageText.value = '';
      messageType.value = '';
    }, 2000);
  };

  return {
    success,
    reject,
  };
};

provide('message', message());
</script>

<style lang="scss" scoped>
.middleman-stage {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;

  .middleman-content {
    left: 50%;
    position: fixed;
    top: 1rem;
    transform: translateX(-50%);
    width: 100%;
  }

  .middleman-content_frame {
    @include rounded-corners;
    @include sm-shadow;
    background-color: #fff;
    border: 2px solid $primary;
    color: $primary;
    margin: 0 auto;
    padding: 0.125rem 0.625rem;
    text-align: center;
    width: 75%;

    &.reject {
      border-color: $red;
      color: $red;
    }
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
