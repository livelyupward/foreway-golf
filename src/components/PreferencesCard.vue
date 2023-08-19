<template>
  <div class="card-tabs_tab-content-item">
    <div class="account-page_preferences-item">
      <p class="account-page_preferences-item_text">Show mid-round totals in scorecard</p>
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
</template>

<script setup lang="ts">
import { ref, Ref, watch, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { mainStore, type MiddleMan } from '../store';

const store = mainStore();
const { getUser } = storeToRefs(store);
const { changeRoundTotalSetting, setUser } = store;

const message = inject('message') as MiddleMan;

const displayRoundTotals: Ref<boolean> = ref(getUser.value ? getUser.value.showRoundTotals : false);

watch(displayRoundTotals, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await changeRoundTotalSetting(newValue);
    await setUser({ ...getUser.value, showRoundTotals: newValue });
    message.success('Preference changed successfully');
  }
});
</script>

<style lang="scss">
.account-page_preferences-item {
  display: flex;
  padding: 0.875rem;

  &_text {
    margin: 0 0 0.5rem;
  }
}

.account-page_settings_flex-container {
  align-items: center;
  display: flex;

  .account-page_settings_radio-group {
    display: flex;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}
</style>
