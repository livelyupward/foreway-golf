<template>
  <main id="main-panel">
    <GoogleLogin v-if="getUser === null" :callback="googleAuthCallback" />
    <router-view v-else></router-view>
  </main>
</template>

<script setup lang="ts">
import { mainStore } from '../store';
import router from '../router';
import { onBeforeRouteUpdate } from 'vue-router';
const store = mainStore();
const { setUser, getUser, resetUser } = store;

onBeforeRouteUpdate(() => {});
// TODO: this is new from store. ensure this is working correctly
await store.authAndGetUserFromDB();

const googleAuthCallback = async (response: GoogleResponse) => {
  // This callback will be triggered when the user selects or login to their Google account from the popup

  // set the credential response to a localStorage value
  localStorage.setItem('gg_token', response.credential);

  /**
   * send the credential that we saved to the server
   */
  const tokenSend = await fetch(`http://localhost:4000/authback?cred=${response.credential}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const tokenResponse = await tokenSend.json();

  /**
   * query db for the user that was sent by successful Google auth
   */
  const userDbFetch: Response = await fetch(`http://localhost:4000/api/users/${tokenResponse.email}`);
  const userDbResponse: object[] = await userDbFetch.json();

  /**
   * set the user in the app state and push to the home route
   */
  setUser(userDbResponse[0]);
  await router.push('/');
};

interface GoogleResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}
</script>

<style lang="scss" scoped>
.homepage-title {
  margin-top: 0;
}
</style>
