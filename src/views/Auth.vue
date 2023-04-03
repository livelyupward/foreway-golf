<template>
  <section id="auth-view">
    <div class="auth-view_container">
      <h1>Login with your Google account</h1>
      <GoogleLogin :callback="googleAuthCallback" />
    </div>
  </section>
</template>

<script setup lang="ts">
import router from '../router';
import { mainStore } from '../store';
const store = mainStore();
const { setUser } = store;

const googleAuthCallback = async (response: GoogleResponse) => {
  // This callback will be triggered when the user selects or login to their Google account from the popup

  // set the credential response to a localStorage value
  localStorage.setItem('gg_token', response.credential);

  /**
   * send the credential that we saved to the server
   */
  const tokenSend = await fetch(`/api/auth?cred=${response.credential}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const tokenResponse = await tokenSend.json();

  /**
   * query db for the user that was sent by successful Google auth
   */
  const userDbFetch: Response = await fetch(`/api/users/${tokenResponse.email}`);
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
#auth-view {
  @media screen and (max-width: 600px) {
    align-items: center;
    display: flex;
    height: 85%;
    text-align: center;
  }
}
</style>
