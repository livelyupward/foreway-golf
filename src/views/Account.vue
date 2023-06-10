<template>
  <div id="account-page" v-if="getUser">
    <h1 class="account-page_title page-title">My Account</h1>
    <div class="account-page_settings card">
      <h2 class="account-page_settings-header card-header">Preferences</h2>
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
</template>

<script setup lang="ts">
import { Ref, ref, watch, inject } from 'vue';
import { mainStore, type MiddleMan } from '../store';
import { storeToRefs } from 'pinia';

const store = mainStore();
const { changeRoundTotalSetting, setUser } = store;
const { getUser } = storeToRefs(store);
const displayRoundTotals: Ref<boolean> = ref(getUser.value ? getUser.value.showRoundTotals : false);

const message = inject('message') as MiddleMan;

watch(displayRoundTotals, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    await changeRoundTotalSetting(newValue);
    await setUser({ ...getUser.value, showRoundTotals: newValue });
    message.success('Preference changed successfully');
  }
});
</script>

<style lang="scss" scoped>
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
</style>
