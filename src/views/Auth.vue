<template>
  <h1>Login with your Google account</h1>
  <GoogleLogin :callback="googleAuthCallback" />
</template>

<script setup lang="ts">
import router from '../router';
import { mainStore } from '../store';
const store = mainStore();
const { setUser, authAndGetUserFromDB } = store;

// TODO: this is new from store. ensure this is working correctly
await authAndGetUserFromDB();

const googleAuthCallback = async (response: GoogleResponse) => {
  // This callback will be triggered when the user selects or login to their Google account from the popup

  // set the credential response to a localStorage value
  localStorage.setItem('gg_token', response.credential);

  /**
   * send the credential that we saved to the server
   */
  const tokenSend = await fetch(`http://localhost:4000/auth?cred=${response.credential}`, {
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

<style scoped></style>
